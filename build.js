#!/usr/bin/env node
// Generador estático sin dependencias. `node build.js` -> /dist
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { business, brands, proof } from './src/data/business.js';
import { services } from './src/data/services.js';
import { locations } from './src/data/locations.js';
import { faqs, faqTopics } from './src/data/faqs.js';
import { guides } from './src/data/guides.js';
import { ui } from './src/data/ui.js';
import * as S from './src/lib/schema.js';
import { layout, breadcrumbHtml, esc, icon, path as route, D } from './src/templates/layout.js';
import * as C from './src/templates/components.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'dist');
const LANGS = ['en', 'es'];
const pages = []; // {url, changefreq, priority, lastmod}

function write(url, html, meta = {}) {
  const rel = url === '/' ? 'index.html' : path.join(url.replace(/^\/|\/$/g, ''), 'index.html');
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (!meta.noindex) pages.push({ url, ...meta });
}

// Recorta títulos largos en el separador para no pasar el ancho del SERP.
function clamp(t, max) {
  if (t.length <= max) return t;
  const parts = t.split(' | ');
  if (parts.length > 1) {
    const short = `${parts[0]} | Xpress Tire`;
    if (short.length <= max) return short;
    return parts[0].length <= max ? parts[0] : parts[0].slice(0, max - 1).trimEnd() + '…';
  }
  return t.slice(0, max - 1).trimEnd() + '…';
}

const svcSlug = (sv, lang) => (lang === 'es' ? sv.esSlug : sv.slug);
const areaNames = locations.map(l => `${l.city}, Florida`);
const allAreaNames = [...areaNames, 'Lee County, Florida', 'Collier County, Florida', 'Charlotte County, Florida', 'Hendry County, Florida'];

// ---------- HOME ----------
function home(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang, 'home'), altUrl = route(es ? 'en' : 'es', 'home');
  const title = es
    ? 'Llantas de Semi Truck y Servicio 24/7 | Xpress Tire Center'
    : 'Semi Truck Tires & 24/7 Road Service | Xpress Tire Center';
  const description = es
    ? 'Llantas comerciales, servicio móvil y emergencia 24/7 en la I-75, Fort Myers, Naples, Lehigh Acres e Immokalee. Nuevas, recauchadas y usadas. Financiamiento. (239) 314-8100.'
    : 'Commercial truck tires, mobile service and 24/7 emergency road service on I-75, Fort Myers, Naples, Lehigh Acres and Immokalee. New, retread and used. Financing. (239) 314-8100.';
  const homeFaqs = faqs.filter(f => ['emergency','pricing','service'].includes(f.topic)).slice(0, 6).map(f => f[lang]);

  const hero = `<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">${icon('siren')}${es ? 'Despacho 24/7 · I-75 · Suroeste de Florida' : '24/7 Dispatch · I-75 · Southwest Florida'}</p>
      <h1>${es ? 'Llantas de semi truck y servicio en carretera que llega' : 'Semi truck tires and road service that actually shows up'}</h1>
      <p class="lede">${es
        ? 'Desde Punta Gorda hasta Alligator Alley. Nuevas, recauchadas y usadas. Montamos en tu patio, en la obra o en el acotamiento de la I-75, a la hora que sea.'
        : 'From Punta Gorda to Alligator Alley. New, retread and used. We mount in your yard, on your jobsite, or on the shoulder of I-75 — whatever hour it is.'}</p>
      <div class="hero-cta">
        <a class="btn btn-emergency btn-lg" href="tel:${business.phone}" data-cta="hero-call">${icon('phone')}<span>${business.phoneDisplay}</span></a>
        <a class="btn btn-outline btn-lg" href="${route(lang,'quote')}" data-cta="hero-quote">${t.cta.quoteLong}</a>
      </div>
      <ul class="hero-ticks">
        <li>${icon('check')}${es ? 'Contesta una persona, 24 horas' : 'A human answers, 24 hours'}</li>
        <li>${icon('check')}${es ? 'Llegada típica 45–90 min' : 'Typical arrival 45–90 min'}</li>
        <li>${icon('check')}${es ? 'English & Español' : 'English & Español'}</li>
      </ul>
    </div>
    <div class="hero-card">
      <h2>${es ? '¿Llanta abajo ahora?' : 'Tire down now?'}</h2>
      <p>${es ? 'Ten listo esto y ahorras 20 minutos:' : 'Have these ready and save 20 minutes:'}</p>
      <ol class="hero-list">
        <li>${es ? 'Marcador de milla y dirección' : 'Mile marker and direction'}</li>
        <li>${es ? 'Medida (ej. 11R22.5)' : 'Tire size (e.g. 11R22.5)'}</li>
        <li>${es ? 'Posición: dirección, tracción o remolque' : 'Position: steer, drive or trailer'}</li>
        <li>${es ? '¿Traes refacción?' : 'Do you have a spare?'}</li>
        <li>${es ? 'Número de unidad y forma de pago' : 'Unit number and payment method'}</li>
      </ol>
      <a class="btn btn-emergency btn-block" href="tel:${business.phone}" data-cta="hero-card-call">${icon('phone')}<span>${t.cta.callLong}</span></a>
    </div>
  </div>
</section>`;

  const body = `${hero}
${C.trustStrip(lang)}
<section class="sec"><div class="wrap">
  <div class="sec-head">
    <h2>${es ? 'Lo que hacemos' : 'What we do'}</h2>
    <p class="muted">${es ? 'Siete servicios, un solo número.' : 'Seven services, one number.'}</p>
  </div>
  ${C.serviceCards(lang, services)}
</div></section>
<section class="sec sec-alt"><div class="wrap two-col">
  <div>
    <h2>${es ? 'Por qué las flotas del suroeste de Florida nos llaman' : 'Why Southwest Florida fleets call us'}</h2>
    <p>${es
      ? 'Lee, Collier y Charlotte reciben alrededor de 100 residentes nuevos por día y la I-75 se va a ampliar en un tramo de 21 millas entre Golden Gate Parkway y Alico Road. Eso significa más camiones, más obra y más presión sobre cada llanta que rueda por esta región.'
      : 'Lee, Collier and Charlotte counties take in roughly 100 new residents a day, and FDOT is widening a 21-mile stretch of I-75 between Golden Gate Parkway and Alico Road. That means more trucks, more construction and more load on every tire that rolls through this region.'}</p>
    <p>${es
      ? 'La mayoría de las flotas de por aquí compra llantas de forma reactiva: revienta una, alguien llama al primer número que encuentra, y se paga tarifa de emergencia. Nosotros trabajamos al revés: inspección programada, presión medida, cascos administrados y una fila prioritaria cuando de todas formas algo falla.'
      : 'Most fleets here buy tires reactively: one fails, somebody calls the first number they find, and everybody pays emergency rates. We work the other way around — scheduled inspection, measured pressure, managed casings, and a priority queue for when something fails anyway.'}</p>
    <p><a class="btn btn-primary" href="${route(lang,'fleet')}" data-cta="home-fleet">${t.cta.fleet}</a></p>
  </div>
  <div>
    <h2>${es ? 'Dónde rodamos' : 'Where we roll'}</h2>
    <p>${es
      ? 'Base en Lehigh Acres, radio de servicio de unas 75 millas: Fort Myers, Cape Coral, Naples, Bonita, Estero, Immokalee, Punta Gorda y el corredor completo de la I-75 desde la milla 161 hasta la 80.'
      : 'Based in Lehigh Acres with a service radius of roughly 75 miles: Fort Myers, Cape Coral, Naples, Bonita, Estero, Immokalee, Punta Gorda and the full I-75 corridor from mile marker 161 down to 80.'}</p>
    ${C.locationCards(lang, locations.slice(0,4))}
    <p><a class="link-more" href="${route(lang,'areas')}">${t.cta.all} →</a></p>
  </div>
</div></section>
${C.statBar(lang)}
${C.brandWall(lang)}
${C.faqBlock(lang, homeFaqs)}
<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${es ? 'Guías para operadores y flotas' : 'Guides for drivers and fleets'}</h2></div>
  <div class="cards">${guides.map(g=>`<article class="card"><a class="card-link" href="${route(lang,'guide',g.slug)}">
    <h3>${esc(g[lang].title)}</h3><p>${esc(g[lang].description)}</p>
    <span class="card-more">${t.cta.readMore} ${icon('arrow')}</span></a></article>`).join('')}</div>
</div></section>
${C.ctaBand(lang)}`;

  const jsonld = S.graph([
    S.organizationNode(), S.websiteNode(lang),
    S.webPageNode({ title, description, url, lang, primaryEntityId: S.ids.local }),
    S.faqNode(homeFaqs),
  ]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body, bodyClass: 'page-home' }), { priority: '1.0', changefreq: 'weekly' });
}

// ---------- SERVICE HUB + PAGES ----------
function serviceHub(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'services'), altUrl = route(es?'en':'es','services');
  const title = es ? 'Servicios de Llantas para Camión | Xpress Tire Center'
                   : 'Truck Tire Services in SW Florida | Xpress Tire Center';
  const description = es
    ? 'Emergencia 24/7, llantas comerciales, programa de flotas, servicio móvil, reparación y recauchado, alineación y financiamiento en Lehigh Acres, Fort Myers y Naples.'
    : 'Emergency 24/7 road service, commercial truck tires, fleet program, mobile service, repair and retreads, alignment and financing in Lehigh Acres, Fort Myers and Naples.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.services, url}];
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap narrow">
  <h1>${es ? 'Servicios de llantas para camión en el suroeste de Florida' : 'Truck tire services in Southwest Florida'}</h1>
  ${C.answerBox(lang, es
    ? 'Xpress Tire Center ofrece siete servicios para transporte comercial en el suroeste de Florida: emergencia en carretera 24/7, venta de llantas comerciales, programa de flotas, servicio móvil y entrega, reparación y recauchado, alineación y mantenimiento, y financiamiento. Base en Lehigh Acres, FL, con radio de 75 millas. (239) 314-8100.'
    : 'Xpress Tire Center provides seven commercial trucking services across Southwest Florida: 24/7 emergency road service, commercial tire sales, a fleet tire program, mobile service and delivery, repair and retreads, alignment and preventive maintenance, and tire financing. Based in Lehigh Acres, FL with a 75-mile radius. Call (239) 314-8100.')}
</div></section>
<section class="sec"><div class="wrap">${C.serviceCards(lang, services)}</div></section>
${C.ctaBand(lang)}`;
  const jsonld = S.graph([
    S.organizationNode(), S.websiteNode(lang),
    S.webPageNode({ title, description, url, lang }),
    S.breadcrumbNode(trail),
    { '@type':'ItemList', itemListElement: services.map((sv,i)=>({ '@type':'ListItem', position:i+1,
        name: sv[lang].name, url: `${D}${route(lang,'service',svcSlug(sv,lang))}` })) },
  ]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.8', changefreq:'monthly' });
}

function servicePage(sv, lang) {
  const t = ui[lang], es = lang === 'es', c = sv[lang];
  const url = route(lang,'service',svcSlug(sv,lang));
  const altUrl = route(es?'en':'es','service', es ? sv.slug : sv.esSlug);
  const title = clamp(`${c.name} | Xpress Tire Center`, 66);
  const description = c.answer.slice(0, 158);
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.services, url: route(lang,'services')}, {name: c.name, url}];
  const related = services.filter(s => s.slug !== sv.slug).slice(0, 3);
  const pageFaqs = faqs.filter(f => f.topic === (sv.slug.includes('emergency') ? 'emergency' : sv.slug.includes('financing') ? 'pricing' : 'service')).map(f => f[lang]).slice(0,4);

  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top page-head"><div class="wrap narrow">
  <p class="eyebrow">${icon(sv.icon)}${esc(t.nav.services)}</p>
  <h1>${esc(c.h1)}</h1>
  <p class="lede">${esc(c.short)}</p>
  <div class="hero-cta">
    <a class="btn btn-emergency btn-lg" href="tel:${business.phone}" data-cta="svc-call">${icon('phone')}<span>${business.phoneDisplay}</span></a>
    <a class="btn btn-outline btn-lg" href="${route(lang,'quote')}" data-cta="svc-quote">${t.cta.quoteLong}</a>
  </div>
  ${C.answerBox(lang, c.answer)}
</div></section>
<section class="sec"><div class="wrap narrow prose">
  <h2>${es ? 'Qué incluye' : 'What is included'}</h2>
  <ul class="check-list">${c.bullets.map(b=>`<li>${icon('check')}<span>${esc(b)}</span></li>`).join('')}</ul>
  <h2>${es ? 'Dónde damos este servicio' : 'Where we provide this service'}</h2>
  <p>${es
    ? `Damos ${c.name.toLowerCase()} en Lehigh Acres, Fort Myers, Cape Coral, Naples, Bonita Springs, Estero, Immokalee, Punta Gorda y todo el corredor de la I-75 entre la milla 80 y la 161.`
    : `We provide ${c.name.toLowerCase()} in Lehigh Acres, Fort Myers, Cape Coral, Naples, Bonita Springs, Estero, Immokalee, Punta Gorda and along the entire I-75 corridor between mile markers 80 and 161.`}</p>
  <ul class="pill-list">${locations.map(l=>`<li><a href="${route(lang,'area',l.slug)}">${esc(l.city)}</a></li>`).join('')}</ul>
</div></section>
${pageFaqs.length ? C.faqBlock(lang, pageFaqs) : ''}
<section class="sec sec-alt"><div class="wrap">
  <div class="sec-head"><h2>${t.labels.relatedServices}</h2></div>
  ${C.serviceCards(lang, related)}
</div></section>
${C.ctaBand(lang)}`;

  const nodes = [
    S.organizationNode(), S.websiteNode(lang),
    S.webPageNode({ title, description, url, lang, primaryEntityId: `${D}${url}#service` }),
    S.breadcrumbNode(trail),
    S.serviceNode({ name: c.name, description: c.answer, url, areaNames: allAreaNames, serviceType: sv.en.name }),
  ];
  if (pageFaqs.length) nodes.push(S.faqNode(pageFaqs));
  write(url, layout({ lang, title, description, url, altUrl, jsonld: S.graph(nodes), body }), { priority: sv.priority<=2?'0.9':'0.8', changefreq:'monthly' });
}

// ---------- AREA HUB + PAGES ----------
function areaHub(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'areas'), altUrl = route(es?'en':'es','areas');
  const title = es ? 'Zona de Servicio: Fort Myers, Naples e I-75 | Xpress Tire'
                   : 'Service Area: Fort Myers, Naples & I-75 | Xpress Tire';
  const description = es
    ? 'Cubrimos Lee, Collier, Charlotte y Hendry: Fort Myers, Naples, Cape Coral, Lehigh Acres, Immokalee, Bonita, Estero, Punta Gorda y la I-75 de la milla 80 a la 161.'
    : 'We cover Lee, Collier, Charlotte and Hendry counties: Fort Myers, Naples, Cape Coral, Lehigh Acres, Immokalee, Bonita, Estero, Punta Gorda and I-75 from mile marker 80 to 161.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.areas, url}];
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap narrow">
  <h1>${es ? 'Zona de servicio en el suroeste de Florida' : 'Southwest Florida service area'}</h1>
  ${C.answerBox(lang, es
    ? 'Xpress Tire Center atiende un radio de unas 75 millas desde Lehigh Acres, FL: los condados Lee, Collier, Charlotte y Hendry, incluyendo Fort Myers, Naples, Cape Coral, Bonita Springs, Estero, Immokalee y Punta Gorda, más la I-75 desde la milla 161 hasta la 80 en Alligator Alley.'
    : 'Xpress Tire Center serves a roughly 75-mile radius from Lehigh Acres, FL: Lee, Collier, Charlotte and Hendry counties, including Fort Myers, Naples, Cape Coral, Bonita Springs, Estero, Immokalee and Punta Gorda, plus I-75 from mile marker 161 down to mile marker 80 on Alligator Alley.')}
</div></section>
<section class="sec"><div class="wrap">${C.locationCards(lang, locations)}</div></section>
${C.ctaBand(lang)}`;
  const jsonld = S.graph([
    S.organizationNode(), S.websiteNode(lang), S.webPageNode({title,description,url,lang}), S.breadcrumbNode(trail),
    { '@type':'ItemList', itemListElement: locations.map((l,i)=>({'@type':'ListItem',position:i+1,name:l.city,url:`${D}${route(lang,'area',l.slug)}`})) },
  ]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.8', changefreq:'monthly' });
}

function areaPage(loc, lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'area',loc.slug), altUrl = route(es?'en':'es','area',loc.slug);
  const title = clamp(es
    ? `Llantas de Semi Truck 24/7 en ${loc.city}, FL | Xpress Tire`
    : `Semi Truck Tires & 24/7 Service in ${loc.city}, FL | Xpress Tire`, 68);
  const answer = es
    ? `Xpress Tire Center da servicio de llantas para semi trucks en ${loc.city}, ${loc.county}, con emergencia en carretera 24/7, servicio móvil en patio y venta de llantas nuevas, recauchadas y usadas. Respuesta típica de ${loc.responseWindow} desde nuestra base en Lehigh Acres. Llama al ${business.phoneDisplay}.`
    : `Xpress Tire Center provides semi truck tire service in ${loc.city}, ${loc.county}, including 24/7 emergency road service, mobile yard service, and new, retread and used tire sales. Typical response is ${loc.responseWindow} from our Lehigh Acres base. Call ${business.phoneDisplay}.`;
  const description = answer.slice(0, 158);
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.areas, url: route(lang,'areas')}, {name: loc.city, url}];
  const localFaqs = faqs.filter(f=>['emergency','service'].includes(f.topic)).slice(0,4).map(f=>f[lang]);

  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top page-head"><div class="wrap narrow">
  <p class="eyebrow">${icon('pin')}${esc(loc.county)}</p>
  <h1>${es ? `Llantas de semi truck y servicio en carretera en ${loc.city}, Florida` : `Semi truck tires and road service in ${loc.city}, Florida`}</h1>
  <div class="hero-cta">
    <a class="btn btn-emergency btn-lg" href="tel:${business.phone}" data-cta="area-call">${icon('phone')}<span>${business.phoneDisplay}</span></a>
    <a class="btn btn-outline btn-lg" href="${route(lang,'quote')}" data-cta="area-quote">${t.cta.quoteLong}</a>
  </div>
  ${C.answerBox(lang, answer)}
</div></section>
<section class="sec"><div class="wrap narrow prose">
  <h2>${es ? `Cómo se mueve la carga en ${loc.city}` : `How freight moves in ${loc.city}`}</h2>
  <p>${esc(loc.hook[lang])}</p>
  <div class="fact-grid">
    <div class="fact"><span>${t.labels.response}</span><strong>${esc(loc.responseWindow)}</strong></div>
    <div class="fact"><span>${es?'Distancia desde el taller':'Distance from the shop'}</span><strong>${loc.driveMinutes === 0 ? (es?'Aquí mismo':'You are here') : `~${loc.driveMinutes} min`}</strong></div>
    <div class="fact"><span>${es?'Condado':'County'}</span><strong>${esc(loc.county)}</strong></div>
  </div>
  <h2>${t.labels.corridors}</h2>
  <ul class="pill-list plain">${loc.corridors.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
  <h2>${t.labels.fleetsServed}</h2>
  <ul class="check-list">${loc.fleets.map(f=>`<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
  ${loc.zips.length ? `<h2>${t.labels.zips}</h2><p class="muted small">${loc.zips.join(' · ')}</p>` : ''}
  <h2>${es ? `Servicios disponibles en ${loc.city}` : `Services available in ${loc.city}`}</h2>
</div></section>
<section class="sec sec-alt"><div class="wrap">${C.serviceCards(lang, services.slice(0,6))}</div></section>
${C.faqBlock(lang, localFaqs)}
${C.ctaBand(lang, {
  title: es ? `¿Necesitas una llanta en ${loc.city}?` : `Need a tire in ${loc.city}?`,
  sub: es ? `Respuesta típica ${loc.responseWindow}. Ten lista tu ubicación y medida.` : `Typical response ${loc.responseWindow}. Have your location and tire size ready.`,
})}`;

  const jsonld = S.graph([
    S.organizationNode(), S.websiteNode(lang), S.webPageNode({title,description,url,lang}), S.breadcrumbNode(trail),
    S.serviceNode({ name: `Semi Truck Tire Service in ${loc.city}, FL`, description: answer, url,
      areaNames: [`${loc.city}, Florida`, `${loc.county}, Florida`], serviceType: 'Commercial Truck Tire Service' }),
    S.faqNode(localFaqs),
  ]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.8', changefreq:'monthly' });
}

// ---------- LEARN HUB + GUIDES ----------
function learnHub(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'learn'), altUrl = route(es?'en':'es','learn');
  const title = es ? 'Guías de Llantas para Camión | Xpress Tire Center' : 'Truck Tire Guides & Resources | Xpress Tire Center';
  const description = es ? 'Guías prácticas para operadores y flotas del suroeste de Florida: emergencias en la I-75, costo por milla, medidas de llanta y normas DOT.'
                          : 'Practical guides for Southwest Florida drivers and fleets: I-75 emergencies, cost per mile, tire sizing and DOT rules.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.learn, url}];
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap narrow">
  <h1>${es ? 'Guías de llantas para camión' : 'Truck tire guides'}</h1>
  <p class="lede">${es ? 'Escrito para el operador que está parado en el acotamiento y para el dueño de flota que revisa números el domingo.' : 'Written for the driver standing on the shoulder and the fleet owner running numbers on a Sunday.'}</p>
</div></section>
<section class="sec"><div class="wrap"><div class="cards">${guides.map(g=>`
  <article class="card"><a class="card-link" href="${route(lang,'guide',g.slug)}">
    <h3>${esc(g[lang].title)}</h3><p>${esc(g[lang].description)}</p>
    <span class="card-more">${t.cta.readMore} ${icon('arrow')}</span></a></article>`).join('')}</div></div></section>
<section class="sec sec-alt"><div class="wrap narrow">
  <h2>${t.labels.faq}</h2>
  <p><a class="link-more" href="${route(lang,'faq')}">${es?'Ver las 14 preguntas frecuentes':'See all 14 frequently asked questions'} →</a></p>
</div></section>
${C.ctaBand(lang)}`;
  const jsonld = S.graph([S.organizationNode(), S.websiteNode(lang), S.webPageNode({title,description,url,lang}), S.breadcrumbNode(trail),
    { '@type':'ItemList', itemListElement: guides.map((g,i)=>({'@type':'ListItem',position:i+1,name:g[lang].title,url:`${D}${route(lang,'guide',g.slug)}`})) }]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.6', changefreq:'monthly' });
}

function guidePage(g, lang) {
  const t = ui[lang], es = lang === 'es', c = g[lang];
  const url = route(lang,'guide',g.slug), altUrl = route(es?'en':'es','guide',g.slug);
  const title = clamp(`${c.title} | Xpress Tire Center`, 68);
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.learn, url: route(lang,'learn')}, {name: c.title, url}];
  const body = `${breadcrumbHtml(lang, trail)}
<article class="sec sec-top"><div class="wrap narrow prose">
  <p class="eyebrow">${t.nav.learn}</p>
  <h1>${esc(c.title)}</h1>
  <p class="byline muted small">${t.labels.published} ${g.date} · ${t.labels.updated} ${g.updated} · ${esc(business.name)}</p>
  ${C.answerBox(lang, c.answer)}
  ${C.renderBlocks(c.blocks)}
  <hr>
  <p class="muted small">${es
    ? 'Esta guía la escribe el equipo de Xpress Tire Center en Lehigh Acres, FL, con base en llamadas reales de servicio en la I-75 y en los patios de Lee y Collier.'
    : 'This guide is written by the Xpress Tire Center team in Lehigh Acres, FL, based on real service calls on I-75 and in Lee and Collier county yards.'}</p>
</div></article>
${C.ctaBand(lang)}`;
  const jsonld = S.graph([
    S.organizationNode(), S.websiteNode(lang),
    S.webPageNode({ title, description: c.description, url, lang, primaryEntityId: `${D}${url}#article` }),
    S.breadcrumbNode(trail),
    S.articleNode({ title: c.title, description: c.description, url, datePublished: g.date, dateModified: g.updated, lang }),
  ]);
  write(url, layout({ lang, title, description: c.description, url, altUrl, jsonld, body }), { priority:'0.7', changefreq:'monthly', lastmod: g.updated });
}

// ---------- FAQ ----------
function faqPage(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'faq'), altUrl = route(es?'en':'es','faq');
  const title = es ? 'Preguntas Frecuentes de Llantas | Xpress Tire Center'
                   : 'Truck Tire FAQ — SW Florida | Xpress Tire Center';
  const description = es ? 'Respuestas directas sobre servicio 24/7 en la I-75, precios, financiamiento, dibujo legal mínimo, recauchadas y cobertura en Lee y Collier.'
                          : 'Direct answers on 24/7 I-75 service, pricing, financing, legal minimum tread depth, retreads and coverage across Lee and Collier counties.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.labels.faq, url}];
  const groups = Object.keys(faqTopics).map(k => ({ key:k, label: faqTopics[k][lang], items: faqs.filter(f=>f.topic===k).map(f=>f[lang]) })).filter(g=>g.items.length);
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap narrow">
  <h1>${es ? 'Preguntas frecuentes' : 'Frequently asked questions'}</h1>
  <p class="lede">${es ? 'Respuestas cortas y directas. Si tu pregunta no está, llama — contestamos igual de directo.' : 'Short, direct answers. If yours is not here, call — we answer just as directly.'}</p>
</div></section>
${groups.map(g=>`<section class="sec"><div class="wrap narrow">
  <h2 id="${g.key}">${esc(g.label)}</h2>
  <div class="faq-list">${g.items.map(f=>`<details class="faq-item"><summary><span>${esc(f.q)}</span></summary><div class="faq-a"><p>${esc(f.a)}</p></div></details>`).join('')}</div>
</div></section>`).join('')}
${C.ctaBand(lang)}`;
  const jsonld = S.graph([S.organizationNode(), S.websiteNode(lang), S.webPageNode({title,description,url,lang}), S.breadcrumbNode(trail), S.faqNode(faqs.map(f=>f[lang]))]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.8', changefreq:'monthly' });
}

// ---------- ABOUT / CONTACT / QUOTE / BRANDS / THANKS ----------
function aboutPage(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'about'), altUrl = route(es?'en':'es','about');
  const title = es ? 'Sobre Xpress Tire Center | Lehigh Acres, FL'
                   : 'About Xpress Tire Center | Lehigh Acres, FL';
  const description = es ? 'Xpress Tire Center es una llantera de camiones en Lehigh Acres, FL que atiende flotas y owner-operators en Lee, Collier, Charlotte y Hendry desde 2014.'
                          : 'Xpress Tire Center is a commercial truck tire shop in Lehigh Acres, FL serving fleets and owner-operators across Lee, Collier, Charlotte and Hendry counties since 2014.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.about, url}];
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap narrow prose">
  <h1>${es ? 'Sobre Xpress Tire Center' : 'About Xpress Tire Center'}</h1>
  ${C.answerBox(lang, es
    ? 'Xpress Tire Center es una llantera comercial independiente en 5530 4th St W, Lehigh Acres, FL 33971, que vende llantas para semi trucks y da servicio de emergencia 24/7 en el suroeste de Florida. Atiende en inglés y español a flotas, owner-operators, constructoras y transportistas agrícolas en Lee, Collier, Charlotte y Hendry.'
    : 'Xpress Tire Center is an independent commercial tire shop at 5530 4th St W, Lehigh Acres, FL 33971, selling semi truck tires and running 24/7 emergency road service across Southwest Florida. It serves fleets, owner-operators, construction companies and agricultural haulers in Lee, Collier, Charlotte and Hendry counties, in English and Spanish.')}
  <h2>${es ? 'Cómo trabajamos' : 'How we work'}</h2>
  <p>${es
    ? 'El transporte en el suroeste de Florida no se parece al del resto del país. El calor cocina los cascos, la temporada de cosecha mueve las trocas de noche, la obra no para y la I-75 tiene un tramo de 21 millas sin salidas donde una llanta abajo se convierte en un problema de tres horas. Trabajamos alrededor de esa realidad, no alrededor de un manual nacional.'
    : 'Trucking in Southwest Florida does not look like trucking anywhere else. Heat cooks casings, harvest season moves trucks at night, construction never stops, and I-75 has a 21-mile stretch with no exits where a tire down becomes a three-hour problem. We work around that reality, not around a national playbook.'}</p>
  <h2>${es ? 'Lo que prometemos' : 'What we promise'}</h2>
  <ul class="check-list">
    ${(es ? [
      'Contesta una persona, no un menú de opciones.',
      'Te decimos el precio antes de subir la llanta, montada y balanceada.',
      'No parchamos un casco inseguro aunque nos lo pidas.',
      'Si la usada no aguanta tu ruta, te lo decimos aunque la venta sea menor.',
      'Se te atiende en el idioma en que piensas.',
    ] : [
      'A human answers, not a phone tree.',
      'You get the price before the tire goes on — mounted and balanced.',
      'We will not patch an unsafe casing, even if you ask.',
      'If a used tire will not survive your route, we say so even when it costs us the sale.',
      'You get served in the language you think in.',
    ]).map(x=>`<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}
  </ul>
  <h2>${es ? 'Datos del negocio' : 'Business details'}</h2>
  <div class="fact-grid">
    <div class="fact"><span>${t.labels.address}</span><strong>${esc(business.address.street)}, ${esc(business.address.locality)}, ${business.address.region} ${business.address.postalCode}</strong></div>
    <div class="fact"><span>${t.labels.phone}</span><strong><a href="tel:${business.phone}">${business.phoneDisplay}</a></strong></div>
    <div class="fact"><span>${t.labels.roadService}</span><strong>24/7/365</strong></div>
  </div>
</div></section>
${C.statBar(lang)}
${C.ctaBand(lang)}`;
  const jsonld = S.graph([S.organizationNode(), S.websiteNode(lang),
    { ...S.webPageNode({title,description,url,lang}), '@type':'AboutPage' }, S.breadcrumbNode(trail)]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.6', changefreq:'yearly' });
}

function contactPage(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'contact'), altUrl = route(es?'en':'es','contact');
  const title = es ? 'Contacto y Despacho 24/7 | Xpress Tire Center'
                   : 'Contact & 24/7 Dispatch | Xpress Tire Center';
  const description = es ? 'Llama al (239) 314-8100 para despacho 24/7. Taller en 5530 4th St W, Lehigh Acres, FL 33971. Lunes a viernes 8-6, sábado 8-4.'
                          : 'Call (239) 314-8100 for 24/7 dispatch. Shop at 5530 4th St W, Lehigh Acres, FL 33971. Monday–Friday 8–6, Saturday 8–4.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.nav.contact, url}];
  const a = business.address;
  const mapQ = encodeURIComponent(`${business.name}, ${a.street}, ${a.locality}, ${a.region} ${a.postalCode}`);
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap two-col">
  <div class="prose">
    <h1>${es ? 'Contacto y despacho' : 'Contact and dispatch'}</h1>
    ${C.answerBox(lang, es
      ? `Xpress Tire Center está en ${a.street}, ${a.locality}, FL ${a.postalCode}. El teléfono es ${business.phoneDisplay} y el despacho de emergencia opera 24 horas los 365 días. El taller abre lunes a viernes de 8:00 a 18:00 y sábado de 8:00 a 16:00.`
      : `Xpress Tire Center is at ${a.street}, ${a.locality}, FL ${a.postalCode}. The phone is ${business.phoneDisplay} and emergency dispatch runs 24 hours a day, 365 days a year. The shop is open Monday through Friday 8:00 to 18:00 and Saturday 8:00 to 16:00.`)}
    <div class="contact-actions">
      <a class="btn btn-emergency btn-lg" href="tel:${business.phone}" data-cta="contact-call">${icon('phone')}<span>${business.phoneDisplay}</span></a>
      <a class="btn btn-outline btn-lg" href="sms:${business.smsPhone}" data-cta="contact-text">${icon('chat')}<span>${t.cta.text}</span></a>
      <a class="btn btn-ghost btn-lg" href="https://www.google.com/maps/search/?api=1&query=${mapQ}" rel="noopener" data-cta="contact-directions">${icon('pin')}<span>${t.cta.directions}</span></a>
    </div>
    <h2>${t.labels.shopHours}</h2>
    <table class="hours-table"><tbody>${business.hours.map(h=>{
      const days = h.days.length>1 ? `${h.days[0]}–${h.days[h.days.length-1]}` : h.days[0];
      return `<tr><th scope="row">${esc(days)}</th><td>${h.closed ? (es?'Cerrado (despacho 24/7 activo)':'Closed (24/7 dispatch still active)') : `${h.opens} – ${h.closes}`}</td></tr>`;
    }).join('')}</tbody></table>
    <p class="muted small">${es ? 'El despacho de emergencia en carretera nunca cierra, ni domingos ni días festivos.' : 'Emergency road service dispatch never closes, including Sundays and holidays.'}</p>
  </div>
  <div>
    <h2>${esc(ui[lang].form.title)}</h2>
    <p class="muted">${esc(ui[lang].form.sub)}</p>
    ${C.quoteForm(lang)}
  </div>
</div></section>
<section class="sec sec-alt"><div class="wrap">
  <h2>${es ? 'Cómo llegar al taller' : 'Find the shop'}</h2>
  <div class="map-embed">
    <iframe title="${es?'Mapa de Xpress Tire Center':'Map of Xpress Tire Center'}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=${mapQ}&output=embed" width="100%" height="420" style="border:0"></iframe>
  </div>
</div></section>`;
  const jsonld = S.graph([S.organizationNode(), S.websiteNode(lang),
    { ...S.webPageNode({title,description,url,lang}), '@type':'ContactPage' }, S.breadcrumbNode(trail)]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.8', changefreq:'yearly' });
}

function quotePage(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'quote'), altUrl = route(es?'en':'es','quote');
  const title = es ? 'Cotiza Llantas de Camión Gratis | Xpress Tire Center' : 'Get a Free Truck Tire Quote | Xpress Tire Center';
  const description = es ? 'Cotización de llantas comerciales montadas, balanceadas y con desecho incluido. Respuesta el mismo día hábil. Emergencias: llama al (239) 314-8100.'
                          : 'Commercial tire quotes mounted, balanced and with disposal included. Same business-day response. Emergencies: call (239) 314-8100.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.cta.quote, url}];
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap two-col">
  <div class="prose">
    <h1>${es ? 'Cotiza sin compromiso' : 'Get a quote'}</h1>
    <p class="lede">${es ? 'Precio montado, balanceado y con desecho incluido. Sin sorpresas en el mostrador.' : 'Mounted, balanced and disposal-included pricing. No surprises at the counter.'}</p>
    <div class="urgent-note">${icon('siren')}<p><strong>${es?'¿Es emergencia?':'Emergency?'}</strong> ${es?'No llenes el formulario.':'Do not fill out the form.'} <a href="tel:${business.phone}">${business.phoneDisplay}</a></p></div>
    <h2>${es ? 'Qué recibes' : 'What you get back'}</h2>
    <ul class="check-list">${(es ? [
      'Precio por posición, montado y balanceado',
      'Al menos dos opciones: premium y económica o recauchada',
      'Disponibilidad real y tiempo de entrega',
      'Opciones de financiamiento si las necesitas',
    ] : [
      'Per-position pricing, mounted and balanced',
      'At least two options: premium and value or retread',
      'Real availability and lead time',
      'Financing options if you want them',
    ]).map(x=>`<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul>
  </div>
  <div>${C.quoteForm(lang)}</div>
</div></section>`;
  const jsonld = S.graph([S.organizationNode(), S.websiteNode(lang), S.webPageNode({title,description,url,lang}), S.breadcrumbNode(trail)]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.9', changefreq:'yearly' });
}

function brandsPage(lang) {
  const t = ui[lang], es = lang === 'es';
  const url = route(lang,'brands'), altUrl = route(es?'en':'es','brands');
  const title = es ? 'Marcas de Llantas para Camión | Xpress Tire Center'
                   : 'Truck Tire Brands We Carry | Xpress Tire Center';
  const description = es ? 'Michelin, Bridgestone, Goodyear, Continental, Yokohama, Sailun, Double Coin y más, en medidas 22.5 y 24.5 para dirección, tracción y remolque.'
                          : 'Michelin, Bridgestone, Goodyear, Continental, Yokohama, Sailun, Double Coin and more, in 22.5 and 24.5 sizes for steer, drive and trailer.';
  const trail = [{name: es?'Inicio':'Home', url: route(lang,'home')}, {name: t.labels.brands, url}];
  const body = `${breadcrumbHtml(lang, trail)}
<section class="sec sec-top"><div class="wrap narrow prose">
  <h1>${esc(t.labels.brands)}</h1>
  ${C.answerBox(lang, es
    ? 'Xpress Tire Center maneja llantas comerciales Michelin, Bridgestone, Goodyear, Continental, Yokohama, Firestone, Hankook, Toyo, Double Coin, Sailun y Roadmaster en medidas 22.5 y 24.5 para posiciones de dirección, tracción y remolque, además de recauchadas legales DOT y usadas inspeccionadas.'
    : 'Xpress Tire Center carries Michelin, Bridgestone, Goodyear, Continental, Yokohama, Firestone, Hankook, Toyo, Double Coin, Sailun and Roadmaster commercial tires in 22.5 and 24.5 sizes for steer, drive and trailer positions, plus DOT-legal retreads and inspected used tires.')}
  <h2>${es ? 'Cómo elegir entre premium y económica' : 'Choosing between premium and value'}</h2>
  <p>${es
    ? 'La marca correcta depende de tu ciclo de trabajo, no del logo. Una flota de reparto en Cape Coral que hace 60 paradas al día destruye llantas por arrastre y banquetazos: ahí un casco económico reemplazado más seguido gana. Un transportista que corre Immokalee–Miami todos los días recupera el sobreprecio de una premium en diésel y en dos recauchados.'
    : 'The right brand depends on your duty cycle, not the logo. A Cape Coral delivery fleet running 60 stops a day destroys tires through scrub and curbing, so a tougher value casing replaced more often wins. A hauler running Immokalee to Miami daily earns back a premium tire in fuel and in two retread lives.'}</p>
</div></section>
${C.brandWall(lang)}
${C.ctaBand(lang)}`;
  const jsonld = S.graph([S.organizationNode(), S.websiteNode(lang), S.webPageNode({title,description,url,lang}), S.breadcrumbNode(trail)]);
  write(url, layout({ lang, title, description, url, altUrl, jsonld, body }), { priority:'0.6', changefreq:'monthly' });
}

function thanksPage(lang) {
  const es = lang === 'es';
  const url = es ? '/es/gracias/' : '/thanks/';
  const title = es ? 'Recibido | Xpress Tire Center' : 'Request received | Xpress Tire Center';
  const description = es
    ? 'Recibimos tu solicitud y te contactamos el mismo día hábil. Si es urgente, llama al (239) 314-8100.'
    : 'We received your request and will respond the same business day. If it is urgent, call (239) 314-8100.';
  const body = `<section class="sec sec-top"><div class="wrap narrow prose center">
    <h1>${es ? 'Recibido' : 'Got it'}</h1>
    <p class="lede">${es ? 'Te contactamos el mismo día hábil. Si es urgente, no esperes: llama.' : 'We will get back to you the same business day. If it is urgent, do not wait — call.'}</p>
    <p><a class="btn btn-emergency btn-lg" href="tel:${business.phone}">${icon('phone')}<span>${business.phoneDisplay}</span></a></p>
    <p><a class="link-more" href="${route(lang,'home')}">${es?'Volver al inicio':'Back to home'} →</a></p>
  </div></section>`;
  const jsonld = S.graph([S.organizationNode(), S.webPageNode({title,description,url,lang})]);
  write(url, layout({ lang, title, description, url, jsonld, body, noindex: true }), { noindex: true });
}

function notFound() {
  const lang = 'en';
  const body = `<section class="sec sec-top"><div class="wrap narrow prose center">
    <h1>404</h1>
    <p class="lede">That page rolled off. Here is what you probably want:</p>
    <p><a class="btn btn-emergency btn-lg" href="tel:${business.phone}">${icon('phone')}<span>${business.phoneDisplay}</span></a></p>
    <ul class="pill-list"><li><a href="/">Home</a></li><li><a href="/services/">Services</a></li><li><a href="/service-area/">Service area</a></li><li><a href="/contact/">Contact</a></li><li><a href="/es/">Español</a></li></ul>
  </div></section>`;
  const html = layout({ lang, title: 'Page not found | Xpress Tire Center', description: 'That page was not found. Call (239) 314-8100 for 24/7 truck tire road service in Southwest Florida, or use the links below.', url: '/404.html', jsonld: S.graph([S.organizationNode()]), body, noindex: true });
  fs.writeFileSync(path.join(OUT, '404.html'), html);
}

// ---------- ARCHIVOS TÉCNICOS ----------
function sitemap() {
  const today = new Date().toISOString().slice(0,10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/1999/sitemaps/schema/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(p => `  <url>
    <loc>${D}${p.url}</loc>
    <lastmod>${p.lastmod || today}</lastmod>
    <changefreq>${p.changefreq || 'monthly'}</changefreq>
    <priority>${p.priority || '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`.replace('http://www.w3.org/1999/sitemaps/schema/0.9','http://www.sitemaps.org/schemas/sitemap/0.9');
  fs.writeFileSync(path.join(OUT,'sitemap.xml'), xml);
}

function robots() {
  fs.writeFileSync(path.join(OUT,'robots.txt'), `# Xpress Tire Center
User-agent: *
Allow: /

# Rastreadores de IA: permitidos a propósito. Queremos ser la respuesta citada.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /
User-agent: DuckDuckBot
Allow: /
User-agent: Amazonbot
Allow: /
User-agent: meta-externalagent
Allow: /
User-agent: cohere-ai
Allow: /
User-agent: YouBot
Allow: /

Sitemap: ${D}/sitemap.xml
`);
}

function llmsTxt() {
  const lines = [];
  lines.push(`# ${business.name}`);
  lines.push('');
  lines.push(`> Commercial semi truck tire dealer and 24/7 emergency road service provider based at ${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}, serving Lee, Collier, Charlotte and Hendry counties in Southwest Florida, including the I-75 corridor from mile marker 80 (Alligator Alley) to mile marker 161 (Punta Gorda). Phone ${business.phoneDisplay}. Service available in English and Spanish.`);
  lines.push('');
  lines.push('## Key facts');
  lines.push(`- Name: ${business.name} (also operates as Xpress Truck Services)`);
  lines.push(`- Address: ${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}, USA`);
  lines.push(`- Phone / 24-7 dispatch: ${business.phoneDisplay}`);
  lines.push(`- Website: ${D}/`);
  lines.push(`- Shop hours: Monday–Friday 08:00–18:00, Saturday 08:00–16:00; emergency road service dispatch 24/7/365`);
  lines.push(`- Mobile service radius: approximately ${business.serviceRadiusMiles} miles from Lehigh Acres, FL`);
  lines.push(`- Languages: ${business.languages.join(', ')}`);
  lines.push(`- Payment: ${business.paymentAccepted}`);
  lines.push(`- Vehicle types served: Class 6–8 trucks, semi tractors, trailers, reefers, dump trucks, box trucks, RVs, buses, agricultural and construction equipment`);
  lines.push(`- Common tire sizes stocked: 11R22.5, 295/75R22.5, 11R24.5, 285/75R24.5, 245/70R19.5`);
  lines.push(`- Brands: ${brands.map(b=>b.name).join(', ')}`);
  lines.push('');
  lines.push('## Services');
  for (const sv of services) lines.push(`- [${sv.en.name}](${D}${route('en','service',sv.slug)}): ${sv.en.answer}`);
  lines.push('');
  lines.push('## Service area pages');
  for (const l of locations) lines.push(`- [${l.city}, ${l.county}](${D}${route('en','area',l.slug)}): typical response ${l.responseWindow}; corridors ${l.corridors.join(', ')}.`);
  lines.push('');
  lines.push('## Guides');
  for (const g of guides) lines.push(`- [${g.en.title}](${D}${route('en','guide',g.slug)}): ${g.en.description}`);
  lines.push('');
  lines.push('## Frequently asked questions');
  for (const f of faqs) { lines.push(`### ${f.en.q}`); lines.push(f.en.a); lines.push(''); }
  lines.push('## Spanish');
  lines.push(`Full Spanish-language mirror at ${D}/es/. All services, service areas, guides and FAQs are available in Spanish.`);
  lines.push('');
  lines.push('## Optional');
  lines.push(`- [Contact and dispatch](${D}/contact/)`);
  lines.push(`- [Request a quote](${D}/quote/)`);
  lines.push(`- [Brands carried](${D}/brands/)`);
  fs.writeFileSync(path.join(OUT,'llms.txt'), lines.join('\n'));

  // llms-full.txt: cuerpo completo de guías + FAQ para ingesta de un solo golpe
  const full = [];
  full.push(`# ${business.name} — full reference for language models`);
  full.push(`Source: ${D}/ · Updated ${new Date().toISOString().slice(0,10)}`);
  full.push('');
  full.push(lines.slice(2).join('\n'));
  full.push('\n---\n');
  for (const g of guides) {
    full.push(`# ${g.en.title}`);
    full.push(`URL: ${D}${route('en','guide',g.slug)} · Published ${g.date} · Updated ${g.updated}`);
    full.push('');
    full.push(g.en.answer); full.push('');
    for (const b of g.en.blocks) {
      if (b.h2) full.push(`## ${b.h2}`);
      if (b.p) full.push(b.p);
      if (b.callout) full.push(`> ${b.callout}`);
      if (b.list) full.push(b.list.map(x=>`- ${x}`).join('\n'));
      if (b.table) {
        full.push(`| ${b.table.head.join(' | ')} |`);
        full.push(`| ${b.table.head.map(()=>'---').join(' | ')} |`);
        for (const r of b.table.rows) full.push(`| ${r.join(' | ')} |`);
      }
      full.push('');
    }
    full.push('---');
  }
  fs.writeFileSync(path.join(OUT,'llms-full.txt'), full.join('\n'));
}

function extras() {
  fs.writeFileSync(path.join(OUT,'site.webmanifest'), JSON.stringify({
    name: business.name, short_name: 'Xpress Tire', start_url: '/', display: 'standalone',
    background_color: '#0b1220', theme_color: '#0b1220', lang: 'en-US',
    icons: [{ src: '/assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
            { src: '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  }, null, 2));
  fs.writeFileSync(path.join(OUT,'_headers'), `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(self), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/llms.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=3600

/llms-full.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=3600
`);
  fs.writeFileSync(path.join(OUT,'_redirects'), `# Rutas viejas del sitio Wix -> nuevas. 301 obligatorio para no perder equity.
/our-store            /contact/                 301
/about-us             /about/                   301
/services             /services/                301
/delivery             /services/mobile-tire-service-and-delivery/  301
/contact-us           /contact/                 301
/home                 /                         301
/index.html           /                         301
/tires                /services/commercial-truck-tires/  301
/roadside-assistance  /services/emergency-truck-tire-road-service/ 301
/financing            /services/tire-financing/  301
/es/index.html        /es/                      301
/*                    /404.html                 404
`);
}

// ---------- RUN ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(__dirname,'assets'), path.join(OUT,'assets'), { recursive: true });

for (const lang of LANGS) {
  home(lang);
  serviceHub(lang);
  for (const sv of services) servicePage(sv, lang);
  areaHub(lang);
  for (const l of locations) areaPage(l, lang);
  learnHub(lang);
  for (const g of guides) guidePage(g, lang);
  faqPage(lang);
  aboutPage(lang);
  contactPage(lang);
  quotePage(lang);
  brandsPage(lang);
  thanksPage(lang);
}
notFound();
sitemap();
robots();
llmsTxt();
extras();

console.log(`✓ ${pages.length} indexable pages built into dist/`);
console.log(`  EN: ${pages.filter(p=>!p.url.startsWith('/es/')).length}  ES: ${pages.filter(p=>p.url.startsWith('/es/')).length}`);
