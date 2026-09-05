// Núcleo NAP + entidad. Fuente de verdad para JSON-LD, footer, llms.txt y GBP.
// VERIFICAR con el dueño los campos marcados VERIFY antes de publicar.

export const business = {
  legalName: 'Xpress Tire Center LLC',            // VERIFY
  name: 'Xpress Tire Center',
  alternateName: ['Xpress Truck Services', 'Xpress Tire Center Lehigh Acres'],
  tagline: {
    en: 'Semi Truck Tires & 24/7 Road Service — Southwest Florida',
    es: 'Llantas para Semi Trucks y Servicio en Carretera 24/7 — Suroeste de Florida',
  },
  domain: 'https://www.xpresstirecenter.com',
  phone: '+12393148100',
  phoneDisplay: '(239) 314-8100',
  dispatchPhone: '+12393148100',                  // VERIFY: línea dedicada de despacho 24/7
  smsPhone: '+12393148100',                       // VERIFY
  email: 'service@xpresstirecenter.com',          // VERIFY
  fleetEmail: 'fleet@xpresstirecenter.com',       // VERIFY
  address: {
    street: '5530 4th St W',
    locality: 'Lehigh Acres',
    region: 'FL',
    regionName: 'Florida',
    postalCode: '33971',
    country: 'US',
  },
  geo: { lat: 26.6115, lng: -81.7290 },           // VERIFY con pin exacto de GBP
  founded: '2014',                                // VERIFY
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Check, Visa, Mastercard, American Express, Discover, Fleet Cards, Comdata, EFS, T-Chek, Financing',
  hours: [
    { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '16:00' },
    { days: ['Sunday'], opens: '00:00', closes: '00:00', closed: true },
  ],
  roadServiceHours: '24/7/365',
  socials: {
    facebook: 'https://www.facebook.com/xpresstirecenter/',
    instagram: 'https://www.instagram.com/xpresstirecenter/',
    google: '',      // VERIFY: URL corta del perfil de Google Business
    youtube: '',
    linkedin: '',
  },
  // Radio real de servicio móvil desde la base (millas)
  serviceRadiusMiles: 75,
  languages: ['English', 'Spanish', 'Haitian Creole'], // VERIFY creole
};

export const brands = [
  { name: 'Michelin', tier: 'tier1' },
  { name: 'Bridgestone', tier: 'tier1' },
  { name: 'Goodyear', tier: 'tier1' },
  { name: 'Continental', tier: 'tier1' },
  { name: 'Yokohama', tier: 'tier2' },
  { name: 'Firestone', tier: 'tier2' },
  { name: 'Hankook', tier: 'tier2' },
  { name: 'Toyo', tier: 'tier2' },
  { name: 'Double Coin', tier: 'tier3' },
  { name: 'Sailun', tier: 'tier3' },
  { name: 'Roadmaster', tier: 'tier3' },
  { name: 'Amerityre', tier: 'tier3' },
]; // VERIFY inventario real por marca

// Trust signals — NO inventar. Rellenar con datos reales antes de publicar.
export const proof = {
  aggregateRating: null,       // { value: 4.8, count: 214 } cuando esté verificado en GBP
  yearsInBusiness: 11,         // VERIFY
  trucksRolled: null,          // ej. '9,400+ tires mounted since 2014'
  avgResponseMinutes: 60,      // VERIFY promedio real de llegada en I-75
};
