# TireNexus — sistema de identidad de marca v1.0

Manual completo navegable: `brandbook.html` (se publica como artifact/página estática).
Tokens: `tokens/tokens.json`, `tokens/tokens.css`. Logotipos: `logo/`.

**Naturaleza de la marca.** TireNexus es la cara mayorista B2B: distribución de llanta comercial,
agrícola y de pasajero a dealers, talleres y flotas del suroeste de Florida y el corredor I-75.
Arquitectura de casa con marcas respaldadas: la operación de servicio al usuario final
(Xpress Tire Center) conserva su marca y firma `A TireNexus company`.

> Los campos marcados **VERIFY** deben confirmarse con el dueño antes de imprimir, rotular o publicar:
> razón social, EIN, dirección de bodega, teléfono mayorista, dominio, año de fundación,
> catálogo real de marcas, umbrales de KPI y equivalencias Pantone/RAL/vinilo.

---

## 1. Plataforma

| Elemento | Texto oficial |
|---|---|
| Propósito | Que ninguna llanta faltante detenga a un negocio que depende de ruedas. |
| Posicionamiento | El distribuidor mayorista de llantas del corredor I-75: inventario comercial profundo, entrega el mismo día en el suroeste de Florida y un portal donde el dealer ve stock y precio neto sin llamar. |
| Tagline EN | Keep the fleet rolling. |
| Tagline ES | Que la flota nunca pare. |
| Descriptor | Wholesale Tire Distributor |

Pilares: disponibilidad probada · entrega con reloj · precio neto sin teatro · bilingüe de verdad ·
una persona contesta.

Nomenclatura: una sola grafía `TireNexus`. Programas se nombran `Nexus + sustantivo`
(Nexus Fleet, Nexus Dealer, Nexus Ready) y **no** llevan logotipo propio.

## 2. Logotipo

| Versión | Archivo | Uso |
|---|---|---|
| Lockup horizontal | `logo/lockup-horizontal.svg` | Primaria |
| Reverso | `logo/lockup-horizontal-reverse.svg` | Sobre carbón |
| Apilado | `logo/lockup-stacked.svg` | Formatos cuadrados |
| Monocromo | `logo/lockup-mono-black.svg` | Grabado, bordado 1 hilo |
| Nexus Spark | `logo/nexus-spark.svg` | Acento, casco, solapa |
| Monograma TN | `logo/monogram-tn.svg` | App, favicon, puerta trasera |
| Original raster | `logo/tirenexus-master-original.png` | Referencia maestra |

- Área de protección: **X = altura de la N de NEXUS**, en los cuatro lados.
- Mínimos: 120 px / 32 mm (lockup) · 72 px / 20 mm (wordmark sin descriptor) · 24 px (monograma) · 45 mm (bordado).
- Prohibido: rotar, condensar, recolorear, sombrear, recomponer con otra tipografía,
  naranja sobre naranja, agregar palabras al bloque, colocar sobre textura.
- Co-branding con fabricante: TireNexus a la izquierda, regla de 1 px, separación de 1X.
  Nunca dentro del lockup del fabricante.

## 3. Color

| Nombre | HEX | Equivalencias | Uso |
|---|---|---|---|
| Nexus Orange | `#E8431A` | PANTONE 1665 C · RAL 2002 · 3M 3630-74 | Acento único, CTA, mitad del logotipo |
| Carbon | `#0A0A0A` | PANTONE Black 6 C · RAL 9005 · 3M 3630-22 | Fondo dominante, flota |
| White | `#FFFFFF` | — | Reverso |
| Orange 700 | `#B8320F` | — | Texto naranja sobre blanco (AA), hover |
| Orange 300 | `#F79470` | — | Solo gráfica de datos |
| Orange 050 | `#FDEDE7` | — | Fondo de aviso |
| Asphalt 800 | `#221F1C` | — | Superficie oscura secundaria |
| Steel 600 | `#57534E` | — | Texto secundario |
| Steel 200 | `#D7D3CD` | — | Reglas |
| Paper | `#F1EEEA` | — | Fondo neutro |
| In stock | `#1F7A45` | — | Disponible hoy |
| Bajo | `#B7791F` | — | Menos de una entrega de cobertura |
| Backorder | `#C0341B` | — | Con fecha comprometida obligatoria |
| Info | `#245C9E` | — | Avisos del sistema |

Proporción 60 carbón/paper · 30 neutros · 10 naranja. Máximo 15% de naranja por pieza.
Texto corrido naranja **solo** en Orange 700 (5.6:1). Blanco sobre naranja: solo ≥24 px o UI.
Los tres colores de inventario nunca se usan como decoración.

## 4. Tipografía

- **Display:** Saira 900 itálica, tracking −0.03em. Titulares, cifras, rotulación de flota. Nunca <20 px.
- **Texto:** IBM Plex Sans 400/500/600/700. Todo el texto corrido, UI, factura y correo.
- **Dato:** IBM Plex Mono. SKU, medidas, LI/SS, PO, tracking. Siempre `tabular-nums` en columnas de precio.
- Sustituto de sistema (Office/correo): Arial / Arial Black itálica. Nunca Impact.
- Licencia: SIL OFL 1.1 en ambas familias — web, desktop, app y bordado sin costo.

**Regla de categoría:** la itálica pesada señala producto de consumo; los mayoristas serios
comunican en grotesca recta. TireNexus se queda con la itálica solo en logotipo y titulares,
y baja a vertical en todo lo que se firma, se cobra o se opera.

## 5. Recursos gráficos

Tres elementos, ni uno más: **Nexus Spark** (acento), **Tread Rail** (banda de rodadura),
**Shear Cut** (corte diagonal). Toda diagonal del sistema usa **−11°**, el ángulo de la itálica.
Iconos: retícula 24 px, trazo 2 px, sin relleno. Movimiento: entrada 240 ms
`cubic-bezier(.2,.7,.2,1)`, salida 160 ms, gesto único *shear wipe*, `prefers-reduced-motion` siempre.

## 6. Fotografía

Documental de operación: muelle, pasillo de inventario, van rotulada en ruta real, manos con guante,
retrato del ejecutivo, taller del dealer. Luz real, gradación neutra a cálida, negros abiertos.
No fotografiar: desorden, piso sucio, unidades sin rotular, personal sin EPP. Nada de banco de imágenes.
IA solo para fondos, patrones y diagramas — nunca instalaciones, personal, flota, producto o cifras.

## 7. Voz

Concreto · corto · responsable · de oficio. Cifras y fechas, nunca "a la brevedad".
Se dice: dealer, precio neto, fill rate, ventana de entrega, backorder, casco, índice de carga.
No se dice: solución integral, sinergia, líderes del mercado, sujeto a disponibilidad sin fecha.
Español de Florida (llanta, rin), no traducción de manual. Toda pieza sale bilingüe o no sale.

Jerarquía fija de titulares de venta: **disponibilidad → tiempo de entrega → precio/términos → marca del fabricante**.

## 8. Aplicaciones cubiertas en `brandbook.html`

Papelería (tarjeta, membrete, sobre, folder, firma) · factura, packing slip, cotización, line card,
solicitud de cuenta · flota (box truck, sprinter, pickup, montacargas) · uniforme y EPP ·
señalética de bodega y etiquetado de racks · hang tag, cinta y banda de palet, etiqueta de retorno ·
sitio y portal de dealer · correo transaccional y kit de redes · stand de feria y plantilla de presentación.

Reglas duras: camión negro integral (nunca blanco con calcomanía); hi-vis en amarillo ANSI, el naranja
de marca no sustituye color normado; ninguna marca de TireNexus sobre el flanco, la etiqueta DOT
o la marca del fabricante de la llanta.

## 9. Estrategia 360 — SEO · AEO · GEO · LLM · IA

**SEO.** Una URL por intención (marca × aplicación × zona). Facetas del catálogo bajo canónicas y
`noindex` — es el error #1 de los distribuidores. Ficha con número de parte, cross-reference OEM,
medida, LI/SS, ply rating y ficha descargable. Localizador de DC/dealers con URL estática por
ubicación, NAP consistente y GBP propio.

**Schema (JSON-LD).** `Organization` con `sameAs` (LinkedIn, Wikidata, Crunchbase, D&B, asociaciones);
`Product` + `Offer` con **`gtin`, `mpn`, `sku`, `brand`, `price`, `availability`** usando los valores
exactos de `ItemAvailability` (`InStock`, `OutOfStock`, `BackOrder`, `PreOrder`, `Discontinued`);
`AutoPartsStore` por DC con `openingHoursSpecification`, `areaServed` y `geo`;
`FAQPage`, `HowTo`, `BreadcrumbList`, `WebSite`+`SearchAction`.
Sin identificador de producto no hay comparación cruzada ni elegibilidad de listado de comercio.

**AEO.** Frase definitoria extraíble en la apertura de cada página; una entidad canónica por página;
bloque de respuesta de 40–60 palabras antes del desarrollo; tablas comparables (mínimos, términos de
crédito, ventanas por zona); FAQ literal del mostrador.

**GEO.** La palanca real es la **consistencia de entidad** entre sitio, LinkedIn, Wikidata, Crunchbase,
D&B, GBP, directorios y notas de prensa: las contradicciones son la causa #1 de que un modelo no te nombre.
Formato de mayor rendimiento: contenido comparativo ("X vs ATD vs TireHub", "cómo abrir cuenta mayorista").
Fuentes que los modelos citan en la categoría: Modern Tire Dealer (MTD 100 / Top 25 Commercial),
Tire Review, Tire Business, aftermarketNews y Wikipedia. `llms.txt` se implementa porque es barato,
no porque mueva la aguja — el schema es lo que los motores consumen.

**LLM.** Tablero mensual de share of voice: set fijo de 50 prompts de comprador ejecutado contra
ChatGPT, Claude, Perplexity y AI Overviews, registrando mención, posición, sentimiento y fuentes citadas.

**IA en operación.** Sí: traducción EN⇄ES con revisión, enriquecimiento de catálogo, borradores de
respuesta, resumen de llamadas a CRM, detección de rotura de stock. No: cifras generadas, imágenes de
instalaciones/personal/flota/producto, testimonios sintéticos, respuestas automáticas en garantía o
cobranza, publicación autónoma. Todo activo asistido por IA se marca `ai-generated: true` en el DAM
con el nombre de quien lo aprobó.

## 10. Gobernanza y lanzamiento

Custodio de marca decide cambios y excepciones; el proveedor externo ejecuta contra especificación.
Nomenclatura de archivo: `tirenexus_[pieza]_[variante]_[idioma]_[version].[ext]`.
SVG para vector, PNG solo donde no se acepta vector, nunca JPG de logotipo.
Auditoría trimestral de flota, uniforme, señalética, portal, correo y redes.

Roadmap 90 días: (1–15) archivos, tokens y plantillas + resolver VERIFY · (15–30) flota, uniforme y
señalética · (30–60) sitio con schema, GBP por DC, llms.txt y línea base de LLM · (45–75) portal con
tokens, stock por DC y bilingüe · (60–90) contenido comparativo, rankings de industria y kit de co-branding.

KPI de marca (metas de arranque, VERIFY contra histórico): fill rate ≥96% · cumplimiento de ventana ≥95% ·
alta de cuenta <24 h · pedidos en portal sin llamada ≥40% · menciones en el set de 50 prompts ≥30% ·
conformidad de auditoría 100%.
