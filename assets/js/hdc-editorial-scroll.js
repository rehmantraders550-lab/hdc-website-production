(() => {
  const body = document.body;
  if (!body || body.dataset.editorialScroll !== 'home') return;

  const sections = Array.from(document.querySelectorAll('[data-editorial-section]'));
  if (!sections.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.add('editorial-scroll-ready');

  const mark = (el, type, order) => {
    if (!el || el.hasAttribute('data-editorial-item')) return;
    el.setAttribute('data-editorial-item', type);
    el.style.setProperty('--editorial-order', String(order));
  };

  const prepareSection = section => {
    let order = 0;
    const take = (selector, type = 'content') => {
      section.querySelectorAll(selector).forEach(el => {
        if (el.closest('[data-editorial-section]') !== section) return;
        mark(el, type, order++);
      });
    };

    take('.section-index', 'index');
    take('.eyebrow, h2', 'content');
    take('.body, .lede, .text-link, .button', 'content');

    if (!section.matches('#technologies')) {
      take('figure, .process-media, .specimen-grid__visuals', 'media');
    }

    take('.capability-register__item', 'detail');
    take('.application-feature', 'detail');
    take('.surface-register', 'rule');
    take('.quality-register > div', 'detail');
    take('.reserved__box', 'content');
    take('.contact-stack', 'detail');
    take('.process-step', 'detail');
  };

  sections.forEach(prepareSection);

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    sections.forEach(section => {
      section.classList.add('is-editorial-entered');
      section.style.setProperty('--editorial-progress', '1');
    });
    return;
  }

  const entranceObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-editorial-entered');
      entranceObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  sections.forEach(section => entranceObserver.observe(section));

  let ticking = false;
  const updateProgress = () => {
    ticking = false;
    const viewport = window.innerHeight || document.documentElement.clientHeight;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const travel = viewport + rect.height;
      const passed = viewport - rect.top;
      const progress = Math.max(0, Math.min(1, passed / travel));
      section.style.setProperty('--editorial-progress', progress.toFixed(4));
    });
  };

  const requestProgress = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  };

  updateProgress();
  addEventListener('scroll', requestProgress, { passive: true });
  addEventListener('resize', requestProgress, { passive: true });

  reduceMotion.addEventListener?.('change', event => {
    if (!event.matches) return;
    sections.forEach(section => {
      section.classList.add('is-editorial-entered');
      section.style.setProperty('--editorial-progress', '1');
    });
  });
})();
