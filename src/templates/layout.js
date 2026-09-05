import { business } from '../data/business.js';
import { ui } from '../data/ui.js';
import { services } from '../data/services.js';
import { locations } from '../data/locations.js';

export const D = business.domain;
export const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// Rutas canónicas. EN en raíz, ES bajo /es/.
export function path(lang, key, slug) {
  const es = lang === 'es';
  const map = {
    home:      es ? '/es/' : '/',
    services:  es ? '/es/servicios/' : '/services/',
    service:   es ? `/es/servicios/${slug}/` : `/services/${slug}/`,
    areas:     es ? '/es/zona-de-servicio/' : '/service-area/',
    area:      es ? `/es/zona-de-servicio/${slug}/` : `/service-area/${slug}/`,
    learn:     es ? '/es/aprende/' : '/learn/',
    guide:     es ? `/es/aprende/${slug}/` : `/learn/${slug}/`,
    faq:       es ? '/es/preguntas-frecuentes/' : '/faq/',
    fleet:     es ? '/es/servicios/programa-de-llantas-para-flotas/' : '/services/fleet-tire-program/',
    about:     es ? '/es/nosotros/' : '/about/',
    contact:   es ? '/es/contacto/' : '/contact/',
    quote:     es ? '/es/cotizar/' : '/quote/',
    emergency: es ? '/es/servicios/servicio-de-emergencia-llantas-camion/' : '/services/emergency-truck-tire-road-service/',
    brands:    es ? '/es/marcas/' : '/brands/',
  };
  return map[key];
}

const telHref = `tel:${business.phone}`;
const smsHref = `sms:${business.smsPhone}`;

function icon(name) {
  const p = {
    phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1z"/>',
    siren: '<path d="M12 2a5 5 0 0 0-5 5v6h10V7a5 5 0 0 0-5-5zM4 15h16v3H4zM2 20h20v2H2z"/>',
    tire: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>',
    fleet: '<path d="M1 6h11v9H1zM13 9h4l3 3v3h-7zM4.5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
    truck: '<path d="M2 5h12v10H2zM15 8h3.6l2.4 3v4h-6zM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
    wrench: '<path d="M21 5.5a5.5 5.5 0 0 1-7.6 5.1l-7 7a2 2 0 1 1-2.9-2.8l7-7A5.5 5.5 0 0 1 18 2.3l-3 3 1.7 1.7 3-3c.2.5.3 1 .3 1.5z"/>',
    gauge: '<path d="M12 3a9 9 0 0 0-7.9 13.3l1.8-1A7 7 0 1 1 19 15.4l1.8 1A9 9 0 0 0 12 3zm4 5-5 4.5a1.5 1.5 0 1 0 2 2z"/>',
    card: '<path d="M2 6h20v4H2zM2 12h20v6H2zm3 3h5v2H5z"/>',
    pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
    clock: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2.2a7.8 7.8 0 1 1 0 15.6 7.8 7.8 0 0 1 0-15.6z"/><path d="M12.9 6.6h-1.8v6.3h4.8v-1.8h-3z"/>',
    check: '<path d="M9.5 17.6 4 12.1l1.6-1.6 3.9 3.9 8.9-8.9L20 7.1z"/>',
    chat: '<path d="M2 3h20v14H7l-5 5z"/>',
    arrow: '<path d="M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6z"/>',
  }[name] || '';
  return `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${p}</svg>`;
}
export { icon };

function header(lang, altPath) {
  const t = ui[lang];
  const s = (k, slug) => path(lang, k, slug);
  return `
<div class="emergency-bar">
  <div class="wrap">
    ${icon('siren')}<strong>${lang==='es'?'¿Llanta reventada ahora mismo?':'Tire down right now?'}</strong>
    <span class="hide-sm">${lang==='es'?'Despacho 24/7 en la I-75 y todo el suroeste de Florida.':'24/7 dispatch on I-75 and across Southwest Florida.'}</span>
    <a class="ebar-cta" href="${telHref}" data-cta="emergency-bar">${business.phoneDisplay}</a>
  </div>
</div>
<header class="site-header" id="top">
  <div class="wrap header-inner">
    <a class="brand" href="${s('home')}" aria-label="${esc(business.name)} — ${lang==='es'?'inicio':'home'}">
      <img src="/assets/img/logo.svg" alt="${esc(business.name)}" width="180" height="40" fetchpriority="high">
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="${t.labels.menu}">
      <span></span><span></span><span></span>
    </button>
    <nav id="primary-nav" class="primary-nav" aria-label="${lang==='es'?'Navegación principal':'Primary navigation'}">
      <ul>
        <li><a href="${s('services')}">${t.nav.services}</a></li>
        <li><a href="${s('service', lang==='es' ? 'llantas-comerciales-para-camion' : 'commercial-truck-tires')}">${t.nav.tires}</a></li>
        <li><a href="${s('fleet')}">${t.nav.fleet}</a></li>
        <li><a href="${s('areas')}">${t.nav.areas}</a></li>
        <li><a href="${s('learn')}">${t.nav.learn}</a></li>
        <li><a href="${s('about')}">${t.nav.about}</a></li>
        <li><a href="${s('contact')}">${t.nav.contact}</a></li>
      </ul>
      <div class="nav-actions">
        <a class="lang-switch" href="${altPath}" hreflang="${t.other}" lang="${t.other}" rel="alternate">${t.otherFlagLabel}</a>
        <a class="btn btn-ghost" href="${s('quote')}" data-cta="nav-quote">${t.cta.quote}</a>
        <a class="btn btn-call" href="${telHref}" data-cta="nav-call">${icon('phone')}<span>${business.phoneDisplay}</span></a>
      </div>
    </nav>
  </div>
</header>`;
}

function footer(lang) {
  const t = ui[lang];
  const s = (k, slug) => path(lang, k, slug);
  const a = business.address;
  const hoursLines = business.hours.map(h => {
    const days = h.days.length > 1 ? `${h.days[0].slice(0,3)}–${h.days[h.days.length-1].slice(0,3)}` : h.days[0].slice(0,3);
    return h.closed ? `${days}: ${lang==='es'?'Cerrado':'Closed'}` : `${days}: ${h.opens}–${h.closes}`;
  }).join('<br>');
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="f-col f-brand">
      <img src="/assets/img/logo.svg" alt="${esc(business.name)}" width="180" height="40" loading="lazy">
      <p>${t.footer.tagline}</p>
      <div class="f-social">
        ${business.socials.facebook ? `<a href="${business.socials.facebook}" rel="noopener">Facebook</a>` : ''}
        ${business.socials.instagram ? `<a href="${business.socials.instagram}" rel="noopener">Instagram</a>` : ''}
        ${business.socials.google ? `<a href="${business.socials.google}" rel="noopener">Google</a>` : ''}
      </div>
    </div>
    <div class="f-col">
      <h3>${t.nav.services}</h3>
      <ul>${services.map(sv => `<li><a href="${s('service', lang==='es'?sv.esSlug:sv.slug)}">${esc(sv[lang].name)}</a></li>`).join('')}</ul>
    </div>
    <div class="f-col">
      <h3>${t.nav.areas}</h3>
      <ul>${locations.map(l => `<li><a href="${s('area', l.slug)}">${esc(l.city)}</a></li>`).join('')}</ul>
    </div>
    <div class="f-col">
      <h3>${t.nav.contact}</h3>
      <p class="f-nap">
        <strong>${esc(business.name)}</strong><br>
        ${esc(a.street)}<br>${esc(a.locality)}, ${a.region} ${a.postalCode}<br>
        <a href="${telHref}" data-cta="footer-call">${business.phoneDisplay}</a><br>
        <a href="mailto:${business.email}">${business.email}</a>
      </p>
      <p class="f-hours"><strong>${t.labels.shopHours}</strong><br>${hoursLines}<br>
      <strong class="hl">${t.labels.roadService}: 24/7/365</strong></p>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>&copy; ${new Date().getFullYear()} ${esc(business.legalName)}. ${t.footer.rights}</p>
    <p class="disclaimer">${t.footer.disclaimer}</p>
  </div>
</footer>
<div class="mobile-cta" role="group" aria-label="${lang==='es'?'Acciones rápidas':'Quick actions'}">
  <a href="${telHref}" class="mc mc-call" data-cta="sticky-call">${icon('phone')}<span>${t.cta.call}</span></a>
  <a href="${smsHref}" class="mc mc-text" data-cta="sticky-text">${icon('chat')}<span>${t.cta.text}</span></a>
  <a href="${s('quote')}" class="mc mc-quote" data-cta="sticky-quote">${icon('arrow')}<span>${t.cta.quote}</span></a>
</div>`;
}

export function layout({ lang, title, description, url, altUrl, jsonld, body, bodyClass = '', ogImage, noindex }) {
  const t = ui[lang];
  const canonical = `${D}${url}`;
  const alt = altUrl ? `${D}${altUrl}` : null;
  return `<!doctype html>
<html lang="${t.htmlLang}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${alt ? `<link rel="alternate" hreflang="${lang==='es'?'en-US':'es-US'}" href="${alt}">
<link rel="alternate" hreflang="${t.htmlLang}" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${lang==='es'?alt:canonical}">` : ''}
${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">'}
<meta name="theme-color" content="#0b1220">
<meta name="format-detection" content="telephone=yes">
<meta name="geo.region" content="US-FL">
<meta name="geo.placename" content="${esc(business.address.locality)}, Florida">
<meta name="geo.position" content="${business.geo.lat};${business.geo.lng}">
<meta name="ICBM" content="${business.geo.lat}, ${business.geo.lng}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(business.name)}">
<meta property="og:locale" content="${lang==='es'?'es_US':'en_US'}">
${alt ? `<meta property="og:locale:alternate" content="${lang==='es'?'en_US':'es_US'}">` : ''}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${D}${ogImage || (lang==='es' ? '/assets/img/og-es.png' : '/assets/img/og-default.png')}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${D}${ogImage || '/assets/img/og-default.png'}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" as="style" href="/assets/css/main.css">
<link rel="stylesheet" href="/assets/css/main.css">
<script type="application/ld+json">${jsonld}</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${t.labels.skip}</a>
${header(lang, altUrl || path(t.other, 'home'))}
<main id="main">
${body}
</main>
${footer(lang)}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

export function breadcrumbHtml(lang, trail) {
  const t = ui[lang];
  return `<nav class="crumbs" aria-label="${t.labels.breadcrumb}"><div class="wrap"><ol>${
    trail.map((c,i)=> `<li>${c.url && i<trail.length-1 ? `<a href="${c.url}">${esc(c.name)}</a>` : `<span aria-current="page">${esc(c.name)}</span>`}</li>`).join('')
  }</ol></div></nav>`;
}
