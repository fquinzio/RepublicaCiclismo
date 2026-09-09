# Widget de cuotas Mercado Pago

Código del recuadro "Pago en cuotas" que aparece en la ficha de producto.

- **Promo vigente:** 3 cuotas sin interés, monto mínimo $50.000.
- **Dónde vive:** tema Impulse → plantilla `templates/product.json` → sección
  `main` (`main-product`) → bloque `custom_Tji4bX` (tipo *Custom*, campo
  "código"). Se edita desde Personalizar tema o desde el editor de código.
- **Archivo de referencia:** `widget-cuotas-mercadopago.liquid` es la copia
  versionada de ese código. Al cambiarlo hay que pegarlo de vuelta en el bloque.

## Cómo calcula

1. Precio de la **variante seleccionada** (`selected_or_first_available_variant`),
   no `product.price` — que es el precio *más bajo* del producto y era el origen
   del bug de julio 2026 (mostraba cuotas sobre $99.990 en un casco de $149.990).
2. Se recalcula al cambiar color o talla: lee el id de variante del formulario
   y, como respaldo, observa el precio que pinta el tema (`[data-product-price]`).
3. Bajo el mínimo de $50.000 el recuadro se oculta completo.
4. La cuota se redondea **hacia arriba** (`Math.ceil`), para no mostrar un monto
   menor al que efectivamente se cobra.

## Para cambiar la promo

En el `<div class="rc-cuotas">`: `data-rc-cuotas` (n° de cuotas) y
`data-rc-minimo` (monto mínimo en pesos). No hay que tocar el JavaScript.

> El widget es texto propio, no consulta a Mercado Pago. Si la promo cambia,
> hay que actualizar estos dos valores a mano.
