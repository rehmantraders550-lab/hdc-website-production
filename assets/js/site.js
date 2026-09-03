(() => {
  const page = document.body.dataset.page || '';
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  const navItems = [
    ['services.html', 'Services', 'services'],
    ['applications.html', 'Applications', 'applications'],
    ['selected-work.html', 'Selected work', 'work'],
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
        <div class="footer__block"><b>Explore</b><a href="services.html">Services</a><a href="applications.html">Applications</a><a href="about.html">About HDC</a><a href="faq.html">FAQ</a></div>
        <div class="footer__block"><b>Begin a project</b><a href="tel:+923177267318">0317 7267318</a><a href="mailto:REHMANTRADERS550@GMAIL.COM">REHMANTRADERS550@GMAIL.COM</a><a href="contact.html">Opp. Nayyer Mall, G.T. Road, Gujrat</a></div>
      </div>
      <div class="footer__bottom"><span>Hadi Digital Craft / Gujrat</span><span>Commercial printing services only</span></div>
    </footer>`;
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
  const form = document.querySelector('[data-quote-form]');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const fields = [['Name', 'name'], ['Company', 'company'], ['Phone / WhatsApp', 'phone'], ['Application', 'application'], ['Quantity', 'quantity'], ['Dimensions', 'dimensions'], ['Material / surface', 'surface'], ['Artwork status', 'artwork'], ['Required date', 'date'], ['Additional notes', 'notes']];
    const body = fields.map(([label, key]) => `${label}: ${data.get(key) || '—'}`).join('\n');
    const status = form.querySelector('[data-form-status]');
    status.textContent = 'Your email app is opening with the project brief filled in.';
    window.location.href = `mailto:REHMANTRADERS550@GMAIL.COM?subject=${encodeURIComponent('HDC Print Project Enquiry')}&body=${encodeURIComponent(body)}`;
  });
})();
