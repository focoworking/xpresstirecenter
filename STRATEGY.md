# Xpress Tire Center — Estrategia 360 de expansión
**Mercado:** semi truck tires, suroeste de Florida (Lee, Collier, Charlotte, Hendry)
**Fecha:** septiembre 2026 · **Base:** 5530 4th St W, Lehigh Acres, FL 33971 · (239) 314-8100

---

## 1. Diagnóstico: qué está mal con el sitio actual

Nota de método: `xpresstirecenter.com` está bloqueado por el proxy de red de este entorno,
así que el diagnóstico se armó con los títulos, descripciones y snippets indexados de las
páginas del sitio (`/`, `/services`, `/our-store`, `/about-us`, `/delivery`), más los
perfiles de Facebook, Instagram, Yelp, Trucker Guide y directorios locales. **Verificar en
pantalla los puntos marcados (V) antes de ejecutar.**

| # | Debilidad | Costo real |
|---|---|---|
| 1 | **Sin arquitectura por servicio ni por ciudad.** Cinco páginas genéricas (`/services`, `/our-store`, `/about-us`, `/delivery`). No hay una URL que compita por "semi truck tire repair Fort Myers" ni por "24 hour truck tire Naples". | Cero posibilidad de rankear en las búsquedas que traen la llamada. Cada ciudad y cada servicio que no tiene página es una consulta regalada al competidor. |
| 2 | **Mezcla carros y camiones.** El sitio habla de "personal and commercial vehicles" en la misma respiración. | El dueño de flota no sabe si eres una llantera de barrio o un proveedor comercial. Google tampoco. La entidad queda borrosa para SEO y para LLM. |
| 3 | **Sin cobertura del corredor I-75.** Ninguna mención a marcadores de milla, Alligator Alley, SR-82, SR-29. | El activo geográfico más valioso de la región está sin reclamar. Un operador varado no busca "Lehigh Acres", busca "truck tire I-75 mile marker 123". |
| 4 | **Sin español.** (V) Zona con una base enorme de owner-operators y flotas agrícolas hispanohablantes: Lehigh Acres, Immokalee, Fort Myers. | Se pierde la mitad del mercado más leal y menos disputado por los competidores grandes. |
| 5 | **Sin contenido citable.** No hay guías, FAQ estructurada, tablas ni datos. | Invisible para AI Overviews, ChatGPT, Perplexity y Gemini. En 2026 eso ya no es "extra": es el canal donde se decide el proveedor antes de la llamada. |
| 6 | **Datos estructurados ausentes o mínimos.** (V) Sin `LocalBusiness`/`AutoRepair`, sin `Service`, sin `FAQPage`, sin `GeoCircle`. | Sin rich results, sin panel confiable, sin señal de entidad para motores generativos. |
| 7 | **Conversión pasiva.** El teléfono no domina la pantalla; no hay barra fija de llamada en móvil, ni bloque de "qué datos tener listos", ni SMS. | El 70% del tráfico de emergencia es móvil, con una mano, bajo presión. Cada segundo de fricción es una llamada al competidor. |
| 8 | **Sin propuesta para flotas.** No hay programa, ni inspección, ni facturación consolidada, ni cuenta con ejecutivo. | El ticket recurrente y de mayor margen ni siquiera está en el menú. Se compite sólo por la emergencia suelta. |
| 9 | **Plataforma rígida.** (V) Sitio tipo constructor visual: control limitado de `<head>`, schema, hreflang, redirects y velocidad. | Techo bajo para todo lo anterior. |
| 10 | **Prueba social desconectada.** Reseñas fuertes en Google/Yelp/Facebook, pero no aparecen en el sitio ni alimentan el schema. | Se pierde el activo de confianza ya ganado. |

---

## 2. La oportunidad: por qué este mercado y por qué ahora

- **Lee, Collier y Charlotte reciben ~100 residentes nuevos por día.** Lee County está entre
  los 10 condados de mayor crecimiento de Estados Unidos (+19% en la década).
- **FDOT va a ampliar 21 millas de la I-75** entre Golden Gate Parkway y Alico Road,
  con obra iniciando a finales de 2026 (~$600M). Más obra = más volteos, más equipo pesado,
  más desgaste, más reventones, y años de tráfico de construcción.
- **Fort Myers es base de distribución natural** para Lee, Collier, Charlotte y Sarasota:
  Tampa a 2 horas, Orlando a 2.5, Atlanta a 9.
- **Immokalee mueve producto de octubre a mayo** con tráfico nocturno constante por SR-29 y SR-82.
- **El competidor grande no es local.** Southern Tire Mart, Boulevard Tire y las redes de
  cuenta nacional (Bridgestone FleetAccess+, Goodyear National Accounts, Michelin Advantage)
  ganan por escala y por contrato, no por rapidez ni por trato. Los locales
  (Truck Tire Paradise, Performance Truck Tire, Truck Tire Giant, RoadRunner Fleet) compiten
  en el mismo terreno pero con sitios igual de débiles.

**La brecha explotable:** nadie en el suroeste de Florida está posicionado como *la* autoridad
del corredor I-75 en llantas comerciales, bilingüe, con respuesta 24/7 y contenido que los
motores de IA puedan citar. Ese hueco se cierra con contenido y estructura, no con presupuesto.

**Posicionamiento propuesto:**
> La llantera de camiones del corredor I-75. Base en Lehigh Acres, 75 millas de radio,
> despacho 24/7 contestado por una persona, en inglés y en español.

---

## 3. Estrategia 360

### 3.1 SEO — la base técnica y de arquitectura

**Arquitectura (implementada en este repo):**

```
/                                   Home (entidad + conversión)
/services/                          Hub de servicios
  /emergency-truck-tire-road-service/    ← intención de emergencia, la más rentable
  /commercial-truck-tires/               ← intención de compra
  /fleet-tire-program/                   ← intención B2B recurrente
  /mobile-tire-service-and-delivery/
  /truck-tire-repair-and-retreads/
  /truck-alignment-brakes-and-pm/
  /tire-financing/                       ← intención de owner-operator sin capital
/service-area/                      Hub geográfico
  /fort-myers/ /naples/ /lehigh-acres/ /i-75-corridor/
  /cape-coral/ /immokalee/ /punta-gorda-port-charlotte/ /bonita-springs-estero/
/learn/                             Hub editorial (autoridad + citas de IA)
  /i-75-truck-tire-emergency-guide/
  /lower-fleet-cost-per-mile-tires-florida/
  /semi-truck-tire-size-guide/
/faq/  /brands/  /about/  /contact/  /quote/
/es/…                               Espejo completo en español con hreflang recíproco
```

**Técnico:**
- Estático puro. Sin JS bloqueante, sin framework, CSS en un archivo, LCP de texto sobre gradiente.
- `canonical` en cada URL, `hreflang` recíproco EN/ES + `x-default`.
- `sitemap.xml` con prioridad y `lastmod` reales; `robots.txt` con IA permitida a propósito.
- `_redirects` 301 desde las rutas viejas (`/our-store`, `/about-us`, `/delivery`, `/services`)
  — **crítico** para no perder el equity del dominio en la migración.
- `_headers` con HSTS, `nosniff`, cache inmutable de assets.
- Un `<h1>` por página, jerarquía limpia, breadcrumbs con schema.

**Datos estructurados (`@graph` en cada página):**
`AutoRepair` + `TireShop` + `LocalBusiness` con `@id` estable, `GeoCircle` de 75 millas,
`openingHoursSpecification`, `ContactPoint` de emergencia 24/7, `knowsLanguage`, `brand[]`,
`paymentAccepted` · `Service` por servicio y por ciudad · `FAQPage` · `BreadcrumbList` ·
`Article` en guías · `WebSite` con `SearchAction`.
`aggregateRating` queda **vacío a propósito**: se llena con el dato real de Google, nunca inventado.

**Prioridades de keyword (por valor de llamada, no por volumen):**

| Nivel | Ejemplos | Página |
|---|---|---|
| Emergencia | truck tire blowout I-75, 24 hour semi tire repair Fort Myers, mobile truck tire near me | `/services/emergency-truck-tire-road-service/` + páginas de ciudad |
| Compra | 11R22.5 price Fort Myers, semi truck tires Naples, used truck tires Lehigh Acres | `/services/commercial-truck-tires/`, `/brands/` |
| Flota | fleet tire service Lee County, commercial tire account Naples | `/services/fleet-tire-program/` |
| Español | llantera de trocas cerca de mí, ponchadura de troca Fort Myers | espejo `/es/` completo |
| Informacional | legal tread depth semi truck, are retreads safe, tire size guide | `/learn/`, `/faq/` |

**Off-site:**
- NAP idéntico en Google Business Profile, Apple Business Connect, Bing Places, Yelp, Trucker Path,
  TruckDown, FindTruckService, Trucker Guide, Facebook, Apple Maps.
- Enlaces locales: Horizon Council, cámaras de Lee/Collier, asociaciones de constructores,
  cooperativas agrícolas de Immokalee, escuelas de CDL, patios de reparación y grúas
  (relación recíproca de referidos: ellos remolcan, tú pones llanta).

### 3.2 AEO — ser la respuesta, no un resultado

Cada página lleva un **bloque de respuesta** de 40–60 palabras arriba del pliegue, con:
la entidad nombrada, la geografía explícita, un dato numérico y el teléfono. Es el texto que
los motores de respuesta extraen literal. Ya está implementado como `.answer[data-aeo]`.

Reglas de redacción aplicadas en todo el contenido:
1. La primera oración de cada sección responde la pregunta. Nada de introducción.
2. Cifras concretas: 45–90 minutos, milla 80 a 161, 4/32", 49 CFR 393.75, 30–50% de ahorro.
3. Entidad + lugar en la misma oración, siempre.
4. Tablas para lo comparativo (marcadores de milla, patrones de desgaste, medidas). Las tablas
   se citan más que los párrafos.
5. FAQ real: 14 preguntas que un operador escribe de verdad, agrupadas por tema, con `FAQPage`.

**Objetivo medible:** aparecer en AI Overviews de Google para "24 hour truck tire service I-75 Florida",
"semi truck tire repair Fort Myers" y sus variantes en español, en 90–120 días.

### 3.3 GEO — dominar el territorio, milla por milla

- **8 páginas de ciudad/corredor** con contenido genuinamente distinto: cómo se mueve la carga
  ahí, qué corredores, qué tipo de flota, tiempo de respuesta comprometido, ZIPs. Cero plantilla
  rellenada con el nombre de la ciudad.
- **La página del corredor I-75 es la joya**: tabla de marcadores de milla 80–170 con tiempo de
  respuesta realista por tramo. Nadie más en el mercado tiene eso publicado.
- **Google Business Profile como segundo sitio:** categoría principal *Truck Repair Shop* o
  *Tire Shop*; secundarias *Truck Accessories Store*, *Auto Repair Shop*. Atributos: abierto 24 h
  (servicio), se habla español, identifica el negocio. Productos = servicios con precio "desde".
  Publicaciones semanales. Respuesta a toda reseña en menos de 24 h, en el idioma en que se escribió.
- **Meta geo** (`geo.position`, `ICBM`, `geo.placename`) + `GeoCircle` de 75 millas en schema.
- **Segundo pin cuando exista operación real** en Fort Myers o Naples (bodega o unidad estacionada
  con dirección verificable). No antes: un pin falso quema el perfil.

### 3.4 LLM / AI — ser la fuente que el modelo ya conoce

- **`/llms.txt`**: ficha completa de la entidad en texto plano — NAP, horarios, radio, idiomas,
  formas de pago, medidas en existencia, marcas, los 7 servicios con su respuesta, las 8 zonas,
  las 3 guías y las 14 FAQ. Un solo archivo de alta señal.
- **`/llms-full.txt`**: el cuerpo completo de las guías en markdown, tablas incluidas, para ingesta
  de una sola pasada.
- **`robots.txt` abre explícitamente** GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot,
  Google-Extended, Applebot-Extended, Amazonbot, meta-externalagent, YouBot. Bloquearlos es
  invisibilidad autoinfligida.
- **Consistencia de entidad**: nombre, dirección y teléfono escritos igual en las 54 páginas,
  en el schema, en los dos archivos llms y en cada directorio. Los modelos resuelven entidades
  por repetición consistente.
- **Diferenciación por motor**: Perplexity premia frescura → actualizar guías cada trimestre y
  poner `dateModified` real. ChatGPT premia autoridad enciclopédica → guías largas y estructuradas.
  Google AI Overviews premia posición orgánica → el SEO clásico sigue siendo el piso.
- **Ciclo de auditoría mensual**: preguntar a ChatGPT, Claude, Perplexity, Gemini y Copilot
  las 20 consultas objetivo, registrar si se cita a Xpress, y qué fuente citan en su lugar.
  Esa fuente es el hueco de contenido del mes siguiente.

### 3.5 AI operativa — la IA que gana dinero, no la que se presume

| Uso | Qué resuelve |
|---|---|
| **Recepción de despacho por IA (voz)** fuera de horario | Nadie contesta a las 3 a.m. cuando ya hay tres llamadas. Un agente de voz toma milla, dirección, medida, posición y unidad, y despierta al técnico con el ticket armado. |
| **Cotizador conversacional** en el sitio y en WhatsApp | Convierte "¿cuánto cuesta una llanta?" en un lead calificado con medida, cantidad y urgencia. Bilingüe. |
| **Enrutamiento de despacho** | Prioriza por cercanía + cuenta de flota + valor del ticket en vez de por orden de llegada. |
| **Predicción de desgaste** con el histórico de inspecciones | Convierte al cliente de flota en compra programada: "estas 6 posiciones llegan a 4/32 en 3 semanas". |
| **Fábrica de contenido local** | Generar y mantener las páginas de ciudad, las FAQ y las variantes en español desde el mismo repo de datos. Ya está montado: la data vive en `src/data/`, el HTML se regenera con un comando. |
| **Escucha de reseñas** | Alerta y borrador de respuesta en menos de 1 hora, en el idioma de la reseña. |

### 3.6 Publicidad de pago — comprar la emergencia, cultivar la flota

**Google Ads (motor principal).**
- *Campaña 1 — Emergencia, Search + Call-only.* Palabras: "24 hour truck tire", "semi tire repair
  near me", "truck tire blowout I-75". Sólo llamadas en móvil. Presencia 24/7, con puja subida
  entre 18:00 y 06:00, que es cuando el competidor apaga y el margen es mayor. Radio geográfico
  sobre el trazo de la I-75, no un círculo sobre la ciudad.
- *Campaña 2 — Compra.* "11R22.5", "semi truck tires near me", por medida. A `/services/commercial-truck-tires/`.
- *Campaña 3 — Español.* Mismos grupos en español, a `/es/`. CPC históricamente más bajo, misma intención.
- *Campaña 4 — Flota, Search + LinkedIn.* "fleet tire service", "commercial tire account", a
  `/services/fleet-tire-program/`. Objetivo: solicitud de diagnóstico gratis.
- Extensiones: ubicación, llamada, sitelinks a emergencia/flota/financiamiento, precio "desde".

**Local Services Ads / Google Guaranteed** si la categoría lo permite en Lee y Collier: paga por lead,
no por clic, y aparece arriba del mapa.

**Fuera de buscador, donde de verdad está el operador:**
- Trucker Path, TruckDown y FindTruckService: listados pagados. Es el GPS que el operador ya trae abierto.
- Radio en español en Fort Myers/Immokalee durante temporada de cosecha.
- Facebook/Instagram geosegmentado a grupos de owner-operators y a intereses de transporte,
  creativo en español, oferta = financiamiento.
- Vallas o rotulación en salidas clave de la I-75 (131, 138, 143) y en SR-82.
- **Rotulación de las unidades móviles.** El servicio en carretera es un anuncio parado en el
  acotamiento frente a mil vehículos por hora. Número gigante, "24/7", "SE HABLA ESPAÑOL".
- Alianzas de referido con grúas y talleres móviles: ellos no ponen llanta, tú no remolcas.

**Presupuesto sugerido de arranque (mensual):** 55% Google Search emergencia + compra,
15% español, 15% directorios de camioneros, 10% social, 5% pruebas. Revisar a los 60 días
contra costo por llamada contestada, no contra clics.

### 3.7 Conversión y medición

Implementado en el sitio:
- Barra roja de emergencia fija arriba, con el teléfono siempre visible.
- Barra fija inferior en móvil: **Llamar / Texto / Cotizar**.
- Tarjeta "¿Llanta abajo ahora?" con los 5 datos que aceleran el despacho — reduce el tiempo de
  la llamada y el riesgo de mandar la llanta equivocada.
- Detección de fuera de horario: después de las 18:00 el mensaje cambia a
  "El taller está cerrado — el despacho no".
- Formulario que califica: necesidad, urgencia, medida, cantidad, ubicación.
- Eventos a `dataLayer`/`gtag`: `call_click`, `sms_click`, `generate_lead`, `cta_click`,
  `scroll_depth`, `after_hours_visit`, con `cta_id`, `page_path` e idioma.

Pendiente de conectar (requiere cuentas del cliente):
- Número de seguimiento de llamadas con inserción dinámica (CallRail o similar), separando
  orgánico / pago / GBP / directorios.
- GA4 + Google Ads con `call_click` y `generate_lead` como conversiones primarias.
- CRM ligero para el pipeline de flotas.

**KPIs reales (no clics):**
llamadas contestadas por canal · costo por llamada contestada · tasa de llamada→despacho ·
tiempo de llegada promedio por tramo de la I-75 · cuentas de flota activas · ticket promedio ·
% de ingreso recurrente vs emergencia suelta · menciones citadas en motores de IA.

---

## 4. Ruta de ejecución

**Fase 1 — Fundación (semanas 1–4).**
Verificar los campos marcados `VERIFY` en `src/data/business.js`. Publicar el sitio.
Cargar los 301 desde las rutas viejas. Verificar propiedad en Search Console y Bing y enviar sitemap.
Reclamar y completar Google Business Profile, Apple Business Connect, Bing Places.
Conectar seguimiento de llamadas y GA4. Fotos reales del taller, las unidades y el equipo:
las fotos genéricas de banco de imágenes matan la credibilidad con este cliente.

**Fase 2 — Territorio (semanas 5–12).**
Encender Google Ads de emergencia. Campaña de reseñas: pedir reseña en Google al cerrar cada
servicio, con QR en el mostrador y en la unidad, en los dos idiomas. Listados en Trucker Path,
TruckDown y FindTruckService. Alianzas con grúas. Publicar 2 guías nuevas por mes.
Primer barrido de auditoría de citas en LLM.

**Fase 3 — Flotas (meses 4–6).**
Lanzar formalmente el programa de flotas con diagnóstico gratis. Meta: 20 cuentas activas.
Vender el resultado del diagnóstico, no la llanta. Facturación consolidada y reporte de costo
por unidad. Rotular todas las unidades móviles.

**Fase 4 — Expansión (meses 7–12).**
Con la ruta ya probada, evaluar segundo punto físico o unidad estacionada permanente hacia
Fort Myers (Alico/Luckett) o Naples (Collier Blvd) para bajar el tiempo de respuesta a menos
de 45 minutos en Collier. Crear la página de ubicación y el GBP sólo cuando exista dirección
verificable. Evaluar cuenta nacional (Bridgestone, Goodyear, Michelin) para capturar flotas
grandes de paso — se cede margen y se gana volumen y previsibilidad.

---

## 5. Riesgos y cómo se manejan

| Riesgo | Manejo |
|---|---|
| Perder posiciones al migrar del sitio viejo | 301 uno a uno en `_redirects`, mismo dominio, sitemap enviado el día del cambio, monitoreo diario de Search Console las primeras 4 semanas. |
| Publicar datos sin verificar (horarios, años, radio, marcas) | Todo lo dudoso está marcado `VERIFY` en `src/data/business.js`. No se publica hasta confirmarlo con el dueño. |
| Fabricar prueba social | `aggregateRating` va vacío hasta tener el número real de Google. Un rating inventado es riesgo legal y de penalización. |
| Prometer tiempos que no se cumplen | Los tiempos publicados son rangos, con descargo visible en el pie. Ajustarlos con los datos reales de despacho al tercer mes. |
| Temporalidad (temporada baja de verano) | Empujar flotas de construcción y municipales, que no bajan en verano, y el programa de mantenimiento preventivo. |
| Competidor grande copia la jugada | La ventaja no es el contenido: es la respuesta bilingüe en 45 minutos. El contenido sólo hace que te encuentren. |

---

## 6. Qué hay en este repositorio

- 54 páginas indexables (27 EN + 27 ES), generadas desde datos, sin dependencias externas.
- `src/data/` es la única fuente de verdad: cambiar un teléfono ahí lo cambia en las 54 páginas,
  en el schema, en el sitemap y en los archivos llms.
- `node build.js` regenera todo. `node validate.js` verifica JSON-LD, títulos, descripciones,
  un solo `<h1>`, enlaces internos rotos, `alt` en imágenes y reciprocidad de `hreflang`.
- Ver `README.md` para el despliegue.
