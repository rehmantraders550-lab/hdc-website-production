(() => {
  const page = document.body.dataset.page || '';
  const path = window.location.pathname || '/';
  const track = (eventName, detail = {}) => {
    const payload = { event: eventName, page_path: path, ...detail };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('hdc:track', { detail: payload }));
  };
  window.hdcTrack = track;
  track('page_view');

  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  const navItems = [
    ['services.html', 'Services', 'services'],
    ['production.html', 'Production', 'production'],
    ['applications.html', 'Applications', 'applications'],
    ['about.html', 'About HDC', 'about']
  ];
  const nav = navItems.map(([href, label, key]) => `<a href="${href}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  if (header) header.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="site-header">
      <a class="site-header__brand" href="index.html" aria-label="Hadi Digital Craft home"><span class="brand-mark">HADI</span><span class="brand-sub">DIGITAL CRAFT</span></a>
      <button class="menu-button" type="button" aria-controls="site-nav" aria-expanded="false">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation">${nav}<a class="nav-cta" href="request-a-quote.html">Request a quote</a></nav>
    </div>`;
  if (footer) footer.innerHTML = `
    <footer class="site-footer">
      <div class="footer__top">
        <div><div class="footer__statement">PRINT, ENGINEERED TO BE FELT.</div></div>
        <div class="footer__block"><b>Explore</b><a href="services.html">Services</a><a href="production.html">Production</a><a href="applications.html">Applications</a><a href="about.html">About HDC</a><a href="faq.html">FAQ</a></div>
        <div class="footer__block"><b>Begin a project</b><a href="tel:+923177267318">0317 7267318</a><a href="mailto:REHMANTRADERS550@GMAIL.COM">REHMANTRADERS550@GMAIL.COM</a><a href="contact.html">Opp. Nayyer Mall, G.T. Road, Gujrat</a></div>
      </div>
      <div class="footer__bottom"><span>Hadi Digital Craft / Gujrat</span><span>Commercial printing services only</span></div>
    </footer>`;

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
    if (href.includes('request-a-quote.html')) track('quote_cta_click', { link_label: label });
    else if (href.startsWith('https://wa.me/')) track('whatsapp_click', { link_label: label });
    else if (href.startsWith('tel:')) track('phone_click', { link_label: label });
    else if (href.startsWith('mailto:')) track('email_click', { link_label: label });
    else if (/^(labels-decals|products-object-printing|packaging-commercial-print|large-format-brand-environments)\.html(?:$|#)/.test(href)) {
      track('service_link_click', { destination: href.split('#')[0], link_label: label });
    }
  });

  const toggle = document.querySelector('.menu-button');
  const navEl = document.querySelector('.site-nav');
  if (toggle && navEl) {
    toggle.addEventListener('click', () => {
      const open = navEl.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      document.body.classList.toggle('nav-open', open);
    });
    navEl.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navEl.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
      document.body.classList.remove('nav-open');
    }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  document.querySelectorAll('[data-fan-menu]').forEach(menu => {
    const panels = Array.from(menu.querySelectorAll('.fan-segment'));
    panels.forEach(panel => {
      const summary = panel.querySelector('summary');
      const close = () => { panel.open = false; summary.focus(); };
      summary.addEventListener('click', () => {
        if (!panel.open) panels.forEach(other => { if (other !== panel) other.open = false; });
      });
      panel.querySelector('.fan-close').addEventListener('click', close);
      panel.addEventListener('keydown', event => {
        if (event.key === 'Escape' && panel.open) { event.preventDefault(); close(); }
      });
    });
  });

  const form = document.querySelector('[data-quote-form]');
  if (form) {
    const fields = [['Name', 'name'], ['Company', 'company'], ['Phone / WhatsApp', 'phone'], ['Application', 'application'], ['Quantity', 'quantity'], ['Dimensions', 'dimensions'], ['Material / surface', 'surface'], ['Artwork status', 'artwork'], ['Required date', 'date'], ['Additional notes', 'notes']];
    const buildBrief = () => {
      const data = new FormData(form);
      return fields.map(([label, key]) => `${label}: ${data.get(key) || '—'}`).join('\n');
    };
    const whatsapp = form.querySelector('[data-quote-whatsapp]');
    const updateWhatsApp = () => {
      if (!whatsapp) return;
      const message = `HDC Print Project Enquiry\n\n${buildBrief()}`;
      whatsapp.href = `https://wa.me/923177267318?text=${encodeURIComponent(message)}`;
    };
    form.addEventListener('input', updateWhatsApp);
    form.addEventListener('change', updateWhatsApp);
    updateWhatsApp();
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const body = buildBrief();
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = 'Your email app is opening with the project brief filled in. You can use the WhatsApp option instead if email is not configured on this device.';
      track('quote_email_prepare');
      window.location.href = `mailto:REHMANTRADERS550@GMAIL.COM?subject=${encodeURIComponent('HDC Print Project Enquiry')}&body=${encodeURIComponent(body)}`;
    });
  }
})();

/* HDC restrained tilt: pointer-only, reduced-motion safe, no layout shift. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const cards = Array.from(document.querySelectorAll('[data-tilt-card]'));
  if (!cards.length) return;

  const resets = [];

  cards.forEach(card => {
    const plane = card.querySelector('.application-feature__image img');
    if (!plane) return;
    const strength = Math.min(1.4, Math.max(0.6, Number(card.dataset.tiltStrength) || 1.1));
    let frame = 0;

    const isEnabled = () => !reduceMotion.matches && finePointer.matches;

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      plane.style.removeProperty('--tilt-x');
      plane.style.removeProperty('--tilt-y');
      plane.style.willChange = 'auto';
    };
    resets.push(reset);

    card.addEventListener('pointerenter', event => {
      if (!isEnabled() || (event.pointerType && event.pointerType !== 'mouse')) return;
      plane.style.willChange = 'transform';
    });

    card.addEventListener('pointermove', event => {
      if (!isEnabled() || (event.pointerType && event.pointerType !== 'mouse')) { reset(); return; }
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        plane.style.setProperty('--tilt-x', `${(-y * strength).toFixed(2)}deg`);
        plane.style.setProperty('--tilt-y', `${(x * strength).toFixed(2)}deg`);
      });
    });

    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointercancel', reset);
    card.addEventListener('blur', reset, true);
  });

  const resetAll = () => resets.forEach(reset => reset());
  reduceMotion.addEventListener?.('change', resetAll);
  finePointer.addEventListener?.('change', resetAll);
})();
