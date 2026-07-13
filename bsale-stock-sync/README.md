# Sincronización de stock Bsale → Google Sheets

Script de Google Apps Script que baja el **SKU**, **stock actual** y **precio de
venta** de los productos de las marcas **AGU** y **RUDY PROJECT** desde la API
de Bsale, y los sube a una hoja llamada `Stock Bsale` dentro del Google Sheet
al que se vincule el script. Incluye un disparador (trigger) diario para que
la actualización sea automática.

No requiere servidores ni credenciales de Google adicionales: el script corre
en la infraestructura de Google, vinculado directamente al Sheet.

## 1. Instalación

1. Abre el Google Sheet ya compartido donde quieres que aparezcan los datos.
2. Ve a **Extensiones > Apps Script**.
3. Borra el contenido por defecto de `Código.gs` y pega el contenido de
   [`Code.gs`](./Code.gs) de esta carpeta.
4. En el panel de archivos del editor, abre `appsscript.json` (actívalo desde
   el ícono de engranaje **Configuración del proyecto > Mostrar archivo de
   manifiesto "appsscript.json" en el editor** si no aparece) y reemplaza su
   contenido por el de [`appsscript.json`](./appsscript.json) de esta carpeta.
5. Guarda el proyecto (ícono de disquete).

## 2. Configurar las propiedades del script

En el editor de Apps Script: **Configuración del proyecto (ícono de
engranaje) > Propiedades del script > Agregar propiedad del script**.

| Propiedad               | Obligatoria | Descripción                                                                 |
|--------------------------|-------------|------------------------------------------------------------------------------|
| `BSALE_TOKEN`            | Sí          | Tu Access Token de la API de Bsale (Bsale > Configuración > Usuarios > API). |
| `BSALE_PRICE_LIST_ID`    | Sí          | ID de la lista de precios que se usará como "Precio Venta". Ver paso 3.      |
| `NOTIFY_EMAIL`           | No          | Correo al que se avisa si la actualización falla. Por defecto usa tu cuenta. |

Nunca se escribe el token en la hoja ni en el código: queda solo en las
Propiedades del script.

## 3. Encontrar el ID de la lista de precios

1. Vuelve al Sheet y recarga la página (para que aparezca el menú **Bsale**).
2. Autoriza los permisos la primera vez que uses el menú.
3. Menú **Bsale > Listar listas de precio**: se mostrará un listado
   `ID - Nombre` en un cuadro de diálogo (y en el Registro/Logs del editor).
4. Copia el ID de la lista que corresponde al precio de venta al público y
   guárdalo en la propiedad `BSALE_PRICE_LIST_ID`.
5. Opcional: **Bsale > Listar marcas disponibles** para confirmar que "AGU" y
   "RUDY PROJECT" están escritas exactamente igual en Bsale (el script
   compara sin distinguir mayúsculas/minúsculas, pero el nombre debe
   coincidir).

## 4. Probar la actualización

Menú **Bsale > Actualizar stock ahora**. La primera vez pedirá autorizar
permisos (acceso a la hoja, a internet y a enviar correos de error). Al
terminar se crea/actualiza la hoja `Stock Bsale` con las columnas:

```
SKU | Stock | Precio Venta
```

y una marca de última actualización arriba de la tabla.

## 5. Automatizar la actualización diaria

Menú **Bsale > Crear disparador diario (6:00 AM)**. Esto crea un trigger de
Apps Script que ejecuta `actualizarStockBsale` todos los días alrededor de
las 06:00 (hora de Chile, definida en `appsscript.json`). Puedes revisar o
eliminar el trigger desde el ícono de reloj (**Disparadores**) en el editor
de Apps Script.

Si necesitas otro horario, cambia `atHour(6)` en la función
`crearTriggerDiario()` dentro de `Code.gs` antes de volver a ejecutarla (esto
reemplaza el trigger anterior automáticamente).

## Notas y supuestos

- Marcas configuradas: `AGU` y `RUDY PROJECT` (editable en la constante
  `MARCAS` de `Code.gs`).
- Solo se incluyen productos y variantes en estado activo (`state = 0`).
- El stock sumado es el **stock disponible total** (`quantityAvailable`)
  across todas las sucursales/bodegas configuradas en Bsale.
- El precio de venta usa `variantValueWithTaxes` (precio final con
  impuestos) de la lista de precios indicada en `BSALE_PRICE_LIST_ID`.
- Si algún SKU falla al consultar stock o precio, se marca `ERROR` en la
  celda correspondiente en vez de detener toda la actualización, y queda
  registrado en el Registro (Logs) del editor.
- Si tu cuenta de Bsale usa un dominio regional distinto, ajusta la
  constante `BSALE_API_BASE` en `Code.gs` (por defecto `https://api.bsale.io/v1`).
