# Reseñas en la ficha de producto — auditoría y cambio

Fecha: 2026-08-26
Tema intervenido: **Relanzamiento REPUBLICA CICLISMO (CLAUDE)** (id 161535656190, sin publicar)
Archivo: `templates/product.json`

## Situación encontrada

Bloques/secciones relacionados con reseñas en la plantilla de producto:

| Elemento | Tipo | Dónde | Configuración |
|---|---|---|---|
| `judge_me_reviews_preview_badge_gn3ec8` | bloque app Judge.me "Preview badge" (estrellas) | dentro de la sección `main` (columna de compra), último del orden | sin ajustes |
| `loox-product-reviews-app-section` | sección `apps` de Loox | 8.ª en el orden | **sin ningún bloque adentro → no muestra nada** |
| `17797154411e6840df` → `judge_me_reviews_review_widget_wVqA3M` | sección `apps` con widget de reseñas Judge.me | 9.ª en el orden | `review_data: sample_data`, `max_width: 1200`, `show_shop_reviews: false`, `empty_state: empty_widget` |
| `178420828213606b3a` → `judge_me_reviews_review_widget_w79eBq` | **duplicado exacto** del anterior | 10.ª en el orden | idéntico |

El tema publicado (`Definitiva Impulse NO TOCAR - TKA`) tiene exactamente la misma configuración.

## Reseñas reales acumuladas (metafields de tienda)

- **Judge.me**: 18 en total, promedio 4,95 → 17 son reseñas de la tienda y **1 es reseña de producto**.
- **Loox**: 32 reseñas, promedio 4,8 (`loox.global_stats = "4.8,32"`).

## Cambio aplicado

Se eliminó la sección duplicada `178420828213606b3a` (y su entrada en `order`). No se tocó nada más.

Verificación en la vista previa del tema (`?preview_theme_id=161535656190`):
- widgets `jdgm-rev-widg` en la página: 2 → **1**
- bloque de cuotas Mercado Pago intacto ("Pago en cuotas", logo y texto "(sin interés)" presentes)

## Pendiente (requiere decisión del dueño)

- El tema **publicado** sigue con la sección duplicada.
- La sección de Loox está vacía: las 32 reseñas de Loox no se muestran en la ficha.
- Los widgets de Judge.me están en "datos de ejemplo" y con `show_shop_reviews: false`.
- El bloque de reseñas queda al final de la página, después de "Vistos recientemente".
