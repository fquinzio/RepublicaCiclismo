# Agendar hora en el showroom — enlaces y pasos

Ficha de trabajo para arreglar los dos llamados a la acción de "agendar hora en el showroom"
en republicaciclismo.cl (tema publicado: **Definitiva Impulse NO TOCAR - TKA**, Impulse 7.4.0).

## 1. Estado actual (verificado en la tienda)

### Barra de anuncios (roto)
Está en el grupo **Encabezado → Barra de anuncios**, segundo mensaje del carrusel
(bloque interno `announcement_7dyF9A`):

| Campo | Valor hoy |
|---|---|
| Texto | (vacío) |
| Texto del enlace | `AGENDA TU HORA EN NUESTRO SHOWROOM EN VITACURA` |
| Enlace | (vacío) |

El tema solo envuelve el mensaje en un `<a>` cuando el campo **Enlace** tiene algo
(`snippets/announcement-bar.liquid`). Con el enlace vacío el mensaje se muestra como
texto plano: no es clickeable en absoluto.

### Pie de página
Menú **TIENDA** (handle `footer`) → ítem "Agendar cita (sólo para showroom)".
Destino guardado hoy: enlace externo a
`https://api.whatsapp.com/send?phone=56955255067&text=Hola%2C%20quiero%20agendar%20una%20cita%20en%20el%20showroom`

O sea, hoy ya apunta a WhatsApp, no a la búsqueda del sitio. Igual conviene reemplazarlo por
el formato `wa.me` y un mensaje mejor (ver abajo).

## 2. Enlaces listos para pegar

Barra de anuncios y botón principal:

```
https://wa.me/56955255067?text=Hola%20Rep%C3%BAblica%20Ciclismo%20%F0%9F%91%8B%20Quiero%20agendar%20una%20hora%20en%20el%20showroom%20de%20Vitacura.%20%C2%BFQu%C3%A9%20horarios%20tienen%20disponibles%3F
```

Pie de página (menciona la dirección, útil cuando el clic viene del footer):

```
https://wa.me/56955255067?text=Hola%20Rep%C3%BAblica%20Ciclismo%20%F0%9F%91%8B%20Quiero%20agendar%20una%20cita%20en%20el%20showroom%20de%20Vitacura%20%28Escriv%C3%A1%20de%20Balaguer%209211%29.%20%C2%BFQu%C3%A9%20d%C3%ADas%20y%20horarios%20tienen%20disponibles%3F
```

Versión corta de respaldo:

```
https://wa.me/56955255067?text=Hola%2C%20quiero%20agendar%20una%20hora%20en%20el%20showroom%20de%20Vitacura.
```

## 3. Dónde se pega

**Barra de anuncios:** Shopify → Tienda online → Temas → tema publicado → Personalizar →
barra lateral izquierda, grupo **Encabezado** → **Barra de anuncios** → bloque
"AGENDA TU HORA EN NUESTRO SHOWROOM EN VITACURA" → campo **Enlace** → pegar → **Guardar**.

**Pie de página:** Shopify → Contenido → **Menús** → menú **TIENDA** →
ítem "Agendar cita (sólo para showroom)" → **Editar** → borrar el contenido del campo
**Enlace** y pegar la URL completa → **Aplicar** → **Guardar menú**.

Ojo con la trampa del campo Enlace de los menús: si se escribe texto en vez de pegar una URL
completa que empiece con `https://`, Shopify ofrece sugerencias y puede terminar guardando un
enlace a `/search?q=...` (la página de búsqueda). Siempre pegar la URL completa.

## 4. Página del showroom (creada y publicada)

- URL: https://republicaciclismo.cl/pages/showroom-vitacura
- Título de la página: `Visita nuestro showroom en Vitacura`
- Título SEO: `Showroom de ciclismo en Vitacura | AGU y Rudy Project | República Ciclismo`
- Descripción SEO: `Agenda tu hora en nuestro showroom de ciclismo en Vitacura: conoce cascos y anteojos Rudy Project y ropa AGU con asesoría personalizada. Escrivá de Balaguer 9211. WhatsApp +56 9 5525 5067.`

Copia del contenido publicado en `docs/pagina-showroom-vitacura.html`.

Datos confirmados e incorporados: horario lunes a viernes de 9:00 a 19:00, cita de unos
45 minutos (flexible), pago con tarjeta de crédito o transferencia, y estacionamiento de
visita preguntando en conserjería del Edificio Piamonte.

**Av. Apoquindo 4775 es solo la oficina legal, no una tienda.** No debe aparecer como
punto de venta en ninguna página. Pendiente de revisar: el menú **Ayuda** del pie de página
todavía muestra "Av Apoquindo 4775, Las Condes" con enlace a Google Maps.

## 5. Cambios ya aplicados en la tienda

- Página `/pages/showroom-vitacura` creada y publicada, con título y descripción SEO.
- Menú **TIENDA** del pie: el ítem "Agendar cita (sólo para showroom)" ahora es de tipo
  Página y apunta a `/pages/showroom-vitacura` (antes era un enlace externo a WhatsApp).

Pendiente, hay que hacerlo a mano en el editor del tema (Shopify no permite modificar por
API el tema publicado): pegar el enlace de WhatsApp en el campo **Enlace** del bloque
"AGENDA TU HORA EN NUESTRO SHOWROOM EN VITACURA" de la barra de anuncios.
