import { business, brands, proof } from '../data/business.js';
import { ui } from '../data/ui.js';
import { esc, icon, path } from './layout.js';

const tel = `tel:${business.phone}`;

// Bloque AEO: primera cosa que un motor de respuesta extrae. Texto plano, citable.
export function answerBox(lang, text) {
  return `<aside class="answer" data-aeo="quick-answer">
  <p class="answer-label">${ui[lang].labels.quickAnswer}</p>
  <p class="answer-text">${esc(text)}</p>
</aside>`;
}

export function trustStrip(lang) {
  const es = lang === 'es';
  const items = es ? [
    ['clock','Despacho 24/7/365','Contesta una persona, no un buzón'],
    ['pin','Base en Lehigh Acres','Lee, Collier, Charlotte y Hendry'],
    ['truck','Unidades móviles cargadas','Montamos y damos torque en sitio'],
    ['card','Flota, Comdata, EFS','Y financiamiento con crédito difícil'],
  ] : [
    ['clock','24/7/365 dispatch','A human answers, not a voicemail'],
    ['pin','Based in Lehigh Acres','Lee, Collier, Charlotte & Hendry'],
    ['truck','Loaded mobile units','We mount and torque on site'],
    ['card','Fleet cards, Comdata, EFS','Plus credit-challenged financing'],
  ];
  return `<section class="trust"><div class="wrap trust-grid">${
    items.map(([ic,h,p])=>`<div class="trust-item">${icon(ic)}<div><strong>${esc(h)}</strong><span>${esc(p)}</span></div></div>`).join('')
  }</div></section>`;
}

export function ctaBand(lang, { title, sub, primary, secondary } = {}) {
  const t = ui[lang];
  const es = lang === 'es';
  return `<section class="cta-band">
  <div class="wrap">
    <div class="cta-copy">
      <h2>${esc(title || (es ? 'Que la troca no se quede parada' : 'Keep the truck rolling'))}</h2>
      <p>${esc(sub || (es ? 'Llama y en la primera llamada te decimos precio, medida y tiempo de llegada.' : 'One call gets you a price, a size and an arrival window.'))}</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-call btn-lg" href="${tel}" data-cta="band-call">${icon('phone')}<span>${primary || business.phoneDisplay}</span></a>
      <a class="btn btn-outline btn-lg" href="${path(lang,'quote')}" data-cta="band-quote">${esc(secondary || t.cta.quoteLong)}</a>
    </div>
  </div>
</section>`;
}

export function serviceCards(lang, services, { limit } = {}) {
  const list = limit ? services.slice(0, limit) : services;
  return `<div class="cards">${list.map(sv => {
    const c = sv[lang];
    const href = path(lang, 'service', lang === 'es' ? sv.esSlug : sv.slug);
    return `<article class="card">
      <a class="card-link" href="${href}">
        <span class="card-icon">${icon(sv.icon)}</span>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.short)}</p>
        <span class="card-more">${ui[lang].cta.all} ${icon('arrow')}</span>
      </a>
    </article>`;
  }).join('')}</div>`;
}

export function locationCards(lang, locations) {
  return `<div class="cards cards-loc">${locations.map(l => `
    <article class="card">
      <a class="card-link" href="${path(lang,'area',l.slug)}">
        <span class="card-icon">${icon('pin')}</span>
        <h3>${esc(l.city)}</h3>
        <p class="muted">${esc(l.county)}</p>
        <p><strong>${ui[lang].labels.response}:</strong> ${esc(l.responseWindow)}</p>
        <span class="card-more">${ui[lang].cta.all} ${icon('arrow')}</span>
      </a>
    </article>`).join('')}</div>`;
}

export function faqBlock(lang, items, { heading } = {}) {
  const t = ui[lang];
  return `<section class="faq-sec"><div class="wrap">
    <h2>${esc(heading || t.labels.faq)}</h2>
    <div class="faq-list">${items.map((f,i) => `
      <details class="faq-item"${i===0?' open':''}>
        <summary><span>${esc(f.q)}</span></summary>
        <div class="faq-a"><p>${esc(f.a)}</p></div>
      </details>`).join('')}</div>
  </div></section>`;
}

export function brandWall(lang) {
  const t = ui[lang];
  return `<section class="brands"><div class="wrap">
    <h2>${esc(t.labels.brands)}</h2>
    <ul class="brand-list">${brands.map(b=>`<li class="brand-chip" data-tier="${b.tier}">${esc(b.name)}</li>`).join('')}</ul>
    <p class="muted small">${lang==='es'
      ? 'Manejamos desde premium hasta económica. Te decimos honestamente cuál conviene para tu costo por milla, no cuál nos deja más margen.'
      : 'We carry tier-one through value brands. We will tell you honestly which one fits your cost per mile, not which one pays us best.'}</p>
  </div></section>`;
}

export function quoteForm(lang, { compact } = {}) {
  const f = ui[lang].form;
  return `<form class="quote-form${compact?' compact':''}" name="quote" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thanks/">
    <input type="hidden" name="form-name" value="quote">
    <p class="hp"><label>Do not fill: <input name="bot-field"></label></p>
    <div class="fg fg-2">
      <label>${f.name}<input type="text" name="name" required autocomplete="name"></label>
      <label>${f.phone}<input type="tel" name="phone" required autocomplete="tel" inputmode="tel"></label>
    </div>
    <div class="fg fg-2">
      <label>${f.company}<input type="text" name="company" autocomplete="organization"></label>
      <label>${f.email}<input type="email" name="email" autocomplete="email" inputmode="email"></label>
    </div>
    <div class="fg fg-2">
      <label>${f.need}<select name="need">${f.needOpts.map(o=>`<option>${esc(o)}</option>`).join('')}</select></label>
      <label>${f.urgency}<select name="urgency">${f.urgencyOpts.map(o=>`<option>${esc(o)}</option>`).join('')}</select></label>
    </div>
    <div class="fg fg-3">
      <label>${f.size}<input type="text" name="size" placeholder="11R22.5"></label>
      <label>${f.qty}<input type="number" name="qty" min="1" max="200" inputmode="numeric"></label>
      <label>${f.location}<input type="text" name="location" placeholder="${lang==='es'?'I-75 MM 123 sur':'I-75 MM 123 SB'}"></label>
    </div>
    <label>${f.message}<textarea name="message" rows="4"></textarea></label>
    <p class="consent small muted">${esc(f.consent)}</p>
    <button class="btn btn-primary btn-lg" type="submit" data-cta="form-submit">${esc(f.submit)}</button>
  </form>`;
}

export function statBar(lang) {
  const es = lang === 'es';
  const stats = [
    [`${proof.yearsInBusiness}+`, es ? 'años sirviendo al suroeste de Florida' : 'years serving Southwest Florida'],
    ['24/7', es ? 'despacho en carretera, 365 días' : 'road service dispatch, 365 days'],
    [`${business.serviceRadiusMiles} mi`, es ? 'radio de servicio móvil' : 'mobile service radius'],
    ['2', es ? 'idiomas en el mostrador y en la carretera' : 'languages at the counter and on the road'],
  ];
  return `<section class="stats"><div class="wrap stats-grid">${
    stats.map(([n,l])=>`<div class="stat"><span class="stat-n">${esc(n)}</span><span class="stat-l">${esc(l)}</span></div>`).join('')
  }</div></section>`;
}

export function renderBlocks(blocks) {
  return blocks.map(b => {
    if (b.h2) return `<h2>${esc(b.h2)}</h2>`;
    if (b.h3) return `<h3>${esc(b.h3)}</h3>`;
    if (b.p) return `<p>${esc(b.p)}</p>`;
    if (b.list) return `<ul class="prose-list">${b.list.map(li=>`<li>${esc(li)}</li>`).join('')}</ul>`;
    if (b.callout) return `<aside class="callout">${icon('siren')}<p>${esc(b.callout)}</p></aside>`;
    if (b.table) return `<div class="table-wrap"><table><thead><tr>${
      b.table.head.map(h=>`<th scope="col">${esc(h)}</th>`).join('')
    }</tr></thead><tbody>${
      b.table.rows.map(r=>`<tr>${r.map((c,i)=> i===0?`<th scope="row">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join('')}</tr>`).join('')
    }</tbody></table></div>`;
    return '';
  }).join('\n');
}
