/* Xpress Tire Center — JS mínimo. Sin frameworks, sin dependencias.
   Objetivo: nav móvil, medición de conversiones y detección de intención de emergencia. */
(function () {
  'use strict';

  // --- Nav móvil ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) toggle.click();
    });
  }

  // --- Medición de conversiones ---
  // Envía a dataLayer (GTM) y a gtag si existen. No rompe si no hay nada.
  window.dataLayer = window.dataLayer || [];
  function track(name, params) {
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-cta]');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var type = href.indexOf('tel:') === 0 ? 'call'
             : href.indexOf('sms:') === 0 ? 'sms'
             : href.indexOf('maps') > -1 ? 'directions'
             : 'click';
    track(type === 'call' ? 'call_click' : type === 'sms' ? 'sms_click' : 'cta_click', {
      cta_id: el.getAttribute('data-cta'),
      cta_type: type,
      page_path: location.pathname,
      page_lang: document.documentElement.lang
    });
  }, { passive: true });

  // --- Envío de formulario ---
  var form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', function () {
      var need = form.querySelector('[name="need"]');
      var urgency = form.querySelector('[name="urgency"]');
      track('generate_lead', {
        form_name: 'quote',
        lead_need: need ? need.value : '',
        lead_urgency: urgency ? urgency.value : '',
        page_lang: document.documentElement.lang
      });
    });
  }

  // --- Scroll depth (una vez por umbral) ---
  var hits = {};
  var thresholds = [25, 50, 75, 100];
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = Math.round(((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100);
    thresholds.forEach(function (t) {
      if (pct >= t && !hits[t]) { hits[t] = 1; track('scroll_depth', { percent: t }); }
    });
  }, { passive: true });

  // --- Intención de emergencia: fuera de horario, sube el CTA de llamada ---
  // El taller cierra a las 18:00 (sáb 16:00) pero el despacho no. Si alguien
  // entra a las 2 a.m., lo único que importa es el teléfono.
  try {
    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay(); // 0 = domingo
    var afterHours = day === 0 || hour < 8 || hour >= 18 || (day === 6 && hour >= 16);
    if (afterHours) {
      document.body.classList.add('after-hours');
      var bar = document.querySelector('.emergency-bar strong');
      if (bar && document.documentElement.lang.indexOf('es') === 0) {
        bar.textContent = 'El taller está cerrado — el despacho no.';
      } else if (bar) {
        bar.textContent = 'Shop is closed — dispatch is not.';
      }
      track('after_hours_visit', { hour: hour, day: day });
    }
  } catch (err) { /* noop */ }

  // --- Copiar el número al hacer clic largo en escritorio ---
  if (!('ontouchstart' in window)) {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.setAttribute('title', 'Click to call, or copy: ' + a.getAttribute('href').replace('tel:', ''));
    });
  }
})();
