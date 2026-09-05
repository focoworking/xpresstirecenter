import { business, brands, proof } from '../data/business.js';

const D = business.domain;
const dayMap = { Monday:'Mo', Tuesday:'Tu', Wednesday:'We', Thursday:'Th', Friday:'Fr', Saturday:'Sa', Sunday:'Su' };

export const ids = {
  org: `${D}/#organization`,
  local: `${D}/#localbusiness`,
  website: `${D}/#website`,
  place: `${D}/#place`,
};

function openingHours() {
  return business.hours.filter(h => !h.closed).map(h => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days.map(d => `https://schema.org/${d}`),
    opens: h.opens, closes: h.closes,
  }));
}

export function organizationNode() {
  const node = {
    '@type': ['AutoRepair', 'TireShop', 'LocalBusiness'],
    '@id': ids.local,
    name: business.name,
    legalName: business.legalName,
    alternateName: business.alternateName,
    url: `${D}/`,
    telephone: business.phone,
    email: business.email,
    description: 'Commercial semi truck tire sales, mobile tire service and 24/7 emergency road service in Lehigh Acres, Fort Myers, Naples and the I-75 corridor of Southwest Florida.',
    slogan: business.tagline.en,
    foundingDate: business.founded,
    priceRange: business.priceRange,
    currenciesAccepted: business.currenciesAccepted,
    paymentAccepted: business.paymentAccepted,
    knowsLanguage: business.languages,
    image: [`${D}/assets/img/og-default.png`],
    logo: { '@type': 'ImageObject', '@id': `${D}/#logo`, url: `${D}/assets/img/logo.svg`, contentUrl: `${D}/assets/img/logo.svg`, caption: business.name },
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${business.name} ${business.address.street} ${business.address.locality} ${business.address.region}`)}`,
    openingHoursSpecification: openingHours(),
    sameAs: Object.values(business.socials).filter(Boolean),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Lee County, Florida' },
      { '@type': 'AdministrativeArea', name: 'Collier County, Florida' },
      { '@type': 'AdministrativeArea', name: 'Charlotte County, Florida' },
      { '@type': 'AdministrativeArea', name: 'Hendry County, Florida' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
      geoRadius: `${Math.round(business.serviceRadiusMiles * 1609.34)}`,
    },
    brand: brands.map(b => ({ '@type': 'Brand', name: b.name })),
    contactPoint: [
      { '@type': 'ContactPoint', telephone: business.dispatchPhone, contactType: 'emergency',
        availableLanguage: business.languages, areaServed: 'US-FL',
        hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: Object.values(dayMap).map(d=>d), opens: '00:00', closes: '23:59' } },
      { '@type': 'ContactPoint', telephone: business.phone, contactType: 'sales', availableLanguage: business.languages },
    ],
  };
  if (proof.aggregateRating) {
    node.aggregateRating = { '@type': 'AggregateRating', ratingValue: proof.aggregateRating.value, reviewCount: proof.aggregateRating.count };
  }
  return node;
}

export function websiteNode(lang) {
  return {
    '@type': 'WebSite', '@id': ids.website, url: `${D}/`, name: business.name,
    publisher: { '@id': ids.local }, inLanguage: lang === 'es' ? 'es-US' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${D}/search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbNode(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.name,
      item: t.url ? `${D}${t.url}` : undefined,
    })),
  };
}

export function faqNode(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceNode({ name, description, url, areaNames, serviceType }) {
  return {
    '@type': 'Service',
    '@id': `${D}${url}#service`,
    name, description, serviceType: serviceType || name,
    url: `${D}${url}`,
    provider: { '@id': ids.local },
    areaServed: areaNames.map(n => ({ '@type': 'Place', name: n })),
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: business.phone },
      serviceUrl: `${D}${url}`,
    },
  };
}

export function articleNode({ title, description, url, datePublished, dateModified, lang }) {
  return {
    '@type': 'Article',
    '@id': `${D}${url}#article`,
    headline: title, description,
    mainEntityOfPage: `${D}${url}`,
    inLanguage: lang === 'es' ? 'es-US' : 'en-US',
    datePublished, dateModified,
    author: { '@id': ids.local },
    publisher: { '@id': ids.local },
    image: `${D}/assets/img/og-default.png`,
  };
}

export function webPageNode({ title, description, url, lang, primaryEntityId }) {
  const n = {
    '@type': 'WebPage', '@id': `${D}${url}#webpage`, url: `${D}${url}`,
    name: title, description,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.local },
    inLanguage: lang === 'es' ? 'es-US' : 'en-US',
  };
  if (primaryEntityId) n.mainEntity = { '@id': primaryEntityId };
  return n;
}

export function graph(nodes) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) }, null, 0);
}
