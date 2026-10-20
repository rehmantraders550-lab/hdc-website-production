(() => {
  'use strict';
  const root = document.querySelector('[data-campaign-match]');
  if (!root) return;
  const story = root.querySelector('[data-sms-root]');
  const steps = [...story.querySelectorAll('[data-sms-step]')];
  const entries = [...story.querySelectorAll('[data-sms-entry]')];
  const images = [...story.querySelectorAll('.campaign-match__media')];
  const counter = story.querySelector('[data-sms-counter]');
  const title = root.querySelector('[data-campaign-result-title]');
  const copy = root.querySelector('[data-campaign-result-copy]');
  const productLink = root.querySelector('[data-campaign-products]');
  const briefButton = root.querySelector('[data-campaign-brief]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const goals = [
    { title: 'Product labels, packaging or object print', copy: 'Choose the product and where its identity needs to appear. HDC can review the material, artwork and application together.', family: 'Labels & Decals', application: 'Labels, stickers, packaging or object printing' },
    { title: 'Promotional print for a campaign', copy: 'Explore print for the offer, its format and where customers will see it. The right route depends on scale, location and use.', family: 'Packaging & Commercial Print', application: 'Promotional campaign print' },
    { title: 'Packaging and printed details', copy: 'Bring the pack, inserts and supporting print into one brief. Stock, artwork and finishing are reviewed together.', family: 'Packaging & Commercial Print', application: 'Packaging and commercial print' },
    { title: 'Large-format print for a place', copy: 'Start with the location, viewing distance and installation context. HDC can review the surface and project scope.', family: 'Large Format & Brand Environments', application: 'Large format and brand environments' }
  ];
  if (!steps.length || entries.length !== steps.length || images.length !== steps.length || goals.length !== steps.length) return;

  let active = 0;
  let tween;
  const setActive = index => {
    if (index < 0 || index >= steps.length) return;
    active = index;
    entries.forEach((entry, i) => {
      entry.classList.toggle('is-active', i === index);
      entry.setAttribute('aria-pressed', String(i === index));
    });
    images.forEach((image, i) => image.classList.toggle('is-active', i === index));
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
    title.textContent = goals[index].title;
    copy.textContent = goals[index].copy;
    productLink.dataset.family = goals[index].family;
    productLink.href = '#products';
    briefButton.dataset.application = goals[index].application;
  };
  const usable = index => images[index]?.complete && images[index]?.naturalWidth > 0;
  const staticSwap = index => {
    if (!usable(index)) { setActive(index); return; }
    const gsap = window.gsap;
    if (gsap && tween) tween.kill();
    images.forEach((image, i) => {
      image.style.opacity = i === index ? '1' : '0';
      image.style.zIndex = i === index ? '1' : '0';
      image.style.clipPath = 'inset(0)';
      image.style.transform = 'none';
      image.style.removeProperty('will-change');
    });
    setActive(index);
  };
  const animateSwap = index => {
    if (index === active || !usable(index)) return;
    const previous = active;
    if (!window.gsap || reduceMotion.matches) { staticSwap(index); return; }
    const gsap = window.gsap;
    const incoming = images[index];
    const outgoing = images[previous];
    if (tween) tween.kill();
    gsap.set(images, { autoAlpha: 0, zIndex: 0, clipPath: 'inset(0)', scale: 1, yPercent: 0 });
    gsap.set(outgoing, { autoAlpha: 1, zIndex: 1 });
    gsap.set(incoming, { autoAlpha: 1, zIndex: 2, scale: 1.045, clipPath: index > previous ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)' });
    setActive(index);
    const clip = CSS.supports('clip-path', 'inset(0)');
    tween = gsap.timeline({ defaults: { duration: .55, ease: 'power2.inOut' }, onComplete: () => {
      gsap.set(outgoing, { autoAlpha: 0, zIndex: 0, scale: 1, yPercent: 0 });
      gsap.set(incoming, { autoAlpha: 1, zIndex: 1, scale: 1, clipPath: 'inset(0)' });
      tween = null;
    } });
    if (clip) tween.to(incoming, { clipPath: 'inset(0)' }, 0);
    else tween.fromTo(incoming, { autoAlpha: 0 }, { autoAlpha: 1, duration: .35 }, 0);
    tween.to(incoming, { scale: 1, duration: .75, ease: 'power1.out' }, 0);
  };

  entries.forEach((entry, index) => {
    entry.addEventListener('click', () => {
      animateSwap(index);
      if (!story.classList.contains('is-enhanced')) staticSwap(index);
      if (window.matchMedia('(max-width: 760px)').matches) {
        images[index].scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'nearest' });
      }
    });
  });
  productLink.addEventListener('click', () => {
    const allFilters = [...document.querySelectorAll('#family-filters .filter-chip')];
    const match = allFilters.find(button => button.textContent.trim() === goals[active].family);
    if (match) match.click();
  });
  briefButton.addEventListener('click', () => {
    const dialog = document.querySelector('#brief-dialog');
    const form = document.querySelector('#brief-form');
    if (!dialog || !form || typeof dialog.showModal !== 'function') return;
    form.reset();
    document.querySelector('#brief-result').hidden = true;
    document.querySelector('#brief-kicker').textContent = 'CAMPAIGN ENQUIRY / HDC';
    document.querySelector('#brief-title').textContent = 'Build a job brief.';
    const product = document.querySelector('#brief-product');
    product.readOnly = false;
    product.value = goals[active].application;
    const details = form.elements.namedItem('details');
    details.value = `Campaign goal: ${entries[active].querySelector('.campaign-match__title').textContent.trim()}`;
    dialog.showModal();
  });

  const imagesReady = Promise.all(images.map(image => image.decode ? image.decode().catch(() => null) : Promise.resolve()));
  imagesReady.then(() => {
    if (reduceMotion.matches || images.some((_, index) => !usable(index)) || !window.gsap || !window.ScrollTrigger) return;
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);
      story.classList.add('is-enhanced');
      window.gsap.set(images, { autoAlpha: 0, zIndex: 0, clipPath: 'inset(0)', scale: 1 });
      window.gsap.set(images[0], { autoAlpha: 1, zIndex: 1 });
      steps.forEach((step, index) => window.ScrollTrigger.create({
        trigger: step,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateSwap(index),
        onEnterBack: () => animateSwap(index)
      }));
      const refresh = () => window.ScrollTrigger.refresh();
      window.addEventListener('load', refresh, { once: true });
      window.addEventListener('pageshow', refresh);
      document.fonts?.ready.then(refresh).catch(() => {});
    } catch (error) {
      story.classList.remove('is-enhanced');
      staticSwap(active);
      console.error('HDC campaign interaction fell back to static mode:', error);
    }
  });
  setActive(0);
})();
