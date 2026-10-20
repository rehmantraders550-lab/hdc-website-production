/* HDC / Engineered Tactility: a single image-depth treatment for editorial heroes. */
(() => {
  'use strict';

  const frames = [...document.querySelectorAll('[data-hdc-parallax]')];
  if (!frames.length) return;

  // Touch browsers can scroll normally; requiring hover/fine pointer excluded iPhones.
  // Keep only a small-width cutoff for constrained layouts, then let Jarallax follow scroll.
  const supportedViewport = matchMedia('(min-width: 22.5rem)');
  const mobileArtDirection = matchMedia('(max-width: 63.99rem)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const speeds = { home: 0.9, surface: 0.88, finish: 0.92, production: 0.9, editorial: 0.9, object: 0.94 };
  const source = '/assets/vendor/jarallax/3.1.0/jarallax.min.js';
  const responsiveSources = new WeakMap();
  let core;

  const eligible = () => supportedViewport.matches && !reducedMotion.matches && !connection?.saveData && !document.hidden;

  function loadCore() {
    if (!core) {
      core = new Promise(resolve => {
        const script = document.createElement('script');
        script.src = source;
        script.async = true;
        script.onload = () => resolve(typeof window.jarallax === 'function' ? window.jarallax : null);
        script.onerror = () => resolve(null);
        document.head.append(script);
      });
    }
    return core;
  }

  function restore(frame) {
    if (frame.jarallax) window.jarallax(frame, 'destroy');
    const saved = responsiveSources.get(frame);
    if (saved) {
      if (saved.src === null) saved.image.removeAttribute('src');
      else saved.image.setAttribute('src', saved.src);
      responsiveSources.delete(frame);
    }
    delete frame.dataset.hdcParallaxActive;
  }

  async function reconcile() {
    if (!eligible()) {
      frames.forEach(restore);
      return;
    }

    const jarallax = await loadCore();
    // A media preference or visibility change can happen while the script is in flight.
    if (!jarallax || !eligible()) return;

    frames.forEach(frame => {
      if (frame.jarallax) return;
      const image = frame.querySelector('img');
      if (!image || !Object.hasOwn(speeds, frame.dataset.hdcParallax)) return;
      if (!image.complete) {
        image.addEventListener('load', reconcile, { once: true });
        return;
      }
      if (!image.naturalWidth) return;

      try {
        // Jarallax moves the image out of <picture>. Pin its selected source while
        // enhanced, then restore the authored src when the frame is destroyed.
        if (image.parentElement?.tagName === 'PICTURE' && image.currentSrc) {
          const src = image.getAttribute('src');
          responsiveSources.set(frame, { image, src });
          if (image.currentSrc !== image.src) image.setAttribute('src', image.currentSrc);
        }
        jarallax(frame, {
          type: 'scroll',
          speed: speeds[frame.dataset.hdcParallax],
          imgElement: image,
          imgSize: getComputedStyle(image).objectFit,
          imgPosition: getComputedStyle(image).objectPosition,
          keepImg: false,
          zIndex: 0,
          containerClass: 'hdc-parallax-layer',
          disableParallax: () => !eligible(),
        });
        if (frame.jarallax?.image?.$container) frame.dataset.hdcParallaxActive = '';
      } catch {
        // Static HTML is the complete experience if the optional enhancement fails.
        restore(frame);
      }
    });
  }

  supportedViewport.addEventListener('change', reconcile);
  mobileArtDirection.addEventListener('change', () => {
    frames.forEach(restore);
    requestAnimationFrame(reconcile);
  });
  reducedMotion.addEventListener('change', reconcile);
  connection?.addEventListener?.('change', reconcile);
  document.addEventListener('visibilitychange', reconcile);
  window.addEventListener('pagehide', () => frames.forEach(restore));
  window.addEventListener('pageshow', reconcile);
  reconcile();
})();
