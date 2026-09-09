# Widgets de cuotas en la ficha de producto

En la ficha de producto convivien **dos** avisos de cuotas, de proveedores
distintos. Los dos tenían el mismo error de raíz: calculaban sobre el precio
*más bajo* del producto, no sobre la variante que el cliente está mirando.

## 1. Mercado Pago (recuadro propio)

- **Promo:** 3 cuotas sin interés, mínimo $50.000.
- **Vive en:** `templates/product.json` → sección `main` → bloque
  `custom_Tji4bX` (tipo *Custom*). Copia versionada:
  `widget-cuotas-mercadopago.liquid`.
- **Para cambiar la promo:** los atributos `data-rc-cuotas` y `data-rc-minimo`
  del `<div class="rc-cuotas">`. No hay que tocar el JavaScript.
- Bajo el mínimo el recuadro se oculta completo.

## 2. VentiPay (widget del proveedor)

- **Promo:** 3 cuotas sin interés, límites $1.000 – $300.000. Esos valores
  están dentro del script de VentiPay (`js.ventipay.com`), no los definimos
  nosotros.
- **Vive en:** `snippets/product-form.liquid`, junto a los botones de compra.
  Copia versionada: `product-form.liquid`.
- VentiPay instala el snippet con `product.price_min` (el precio más bajo del
  producto). Lo cambiamos a `product.selected_or_first_available_variant.price`.
  Es una desviación deliberada de su instalación oficial: si se reinstala o
  actualiza la app de VentiPay, hay que volver a aplicarla.
- Su widget se dibuja una sola vez al cargar y no reacciona al cambio de
  variante. Un script propio, agregado después del suyo, reescribe **sólo el
  monto** cuando cambia color o talla. Si VentiPay cambia su markup, ese script
  no toca nada y queda el texto original de ellos.

## Redondeo

VentiPay redondea la cuota **hacia abajo** (`Math.floor`) dentro de su script
minificado, y no es configurable. El widget de Mercado Pago usa el mismo
criterio, para que los dos recuadros muestren la misma cifra. No es exacto al
peso: $149.990 ÷ 3 = $49.996,67 y se muestra $49.996, así que la última cuota
real absorbe la diferencia (2 pesos).

## Origen del bug

`product.price` y `product.price_min` en Liquid devuelven el precio **mínimo**
entre todas las variantes. En el casco Venger (variantes de $99.990, $149.990 y
$179.990) eso hacía que ambos widgets anunciaran cuotas sobre $99.990 mientras
la ficha mostraba $149.990.

## Advertencia

Ninguno de los dos consulta al proveedor: son textos nuestros calculados en el
navegador. Si Mercado Pago o VentiPay cambian sus promociones, la ficha seguirá
mostrando lo de antes hasta que se edite a mano.
