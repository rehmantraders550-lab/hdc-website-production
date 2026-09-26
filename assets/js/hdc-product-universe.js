(() => {
  const root = document.querySelector('[data-product-universe]');
  if (!root) return;

  const viewport = root.querySelector('[data-product-universe-viewport]');
  const tiles = [...root.querySelectorAll('.product-universe__tile')];
  const prev = root.querySelector('[data-product-universe-prev]');
  const next = root.querySelector('[data-product-universe-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!viewport || !tiles.length) return;

  const tileLeft = tile => {
    const viewportRect = viewport.getBoundingClientRect();
    const tileRect = tile.getBoundingClientRect();
    return viewport.scrollLeft + (tileRect.left - viewportRect.left);
  };

  const maxScroll = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const clamp = value => Math.max(0, Math.min(maxScroll(), value));
  const smoothBehavior = () => reduceMotion.matches ? 'auto' : 'smooth';

  const findNextIndex = () => {
    const x = viewport.scrollLeft;
    const threshold = 8;
    const index = tiles.findIndex(tile => tileLeft(tile) > x + threshold);
    return index === -1 ? tiles.length - 1 : index;
  };

  const findPreviousIndex = () => {
    const x = viewport.scrollLeft;
    const threshold = 8;
    for (let index = tiles.length - 1; index >= 0; index -= 1) {
      if (tileLeft(tiles[index]) < x - threshold) return index;
    }
    return 0;
  };

  const scrollToTile = (index, behavior = smoothBehavior()) => {
    const tile = tiles[Math.max(0, Math.min(tiles.length - 1, index))];
    if (!tile) return;
    viewport.scrollTo({ left: clamp(tileLeft(tile)), behavior });
  };

  const updateControls = () => {
    const tolerance = 2;
    if (prev) prev.disabled = viewport.scrollLeft <= tolerance;
    if (next) next.disabled = viewport.scrollLeft >= maxScroll() - tolerance;
  };

  prev?.addEventListener('click', () => scrollToTile(findPreviousIndex()));
  next?.addEventListener('click', () => scrollToTile(findNextIndex()));

  tiles.forEach(tile => {
    tile.addEventListener('focus', () => {
      const viewportRect = viewport.getBoundingClientRect();
      const tileRect = tile.getBoundingClientRect();
      const fullyVisible = tileRect.left >= viewportRect.left && tileRect.right <= viewportRect.right;
      if (!fullyVisible) {
        viewport.scrollTo({ left: clamp(tileLeft(tile)), behavior: 'auto' });
      }
    });
  });

  let frame = 0;
  viewport.addEventListener('scroll', () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateControls);
  }, { passive: true });

  window.addEventListener('resize', updateControls, { passive: true });
  reduceMotion.addEventListener?.('change', updateControls);
  updateControls();
})();
