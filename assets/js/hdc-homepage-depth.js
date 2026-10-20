/* Gentle scroll depth across the canonical homepage's visual layers. */
(() => {
  'use strict';

  const selector = '[data-hdc-depth]';
  const root = document.documentElement;
  const supportedViewport = matchMedia('(min-width: 22.5rem)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const profiles = {
    image: { factor: 0.065, limit: 14 },
    catalogue: { factor: 0.06, limit: 8 },
    ornament: { factor: 0.04, limit: 12 },
  };
  let frame = 0;

  const eligible = () => (
    supportedViewport.matches
    && !reducedMotion.matches
    && !connection?.saveData
    && !document.hidden
  );

  function update() {
    frame = 0;
    const targets = [...document.querySelectorAll(selector)];

    if (!targets.length) {
      root.classList.remove('hdc-section-depth-enabled');
      return;
    }

    if (!eligible()) {
      root.classList.remove('hdc-section-depth-enabled');
      targets.forEach(target => {
        target.style.removeProperty('--hdc-depth-y');
        target.removeAttribute('data-hdc-depth-active');
      });
      return;
    }

    root.classList.add('hdc-section-depth-enabled');
    const viewportCenter = window.innerHeight / 2;

    targets.forEach(target => {
      const bounds = target.getBoundingClientRect();
      const visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (!visible) {
        target.style.setProperty('--hdc-depth-y', '0px');
        target.removeAttribute('data-hdc-depth-active');
        return;
      }

      const profile = profiles[target.dataset.hdcDepth] || profiles.ornament;
      const distance = viewportCenter - (bounds.top + bounds.height / 2);
      const offset = Math.max(-profile.limit, Math.min(profile.limit, distance * profile.factor));
      target.style.setProperty('--hdc-depth-y', `${offset.toFixed(2)}px`);
      target.setAttribute('data-hdc-depth-active', '');
    });
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', schedule);
  document.addEventListener('DOMContentLoaded', schedule);
  supportedViewport.addEventListener('change', schedule);
  reducedMotion.addEventListener('change', schedule);
  connection?.addEventListener?.('change', schedule);

  const dynamicMedia = new MutationObserver(schedule);
  ['#product-grid', '#surface-grid'].forEach(selector => {
    const host = document.querySelector(selector);
    if (host) dynamicMedia.observe(host, { childList: true, subtree: true });
  });

  schedule();
})();
