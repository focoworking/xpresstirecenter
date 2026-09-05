# xpresstirecenter.com

Sitio de **Xpress Tire Center** — llantas para semi trucks y servicio en carretera 24/7 en el
suroeste de Florida. Generador estático propio, cero dependencias de npm, salida en `dist/`.

La estrategia completa de marketing, publicidad y posicionamiento está en **[STRATEGY.md](STRATEGY.md)**.

## Comandos

```bash
node build.js        # genera dist/  (54 páginas: 27 EN + 27 ES)
node validate.js     # valida JSON-LD, meta, h1, enlaces internos, alt, hreflang
node serve.js        # vista previa en http://localhost:8899
npm run dev          # build + serve
```

Requiere Node 20 o superior. No hay `node_modules`.

## Estructura

```
src/data/         Única fuente de verdad. Editar aquí, no en el HTML.
  business.js       NAP, horarios, geo, marcas, prueba social   ← revisar los VERIFY
  services.js       7 servicios, bilingüe, con bloque de respuesta AEO
  locations.js      8 zonas con contenido local genuino
  faqs.js           14 preguntas, bilingüe, agrupadas por tema
  guides.js         3 guías largas, bilingüe, con tablas
  ui.js             Cadenas de interfaz EN/ES y rutas de navegación
src/lib/schema.js   Constructores de JSON-LD (@graph)
src/templates/      layout.js (head, header, footer) y components.js
assets/             CSS, JS, imágenes (OG generados a 1200×630)
build.js            Generador
validate.js         Verificador previo a publicar
dist/               Salida. Se puede subir tal cual.
```

## Antes de publicar

1. **Verificar los campos marcados `VERIFY`** en `src/data/business.js`:
   razón social, correo, año de fundación, coordenadas exactas del pin de Google,
   línea de despacho, idiomas y el inventario real de marcas en `brands`.
2. **`proof.aggregateRating` sigue en `null` a propósito.** Llenarlo únicamente con el número
   real de reseñas de Google. Nunca inventarlo.
3. **Fotos reales** del taller, las unidades móviles y el equipo. Reemplazar los gráficos SVG
   de relleno. Este cliente detecta una foto de banco de imágenes al instante.
4. **Confirmar los rangos de tiempo de respuesta** en `locations.js` contra el histórico real
   de despacho.
5. Revisar `dist/_redirects`: están los 301 desde las rutas del sitio anterior
   (`/our-store`, `/about-us`, `/delivery`, `/services`, `/financing`…). Ajustar si el
   inventario real de URLs viejas es distinto.

## Despliegue

Salida estática pura: sirve en Netlify, Cloudflare Pages, Vercel, S3+CloudFront o cualquier
hosting con archivos.

- **Netlify / Cloudflare Pages** — comando `node build.js`, directorio `dist`.
  `_redirects` y `_headers` se aplican solos. El formulario de cotización ya trae
  `data-netlify="true"` y honeypot.
- **Otro hosting** — subir `dist/` y trasladar `_redirects` y `_headers` a la configuración
  del servidor. Si el formulario no corre en Netlify, apuntar el `action` a tu endpoint
  (Formspree, Basin, función propia).

Después del despliegue: enviar `sitemap.xml` en Google Search Console y Bing Webmaster,
y verificar que `/llms.txt` y `/llms-full.txt` respondan con `text/plain`.

## Cómo agregar contenido

- **Servicio nuevo** → una entrada en `src/data/services.js` (EN + ES). Genera la página,
  el schema `Service`, las tarjetas, el footer, el sitemap y las entradas en llms.txt.
- **Ciudad nueva** → una entrada en `src/data/locations.js`. Escribir un `hook` real:
  qué carga se mueve ahí y por qué corredores. Nada de plantilla con el nombre cambiado.
- **Guía nueva** → una entrada en `src/data/guides.js` con bloques `{h2, p, list, table, callout}`.
  Empezar con `answer`: la respuesta directa de 40–60 palabras que los motores citan.
- **Pregunta nueva** → `src/data/faqs.js`. Primera oración = respuesta. Incluir una cifra
  concreta y nombrar la entidad y el lugar.

Después de cualquier cambio: `node build.js && node validate.js`.
