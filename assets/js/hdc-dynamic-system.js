(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  const ROUTES = {
    all: {
      label: 'All applications',
      readout: 'Browse by application. Production route and surface suitability are confirmed after the physical job is reviewed.',
      href: 'request-a-quote.html'
    },
    labels: {
      label: 'Labels & decals',
      readout: 'Labels, stickers and decals — route selection depends on the confirmed surface, handling and finish.',
      href: 'request-a-quote.html?application=Labels%20%26%20decals'
    },
    objects: {
      label: 'Products & objects',
      readout: 'Objects and rigid surfaces — dimensions, material and print area are reviewed before production.',
      href: 'request-a-quote.html?application=Products%20%26%20object%20printing'
    },
    packaging: {
      label: 'Packaging & commercial',
      readout: 'Packaging and commercial print — artwork, stock and finishing route are reviewed together.',
      href: 'request-a-quote.html?application=Packaging%20%26%20commercial%20print'
    },
    environment: {
      label: 'Brand environments',
      readout: 'Large-format and environmental work — scale, substrate, location and installation scope are reviewed first.',
      href: 'request-a-quote.html?application=Large%20format%20%26%20brand%20environments'
    }
  };

  const ROUTE_KEY = 'hdcApplicationRouteV1';
  const readSavedRoute = () => {
    try {
      const saved = localStorage.getItem(ROUTE_KEY);
      return saved && ROUTES[saved] ? saved : 'all';
    } catch (_) {
      return 'all';
    }
  };
  const writeSavedRoute = value => {
    try {
      if (value === 'all') localStorage.removeItem(ROUTE_KEY);
      else localStorage.setItem(ROUTE_KEY, value);
    } catch (_) {}
  };

  let route = readSavedRoute();

  const routeButtons = Array.from(document.querySelectorAll('[data-application-route]'));
  const routeReadout = document.querySelector('[data-route-readout]');
  const routeCta = document.querySelector('[data-route-cta]');
  const cards = Array.from(document.querySelectorAll('[data-route-card]'));
  const productionState = document.querySelector('[data-production-state]');
  const productionStateText = document.querySelector('[data-production-state-text]');

  const setProductionState = (state, message) => {
    if (!productionState) return;
    productionState.dataset.state = state;
    if (productionStateText) productionStateText.textContent = message;
  };

  const setRoute = (next, announce = true) => {
    if (!ROUTES[next]) next = 'all';
    route = next;

    routeButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.applicationRoute === route));
    });

    cards.forEach(card => {
      const tags = (card.dataset.routeCard || '').split(' ');
      const match = route === 'all' || tags.includes(route);
      card.classList.toggle('is-route-match', match);
      card.classList.toggle('is-route-muted', !match);
      if (!card.hasAttribute('data-product-universe-clone')) card.setAttribute('aria-hidden', 'false');
    });

    if (routeReadout) routeReadout.textContent = ROUTES[route].readout;
    if (routeCta) {
      routeCta.href = ROUTES[route].href;
      routeCta.textContent = route === 'all' ? 'Start with your application' : `Enquire about ${ROUTES[route].label}`;
    }

    setProductionState(
      route === 'all' ? 'idle' : 'review',
      route === 'all' ? 'Awaiting application context' : `${ROUTES[route].label}: route to review`
    );

    document.querySelectorAll('[data-enquiry-route]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.enquiryRoute === route));
    });

    const enquirySummary = document.querySelector('[data-enquiry-summary]');
    const enquiryCta = document.querySelector('[data-enquiry-cta]');
    if (enquirySummary) enquirySummary.textContent = ROUTES[route].readout;
    if (enquiryCta) enquiryCta.href = ROUTES[route].href;

    if (announce) writeSavedRoute(route);

    if (announce && window.hdcTrack) {
      window.hdcTrack('application_route_select', { route });
    }
  };

  routeButtons.forEach(button => {
    button.addEventListener('click', () => setRoute(button.dataset.applicationRoute));
  });

  document.querySelectorAll('[data-enquiry-route]').forEach(button => {
    button.addEventListener('click', () => setRoute(button.dataset.enquiryRoute));
  });

  cards.forEach(card => {
    card.addEventListener('focus', () => {
      const first = (card.dataset.routeCard || '').split(' ')[0];
      if (ROUTES[first]) setProductionState('active', `${ROUTES[first].label}: application in focus`);
    });
    card.addEventListener('pointerenter', event => {
      if (!finePointer.matches || (event.pointerType && event.pointerType !== 'mouse')) return;
      const first = (card.dataset.routeCard || '').split(' ')[0];
      if (ROUTES[first]) setProductionState('active', `${ROUTES[first].label}: application in focus`);
    });
    card.addEventListener('pointerleave', () => {
      setProductionState(
        route === 'all' ? 'idle' : 'review',
        route === 'all' ? 'Awaiting application context' : `${ROUTES[route].label}: route to review`
      );
    });
  });

  // Surface-reactive imagery: pointer light for fine pointers, tap/focus state for touch.
  document.querySelectorAll('[data-surface-reactive]').forEach(surface => {
    let frame = 0;
    const reset = () => {
      surface.classList.remove('is-surface-engaged');
      surface.style.removeProperty('--surface-x');
      surface.style.removeProperty('--surface-y');
    };

    surface.addEventListener('pointermove', event => {
      if (reduceMotion.matches || !finePointer.matches || (event.pointerType && event.pointerType !== 'mouse')) return;
      const rect = surface.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        surface.classList.add('is-surface-engaged');
        surface.style.setProperty('--surface-x', `${x.toFixed(1)}%`);
        surface.style.setProperty('--surface-y', `${y.toFixed(1)}%`);
      });
    });

    surface.addEventListener('pointerleave', reset);
    surface.addEventListener('pointercancel', reset);
    surface.addEventListener('click', event => {
      if (finePointer.matches && event.pointerType === 'mouse') return;
      surface.classList.toggle('is-surface-engaged');
    });
  });

  // Micro-interaction hooks: no DOM movement that affects layout.
  document.querySelectorAll(
    '.capability-register__item, .quality-register > div, .surface-register > b'
  ).forEach(el => el.setAttribute('data-hdc-micro', 'nudge'));

  document.querySelectorAll(
    '.application-feature, .contact-stack .button, .hero__actions .button'
  ).forEach(el => el.setAttribute('data-hdc-micro', 'lift'));

  // Quote page: consume application context and keep the user editable.
  const form = document.querySelector('[data-quote-form]');
  if (form) {
    form.setAttribute('data-dynamic-quote', '');
    const params = new URLSearchParams(location.search);
    const application = params.get('application');
    const surface = params.get('surface');
    const applicationField = form.elements.application;
    const surfaceField = form.elements.surface;
    const context = document.querySelector('[data-quote-context]');
    const contextText = document.querySelector('[data-quote-context-text]');

    if (application && applicationField) {
      applicationField.value = application;
      applicationField.dispatchEvent(new Event('input', { bubbles: true }));
      applicationField.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (surface && surfaceField) {
      surfaceField.value = surface;
      surfaceField.dispatchEvent(new Event('input', { bubbles: true }));
      surfaceField.dispatchEvent(new Event('change', { bubbles: true }));
    }

    document.querySelectorAll('[data-quote-application]').forEach(button => {
      button.addEventListener('click', () => {
        const value = button.dataset.quoteApplication || '';
        if (!applicationField || !value) return;
        applicationField.value = value;
        applicationField.dispatchEvent(new Event('input', { bubbles: true }));
        applicationField.dispatchEvent(new Event('change', { bubbles: true }));
        document.querySelectorAll('[data-quote-application]').forEach(other => {
          other.setAttribute('aria-pressed', String(other === button));
        });
        if (context && contextText) {
          context.hidden = false;
          contextText.textContent = value;
        }
        if (window.hdcTrack) window.hdcTrack('quote_application_select', { application: value });
      });
    });
    if (context && contextText && (application || surface)) {
      context.hidden = false;
      const parts = [];
      if (application) parts.push(application);
      if (surface) parts.push(surface);
      contextText.textContent = parts.join(' · ');
    }
  }

  setRoute(route, false);
})();
