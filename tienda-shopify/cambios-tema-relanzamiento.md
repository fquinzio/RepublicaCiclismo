# Cambios aplicados al tema "Relanzamiento REPUBLICA CICLISMO (CLAUDE)"

Fecha: 24 de agosto de 2026
Tema intervenido: **Relanzamiento REPUBLICA CICLISMO (CLAUDE)** (ID 161535656190) — **no publicado**
Tema en vivo: "Definitiva Impulse NO TOCAR - TKA" (ID 136742273278) — **no se tocó**

> El tema "Relanzamiento" era una copia exacta del tema publicado, así que arrastraba todos los
> problemas detectados en la auditoría del 24/08/2026. Estos cambios los corrigen ahí.

---

## ⚠️ Lo que estos cambios NO hacen

**El sitio en vivo sigue igual.** Mientras el tema "Relanzamiento" no se publique, republicaciclismo.cl
sigue sirviendo el tema anterior, con el texto de ejemplo y el enlace a `instagram.com/elbosqueplantas`
en `/pages/team-rudy`.

Para cortar eso hoy, sin publicar nada, hay una sola vía: **despublicar la página**
(Tienda online → Páginas → `- NUESTRO EQUIPO -` → Visibilidad: Oculta → Guardar).

---

## Archivos modificados

| Archivo | Antes | Después | Qué se hizo |
|---|---|---|---|
| `templates/page.team-rudy.json` | 4.408 B | 1.375 B | Eliminadas las 2 secciones de columnas de texto (6 bloques de ejemplo, 6 botones "Optional button" y **el enlace a instagram.com/elbosqueplantas**). Se conservó la portada y se **activó la sección de contenido de página**, para poder escribir el texto desde Páginas sin tocar el tema. Título de portada: "TEAM RUDY" → "NUESTRO EQUIPO" |
| `templates/page.page.json` | no existía | 113 B | **Creado.** Es la plantilla que buscaba la página "Distribuidores Agu y Rudy Project" y que no existía en el tema |
| `templates/page.contact.json` | 665 B | 699 B | Eliminado el bloque de texto en inglés (`Use this text to share information about your brand...`) |
| `templates/page.tecnologia-micas.json` | 4.673 B | 3.871 B | Eliminada la sección con título `Rich text` y el texto de ejemplo en inglés |
| `templates/page.ride-to-zero.json` | 11.234 B | 10.548 B | Eliminados los 2 bloques de texto de ejemplo en inglés |
| `templates/page.quienes-somos.json` | 6.950 B | 5.055 B | Eliminada la sección con 2 × `Example title`, texto de ejemplo, 2 botones "Optional button" y 2 capturas de pantalla (`Captura_de_Pantalla_2023-08-28_*`) |
| `templates/page.faq.json` | 6.431 B | 7.171 B | Datos del negocio anterior corregidos (ver abajo) |

Sin cambios: `page.about.json`, `page.full-width.json`, `page.json`,
`page.tecnologia-anteojos.json`, `page.tecnologia-cascos.json` (estas dos últimas no tenían texto de
ejemplo; su problema son las imágenes, que requieren archivos de reemplazo).

### Detalle de `page.faq.json`

| Antes | Ahora |
|---|---|
| `info@rudyprojectchile.cl` (6 veces) | `contacto@republicaciclismo.cl` |
| "¿Es seguro comprar en **Rudy Project Chile**?" | "¿Es seguro comprar en **República Ciclismo**?" |
| "¿Tienen tienda física? Sí, en Escrivá de Balaguer 9211" | Tienda: Av. Apoquindo 4775, Las Condes. Showroom **con cita previa**: Escrivá de Balaguer 9211 |
| "365 días de garantía, la misma para todos los productos" | AGU: 3 años · Rudy Project: 1 año · resto: la del fabricante |
| — | **Pregunta nueva:** envío gratis sobre $50.000 en RM y $100.000 en regiones |
| Sin WhatsApp | Enlace a WhatsApp +56 9 5525 5067 |

**Datos que quedaron sin verificar** y que conviene revisar antes de publicar: los medios de pago
(Transferencias, Mercado Pago, Ventipay), los tiempos de entrega (1 a 4 días / 20 días hábiles en
ofertas) y el plazo de cambio (30 días). Se dejaron tal cual estaban.

**Sobre la garantía:** se usaron los plazos indicados por el negocio (AGU 3 años, Rudy Project 1 año),
que están marcados como "a confirmar con las marcas". Confirmar antes de publicar.

---

## Verificación

Los 7 archivos se validaron como JSON correcto antes de subirlos, y se comprobó que ninguno contiene
ya las cadenas `Example title`, `Use this text`, `Use this section`, `Optional button`, `Rich text`,
`elbosqueplantas`, `rudyprojectchile` ni `365 días`. Tras la subida se confirmó contra la API que los
archivos quedaron guardados y con el contenido esperado.

---

## Pendientes en este tema

| # | Pendiente | Qué se necesita |
|---|---|---|
| 1 | Reemplazar 5 capturas de pantalla visibles | Imágenes originales de AGU / Rudy Project o fotos propias |
| 2 | Contenido de la página de embajadores | Nombres, fotos, disciplinas, Instagram y productos de cada persona, más su autorización por escrito |
| 3 | Portada de `- NUESTRO EQUIPO -` | Sigue usando `Captura_de_Pantalla_2023-09-07_a_la_s_12.01.42.png` |
| 4 | Portadas de TECNOLOGÍA ANTEOJOS y TECNOLOGÍA CASCOS | Ídem, 3 capturas más |

## Pendientes fuera del tema (afectan al sitio en vivo hoy)

Estos viven en la configuración de la tienda, no en el tema, así que valen para cualquier tema que
se publique:

| # | Pendiente | Dónde |
|---|---|---|
| 5 | Despublicar `- NUESTRO EQUIPO -` | Tienda online → Páginas |
| 6 | Redirección 301 de `/pages/team-rudy` | Tienda online → Navegación → Redireccionamientos |
| 7 | Menú "Ayuda": la dirección de la tienda apunta a `https://googlemaps.com` (genérico) | Navegación |
| 8 | Menú "TIENDA": "Agendar cita (sólo para showroom)" apunta a `/search` | Navegación |
