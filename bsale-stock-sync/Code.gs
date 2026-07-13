/**
 * Sincroniza SKU, stock y precio de venta de las marcas configuradas desde
 * Bsale hacia este Google Sheet. Pensado para ejecutarse manualmente o vía
 * un disparador (trigger) diario. Ver README.md para la guía de instalación.
 */

// ====== CONFIGURACIÓN ======
const BSALE_API_BASE = 'https://api.bsale.io/v1';
const MARCAS = ['AGU', 'RUDY PROJECT'];
const NOMBRE_HOJA = 'Stock Bsale';
const LOTE_TAMANO = 20; // cantidad de llamadas en paralelo por lote

const PROP_TOKEN = 'BSALE_TOKEN';
const PROP_PRICE_LIST_ID = 'BSALE_PRICE_LIST_ID';
const PROP_NOTIFY_EMAIL = 'NOTIFY_EMAIL';

// ====== MENÚ ======
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Bsale')
    .addItem('Actualizar stock ahora', 'actualizarStockBsale')
    .addItem('Crear disparador diario (6:00 AM)', 'crearTriggerDiario')
    .addSeparator()
    .addItem('Listar marcas disponibles', 'listarMarcas')
    .addItem('Listar listas de precio', 'listarListasDePrecio')
    .addToUi();
}

// ====== PROCESO PRINCIPAL ======
function actualizarStockBsale() {
  const token = getToken_();
  const priceListId = getPriceListId_();

  try {
    let variantes = [];
    MARCAS.forEach(function (marca) {
      const brandId = encontrarMarcaId_(marca, token);
      variantes = variantes.concat(obtenerVariantesDeMarca_(brandId, token));
    });

    if (variantes.length === 0) {
      throw new Error('No se encontraron SKU para las marcas configuradas: ' + MARCAS.join(', '));
    }

    const stockPorVariante = obtenerStockPorVariantes_(variantes, token);
    const precioPorVariante = obtenerPreciosPorVariantes_(variantes, priceListId, token);

    const filas = variantes.map(function (v) {
      const stock = stockPorVariante[v.variantId];
      const precio = precioPorVariante[v.variantId];
      return [
        v.sku,
        stock === undefined || stock === null ? 'ERROR' : stock,
        precio === undefined || precio === null ? 'ERROR' : precio
      ];
    });

    escribirEnHoja_(filas);
    Logger.log('Actualización completa: ' + filas.length + ' SKU procesados.');
  } catch (err) {
    notificarError_(err);
    throw err;
  }
}

// ====== BSALE: MARCAS, PRODUCTOS Y VARIANTES ======
function encontrarMarcaId_(nombreMarca, token) {
  const marcas = bsaleGetAllItems_('/brands.json', {}, token);
  const buscado = nombreMarca.trim().toLowerCase();
  const encontrada = marcas.find(function (m) {
    return m.name && m.name.trim().toLowerCase() === buscado;
  });
  if (!encontrada) {
    const disponibles = marcas.map(function (m) { return m.name; }).join(', ');
    throw new Error('No se encontró la marca "' + nombreMarca + '" en Bsale. Marcas disponibles: ' + disponibles);
  }
  return encontrada.id;
}

function obtenerVariantesDeMarca_(brandId, token) {
  const productos = bsaleGetAllItems_('/products.json', { brandid: brandId, state: 0 }, token);
  const variantes = [];

  for (let i = 0; i < productos.length; i += LOTE_TAMANO) {
    const lote = productos.slice(i, i + LOTE_TAMANO);
    const requests = lote.map(function (p) {
      return {
        url: buildUrl_('/variants.json', { productid: p.id, state: 0, limit: 50 }),
        method: 'get',
        headers: { access_token: token },
        muteHttpExceptions: true
      };
    });
    const respuestas = fetchAllConReintento_(requests);
    respuestas.forEach(function (resp, idx) {
      if (resp.getResponseCode() !== 200) {
        Logger.log('Error obteniendo variantes del producto ' + lote[idx].id + ': ' + resp.getContentText());
        return;
      }
      const data = JSON.parse(resp.getContentText());
      (data.items || []).forEach(function (v) {
        if (v.code) {
          variantes.push({ sku: v.code, variantId: v.id, productoId: lote[idx].id });
        }
      });
    });
    Utilities.sleep(300);
  }

  return variantes;
}

// ====== BSALE: STOCK ======
function obtenerStockPorVariantes_(variantes, token) {
  const stockPorVariante = {};

  for (let i = 0; i < variantes.length; i += LOTE_TAMANO) {
    const lote = variantes.slice(i, i + LOTE_TAMANO);
    const requests = lote.map(function (v) {
      return {
        url: buildUrl_('/stocks.json', { variantid: v.variantId, limit: 50 }),
        method: 'get',
        headers: { access_token: token },
        muteHttpExceptions: true
      };
    });
    const respuestas = fetchAllConReintento_(requests);
    respuestas.forEach(function (resp, idx) {
      const variantId = lote[idx].variantId;
      if (resp.getResponseCode() !== 200) {
        Logger.log('Error obteniendo stock de variante ' + variantId + ': ' + resp.getContentText());
        stockPorVariante[variantId] = null;
        return;
      }
      const data = JSON.parse(resp.getContentText());
      const total = (data.items || []).reduce(function (sum, s) {
        return sum + (s.quantityAvailable || 0);
      }, 0);
      stockPorVariante[variantId] = total;
    });
    Utilities.sleep(300);
  }

  return stockPorVariante;
}

// ====== BSALE: PRECIO DE VENTA ======
function obtenerPreciosPorVariantes_(variantes, priceListId, token) {
  const precioPorVariante = {};

  for (let i = 0; i < variantes.length; i += LOTE_TAMANO) {
    const lote = variantes.slice(i, i + LOTE_TAMANO);
    const requests = lote.map(function (v) {
      return {
        url: buildUrl_('/price_lists/' + priceListId + '/details.json', { variantid: v.variantId, limit: 50 }),
        method: 'get',
        headers: { access_token: token },
        muteHttpExceptions: true
      };
    });
    const respuestas = fetchAllConReintento_(requests);
    respuestas.forEach(function (resp, idx) {
      const variantId = lote[idx].variantId;
      if (resp.getResponseCode() !== 200) {
        Logger.log('Error obteniendo precio de variante ' + variantId + ': ' + resp.getContentText());
        precioPorVariante[variantId] = null;
        return;
      }
      const data = JSON.parse(resp.getContentText());
      const detalle = (data.items || [])[0];
      precioPorVariante[variantId] = detalle ? detalle.variantValueWithTaxes : null;
    });
    Utilities.sleep(300);
  }

  return precioPorVariante;
}

// ====== ESCRITURA EN EL SHEET ======
function escribirEnHoja_(filas) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = ss.getSheetByName(NOMBRE_HOJA);
  if (!hoja) hoja = ss.insertSheet(NOMBRE_HOJA);
  hoja.clearContents();

  const marcaTiempo = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd-MM-yyyy HH:mm');
  hoja.getRange(1, 1).setValue('Última actualización: ' + marcaTiempo);
  hoja.getRange(2, 1, 1, 3).setValues([['SKU', 'Stock', 'Precio Venta']]);

  if (filas.length > 0) {
    hoja.getRange(3, 1, filas.length, 3).setValues(filas);
  }

  hoja.setFrozenRows(2);
  hoja.autoResizeColumns(1, 3);
}

// ====== DISPARADOR DIARIO ======
function crearTriggerDiario() {
  eliminarTriggersExistentes_('actualizarStockBsale');
  ScriptApp.newTrigger('actualizarStockBsale')
    .timeBased()
    .everyDays(1)
    .atHour(6)
    .nearMinute(0)
    .create();
  SpreadsheetApp.getActiveSpreadsheet().toast(
    'Disparador diario creado: se ejecutará todos los días cerca de las 06:00.',
    'Bsale',
    8
  );
}

function eliminarTriggersExistentes_(nombreFuncion) {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === nombreFuncion) ScriptApp.deleteTrigger(t);
  });
}

// ====== UTILIDADES DE DIAGNÓSTICO ======
function listarMarcas() {
  const token = getToken_();
  const marcas = bsaleGetAllItems_('/brands.json', {}, token);
  const texto = marcas.map(function (m) { return m.id + ' - ' + m.name; }).join('\n');
  Logger.log(texto);
  SpreadsheetApp.getUi().alert('Marcas en Bsale', texto || 'No hay marcas', SpreadsheetApp.getUi().ButtonSet.OK);
}

function listarListasDePrecio() {
  const token = getToken_();
  const listas = bsaleGetAllItems_('/price_lists.json', {}, token);
  const texto = listas.map(function (l) { return l.id + ' - ' + l.name; }).join('\n');
  Logger.log(texto);
  SpreadsheetApp.getUi().alert('Listas de precio en Bsale', texto || 'No hay listas', SpreadsheetApp.getUi().ButtonSet.OK);
}

// ====== NOTIFICACIÓN DE ERRORES ======
function notificarError_(err) {
  const email = PropertiesService.getScriptProperties().getProperty(PROP_NOTIFY_EMAIL) || Session.getEffectiveUser().getEmail();
  if (!email) return;
  MailApp.sendEmail(
    email,
    'Error actualizando stock Bsale',
    'Ocurrió un error al actualizar el stock:\n\n' + err.message + '\n\n' + (err.stack || '')
  );
}

// ====== HELPERS BSALE (HTTP) ======
function getToken_() {
  const token = PropertiesService.getScriptProperties().getProperty(PROP_TOKEN);
  if (!token) {
    throw new Error('Falta configurar la propiedad de script BSALE_TOKEN (Extensiones > Apps Script > Configuración del proyecto > Propiedades del script).');
  }
  return token;
}

function getPriceListId_() {
  const id = PropertiesService.getScriptProperties().getProperty(PROP_PRICE_LIST_ID);
  if (!id) {
    throw new Error('Falta configurar la propiedad de script BSALE_PRICE_LIST_ID. Usa el menú Bsale > "Listar listas de precio" para obtener el ID correcto.');
  }
  return id;
}

function buildUrl_(basePath, params) {
  const qs = Object.keys(params)
    .filter(function (k) { return params[k] !== undefined && params[k] !== null; })
    .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); })
    .join('&');
  return BSALE_API_BASE + basePath + (qs ? '?' + qs : '');
}

function bsaleRequest_(url, token) {
  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { access_token: token },
    muteHttpExceptions: true
  });
  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error('Bsale API error ' + code + ' en ' + url + ': ' + response.getContentText());
  }
  return JSON.parse(response.getContentText());
}

function bsaleGetAllItems_(basePath, params, token) {
  const items = [];
  let offset = 0;
  const limit = 50;
  while (true) {
    const url = buildUrl_(basePath, Object.assign({}, params, { limit: limit, offset: offset }));
    const data = bsaleRequest_(url, token);
    items.push.apply(items, data.items || []);
    offset += limit;
    if (!data.items || data.items.length === 0 || offset >= data.count) break;
  }
  return items;
}

function fetchAllConReintento_(requests, maxIntentos) {
  maxIntentos = maxIntentos || 3;
  let respuestas = UrlFetchApp.fetchAll(requests);
  for (let intento = 1; intento < maxIntentos; intento++) {
    const pendientes = [];
    const indices = [];
    respuestas.forEach(function (r, idx) {
      const code = r.getResponseCode();
      if (code === 429 || code >= 500) {
        pendientes.push(requests[idx]);
        indices.push(idx);
      }
    });
    if (pendientes.length === 0) break;
    Utilities.sleep(1000 * intento);
    const reintentos = UrlFetchApp.fetchAll(pendientes);
    indices.forEach(function (idx, i) { respuestas[idx] = reintentos[i]; });
  }
  return respuestas;
}
