# Auditoría de páginas y plantillas — Republica Ciclismo

Fecha: 24 de agosto de 2026
Tema publicado (en vivo): **"Definitiva Impulse NO TOCAR - TKA"** (Impulse, ID 136742273278)
Alcance: las 11 plantillas de página del tema publicado, más los menús de navegación.

---

## 1. El problema urgente: página "- NUESTRO EQUIPO -"

| Dato | Valor |
|---|---|
| Título | `- NUESTRO EQUIPO -` |
| Dirección | `/pages/team-rudy` |
| Estado | **PUBLICADA** (visible al público) |
| Publicada desde | 29 de septiembre de 2021 |
| Última modificación | 16 de julio de 2026 |
| Plantilla | `templates/page.team-rudy.json` |
| Contenido propio de la página | **vacío** (la sección de contenido está desactivada) |
| ¿Está en algún menú? | **No.** No aparece en el menú principal ni en el pie de página. |

### Qué contiene realmente la plantilla

La página se arma con 3 secciones:

1. **Portada (slideshow)** — título "TEAM RUDY" sobre la imagen
   `Captura_de_Pantalla_2023-09-07_a_la_s_12.01.42.png` → **es una captura de pantalla**, usada
   tanto en escritorio como en móvil.
2. **Primera fila de 3 columnas de texto** — los 3 bloques dicen:
   - Título: `Example title`
   - Texto: `Use this section to explain a set of product features, to link to a series of pages,
     or to answer common questions about your products. Add images for emphasis.`
   - Botón: `Optional button`, sin enlace.
3. **Segunda fila de 3 columnas de texto** — idénticos a los anteriores, salvo que el
   **primer bloque tiene el botón enlazado a `https://www.instagram.com/elbosqueplantas/`**.

Total: **6 bloques de texto de ejemplo en inglés**, **6 botones que dicen "Optional button"**,
de los cuales **1 lleva a un Instagram ajeno**, y **1 imagen de portada que es una captura de pantalla**.

Confirmado: coincide exactamente con lo reportado.

---

## 2. Despublicar la página (medida inmediata)

1. Entrar al panel de Shopify.
2. Menú lateral: **Tienda online → Páginas**.
3. Buscar y abrir **`- NUESTRO EQUIPO -`**.
4. En la columna derecha, recuadro **"Visibilidad"**, marcar **"Oculta"** (o "No visible").
5. Botón **Guardar** arriba a la derecha.

Efecto inmediato: `/pages/team-rudy` deja de estar disponible al público y el botón que lleva a
`elbosqueplantas` deja de ser accesible desde el sitio.

Sin riesgo colateral: la página **no está enlazada en ningún menú**, así que no se rompe la
navegación. Se puede volver a publicar en cualquier momento con el mismo botón.

**Pendiente asociado:** al despublicarla, la dirección `/pages/team-rudy` pasará a dar error 404.
Como la página existe desde 2021, conviene crear una redirección 301 desde `/pages/team-rudy`
hacia otra página (por ejemplo `/pages/sobre-nosotros`) en
**Tienda online → Navegación → Redireccionamientos de URL**.

---

## 3. Eliminar el enlace a instagram.com/elbosqueplantas

El enlace **no está en la página**, está **dentro de la plantilla del tema publicado**, en el
archivo `templates/page.team-rudy.json`. Por eso no se puede borrar desde el editor de páginas.

Pasos en el editor de temas (2 minutos):

1. **Tienda online → Temas**.
2. En el tema **"Definitiva Impulse NO TOCAR - TKA"**, botón **⋯ → Duplicar**. Esperar a que
   aparezca la copia (respaldo antes de tocar nada).
3. Volver al tema publicado y pulsar **Personalizar**.
4. Arriba al centro hay un selector que dice "Página de inicio". Abrirlo y elegir
   **Páginas → - NUESTRO EQUIPO -**.
5. En la lista de secciones de la izquierda aparecerán dos secciones **"Columnas de texto"**.
6. Abrir la segunda, entrar al **primer bloque de texto** y **borrar el contenido del campo
   "Enlace del botón"** (ahí está la dirección de Instagram). Alternativa recomendada: eliminar
   las dos secciones completas con el ícono de basurero, ya que todo su contenido es de ejemplo.
7. **Guardar**.

Importante: aunque la página quede despublicada, **este enlace debe borrarse igual**. La plantilla
sigue existiendo en el tema y el enlace reaparecería apenas la página se vuelva a publicar.

> Nota técnica: la conexión que uso con Shopify tiene bloqueada la escritura sobre el tema
> publicado (es una protección del propio sistema). Por eso este cambio lo tiene que hacer una
> persona desde el editor de temas.

---

## 4. Revisión de TODAS las plantillas de página

Mapa de qué plantilla usa cada página:

| Plantilla | Página que la usa | Estado |
|---|---|---|
| `page.json` (por defecto) | Sobre nosotros, Cambios y devoluciones, Términos y Condiciones, Despachos, Política de privacidad, Preguntas frecuentes, Guía de Tallas | Publicadas — limpia |
| `page.contact.json` | Contacto | Publicada |
| `page.team-rudy.json` | - NUESTRO EQUIPO - | Publicada ⚠️ |
| `page.tecnologia-cascos.json` | TECNOLOGÍA CASCOS | Publicada ⚠️ |
| `page.tecnologia-anteojos.json` | TECNOLOGÍA ANTEOJOS | Publicada ⚠️ |
| `page.tecnologia-micas.json` | TECNOLOGÍA MICAS | Publicada ⚠️ |
| `page.ride-to-zero.json` | Ride to Zero | Publicada ⚠️ |
| `page.quienes-somos.json` | HISTORIA | Despublicada |
| `page.about.json` | ninguna | Huérfana |
| `page.faq.json` | ninguna | Huérfana ⚠️ |
| `page.full-width.json` | ninguna | Huérfana — limpia |
| `page.page.json` | Distribuidores Agu y Rudy Project | **NO EXISTE** ⚠️ |

### 4.1 Textos de ejemplo del tema sin personalizar

**Visibles al público hoy:**

- `page.team-rudy.json` — 6 × `Example title`, 6 × `Use this section to explain a set of product
  features...`, 6 × botón `Optional button`.

**Presentes pero desactivados** (no se ven, conviene borrarlos igual para que no reaparezcan):

- `page.contact.json` — bloque de texto `Use this text to share information about your brand...`
- `page.tecnologia-micas.json` — bloque con título `Rich text` y texto
  `Use this text to share information about your brand...`
- `page.ride-to-zero.json` — dos bloques `Use this text to share information about your brand...`
  (uno bajo el titular grande, otro bajo el título "Proceso")
- `page.quienes-somos.json` — 2 × `Example title` + `Use this section to explain a set of product
  features...` + 2 × `Optional button` (sección completa desactivada, y la página está despublicada)

**En plantilla huérfana** `page.faq.json` — no se ve porque ninguna página la usa, pero el
contenido está desactualizado y pertenece al negocio anterior:

- Correo `info@rudyprojectchile.cl` repetido 6 veces (no es un correo de República Ciclismo)
- Pregunta "¿Es seguro comprar en **Rudy Project Chile**?"
- "¿Tienen tienda física? Sí, en Escrivá de Balaguer 9211" → hoy esa dirección es el showroom
  **con cita previa**; la tienda es Av. Apoquindo 4775
- "¿Cuántos días son de garantía? 365 días" y "¿Es la misma garantía para todos los productos?
  Sí" → contradice la garantía de 3 años de AGU

### 4.2 Enlaces a sitios que no son tuyos

| Dónde | Enlace | Gravedad |
|---|---|---|
| `page.team-rudy.json`, botón del 1er bloque de la 2ª fila | `https://www.instagram.com/elbosqueplantas/` | **Crítico** — negocio ajeno |
| Menú "Ayuda" del pie de página, ítem "Av Apoquindo 4775, Las Condes" | `https://googlemaps.com` | Alto — dirección genérica, no lleva a tu local |
| Menú "TIENDA" del pie de página, ítem "Agendar cita (sólo para showroom)" | `/search` (el buscador) | Alto — promete agendar y lleva al buscador |
| `page.tecnologia-anteojos.json` | video YouTube `Vz2_hDhigi4` | Aceptable — contenido oficial Rudy Project |
| `page.tecnologia-cascos.json` | video YouTube `Q-H-uTVlw58` | Aceptable — ídem |
| `page.tecnologia-micas.json` | videos YouTube `fJJN0jTPqrQ`, `OYmMunA-Wy0` | Aceptable — ídem |
| Menú "Ayuda", showroom | `https://goo.gl/maps/qVaqdRN2XsASr7E19` | Correcto (ubicación real) |

No se encontró ningún otro enlace externo ajeno en las plantillas de página.

### 4.3 Imágenes que son capturas de pantalla

Siete archivos distintos, reconocibles porque el nombre parte con `Captura_de_Pantalla_`:

| Archivo | Dónde se usa | ¿Se ve hoy? |
|---|---|---|
| `Captura_de_Pantalla_2023-09-07_a_la_s_12.01.42.png` | Portada de **- NUESTRO EQUIPO -** (escritorio y móvil) y portada de **TECNOLOGÍA ANTEOJOS** (escritorio y móvil) | **Sí** |
| `Captura_de_Pantalla_2023-09-07_a_la_s_15.10.54.png` | Portada de **TECNOLOGÍA CASCOS** (escritorio) | **Sí** |
| `Captura_de_Pantalla_2023-09-07_a_la_s_15.11.47.png` | Portada de **TECNOLOGÍA CASCOS** (móvil) | **Sí** |
| `Captura_de_Pantalla_2023-09-07_a_la_s_15.29.52.png` | Columna central de **TECNOLOGÍA MICAS** | **Sí** |
| `Captura_de_Pantalla_2023-09-05_a_la_s_16.17.40.png` | Banda ancha de **Ride to Zero** | **Sí** |
| `Captura_de_Pantalla_2023-08-28_a_la_s_16.42.40.png` | HISTORIA (`page.quienes-somos.json`) | No (sección desactivada + página despublicada) |
| `Captura_de_Pantalla_2023-08-28_a_la_s_17.44.20.png` | HISTORIA (`page.quienes-somos.json`) | No (ídem) |

Que la misma captura sirva de portada para **- NUESTRO EQUIPO -** y para **TECNOLOGÍA ANTEOJOS**
sugiere que se copió la plantilla de una página a otra sin cambiar la imagen.

Reemplazo recomendado: fotos originales entregadas por AGU y Rudy Project, o fotos propias de
tienda/showroom. Las marcas suelen entregar material en alta resolución a sus distribuidores
oficiales.

### 4.4 Hallazgo adicional: página "Distribuidores" con plantilla inexistente

La página **Distribuidores Agu y Rudy Project** (`/pages/distribuidores-agu-rudy-project`,
publicada el 29 de julio de 2026) tiene asignada la plantilla `page` — es decir, busca el archivo
`templates/page.page.json`, que **no existe en el tema publicado**. Lo más probable es que esa
dirección esté cayendo en error. Importa porque **está enlazada en el menú del pie de página**
("Distribuidores").

Cómo verificarlo y corregirlo: abrir el enlace "Distribuidores" del pie de página. Si da error,
ir a **Tienda online → Páginas → Distribuidores Agu y Rudy Project**, y en el recuadro
**"Plantilla de tema"** de la derecha, cambiar de `page` a **`Predeterminado (page)`**. Guardar.

---

## 5. Propuesta de contenido para una página de embajadores

### Secciones sugeridas, en orden

1. **Portada** — una foto real de embajadores en ruta, con el título "Nuestros Embajadores" y
   una bajada de una línea: qué es el programa y qué representa.
2. **Párrafo de apertura (3-4 líneas)** — qué es el programa de embajadores de República
   Ciclismo, qué buscan en un embajador y qué tienen en común.
3. **Fichas de embajadores** — una tarjeta por persona (ver campos abajo).
4. **"El equipo elige"** — una fila con 3-6 productos que aparecen repetidos entre los
   embajadores, con enlace directo a cada producto.
5. **Cierre: postula al programa** — qué ofrece, qué se espera a cambio, y un botón a un
   formulario o al correo `contacto@republicaciclismo.cl`.

### Qué información por persona

Obligatorio (sin esto la ficha no se publica):
- Foto vertical, misma proporción para todas
- Nombre y apellido
- Disciplina y ciudad — ruta, gravel, MTB, triatlón
- Una línea de identidad: en qué anda, qué persigue
- Enlace a su Instagram (verificado, uno por uno)

Recomendado:
- Un logro o una cifra concreta que dé credibilidad
- 2-3 productos que realmente usa, con enlace a la ficha de cada uno
- Una frase corta suya sobre algún producto — funciona como reseña

**Autorización:** pedir por escrito a cada persona permiso para usar su nombre, su foto y su
frase en el sitio. Un correo de vuelta con un "sí, autorizo" basta y evita problemas.

### Cómo conectar cada embajador con sus productos (sin programar)

Con lo que ya tienes en la tienda, la vía más simple:

1. Crear una **colección manual** por embajador: "La elección de [Nombre]".
2. Agregar a esa colección los 3-6 productos que la persona usa.
3. En la ficha del embajador, poner un botón **"Lo que usa [Nombre]"** que lleve a esa colección.
4. En la descripción de la colección, escribir 2-3 líneas contando por qué eligió esos productos.

Ventajas: se mantiene desde el panel normal de Shopify, sirve para campañas de Instagram y correo,
y si un producto se agota basta con sacarlo de la colección. Riesgo a vigilar: son colecciones
nuevas que se suman a las 97 actuales, así que conviene un prefijo común (ej. "Embajador —")
para que no se pierdan en la lista.

---

## 6. ¿Conviene mantener la página?

**Sí, pero sólo si se lanza completa y con una fecha de revisión fijada.** La versión actual no es
una página incompleta: es una página que enseña texto de ejemplo en inglés y manda tráfico al
Instagram de otro negocio. En ese estado resta credibilidad en vez de sumarla.

La regla práctica: **una página de embajadores rinde si tiene al menos 4 personas reales, con foto
propia y productos enlazados.** Con menos de 4 se ve vacía. Sin foto propia, se nota.

**Costo real de mantenerla:** montarla bien toma un par de días de trabajo (juntar fotos, textos y
autorizaciones es lo lento, no el sitio). Después son unas 2 horas al año, más el rato que tome
sacar o agregar a alguien que entra o sale del programa.

**Lo que rinde:** contenido propio que ningún otro distribuidor tiene, prueba social real,
material reciclable para Instagram y correos, y un argumento concreto para reclutar embajadores
nuevos ("sales en el sitio").

**Recomendación concreta, en tres pasos:**

1. **Hoy:** despublicar y borrar el enlace ajeno. Sin discusión.
2. **Dentro de 3 semanas:** si ya están las fotos, textos y autorizaciones de al menos 4
   embajadores, rehacer la página y publicarla.
3. **Si a las 3 semanas no está el material:** eliminar la página y redirigir `/pages/team-rudy`
   a `/pages/sobre-nosotros`. Es preferible no tener la página a tenerla a medias.

**Alternativa de mantención casi cero,** si el material no se consigue: saltarse la página de
equipo y crear una sola colección **"Elegido por nuestros embajadores"** con los productos que
ellos usan, enlazada desde el menú. Entrega buena parte del beneficio comercial sin fichas que
haya que mantener persona por persona.

---

## Resumen de acciones pendientes

| # | Acción | Dónde | Urgencia |
|---|---|---|---|
| 1 | Despublicar `- NUESTRO EQUIPO -` | Páginas | Ahora |
| 2 | Duplicar el tema publicado (respaldo) | Temas | Antes de tocar nada |
| 3 | Borrar las 2 secciones de ejemplo de `page.team-rudy.json` (incluye el enlace a elbosqueplantas) | Editor de temas | Ahora |
| 4 | Redirección 301 de `/pages/team-rudy` | Navegación → Redireccionamientos | Al despublicar |
| 5 | Corregir plantilla de la página "Distribuidores" | Páginas | Alta — está en el pie de página |
| 6 | Arreglar el enlace `https://googlemaps.com` del pie de página | Navegación | Alta |
| 7 | Arreglar "Agendar cita" que lleva a `/search` | Navegación | Alta |
| 8 | Reemplazar las 5 capturas de pantalla visibles | Editor de temas | Media |
| 9 | Borrar los bloques de ejemplo desactivados de contact / micas / ride-to-zero / quienes-somos | Editor de temas | Media |
| 10 | Actualizar o eliminar la plantilla huérfana `page.faq.json` | Editor de temas | Baja |
| 11 | Decidir sobre la página de embajadores (rehacer o eliminar) | — | En 3 semanas |
