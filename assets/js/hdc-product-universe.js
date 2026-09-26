(() => {
  const root = document.querySelector('[data-product-universe]');
  if (!root) return;

  const viewport = root.querySelector('[data-product-universe-viewport]');
  const tiles = [...root.querySelectorAll('.product-universe__tile')];
  const prev = root.querySelector('[data-product-universe-prev]');
  const next = root.querySelector('[data-product-universe-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!viewport || !tiles.length) return;

  const leftOf = tile => tile.offsetLeft - viewport.offsetLeft;
  const maxScroll = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const clamp = value => Math.max(0, Math.min(maxScroll(), value));
  const behavior = () => reduceMotion.matches ? 'auto' : 'smooth';

  const nearestIndex = () => {
    const x = viewport.scrollLeft;
    let best = 0;
    let distance = Infinity;
    tiles.forEach((tile, index) => {
      const delta = Math.abs(leftOf(tile) - x);
      if (delta < distance) {
        distance = delta;
        best = index;
      }
    });
    return best;
  };

  const scrollToTile = index => {
    const tile = tiles[Math.max(0, Math.min(tiles.length - 1, index))];
    if (!tile) return;
    viewport.scrollTo({ left: clamp(leftOf(tile)), behavior: behavior() });
  };

  const updateControls = () => {
    const tolerance = 2;
    if (prev) prev.disabled = viewport.scrollLeft <= tolerance;
    if (next) next.disabled = viewport.scrollLeft >= maxScroll() - tolerance;
  };

  prev?.addEventListener('click', () => scrollToTile(nearestIndex() - 1));
  next?.addEventListener('click', () => scrollToTile(nearestIndex() + 1));

  tiles.forEach(tile => {
    tile.addEventListener('focus', () => {
      const viewLeft = viewport.scrollLeft;
      const viewRight = viewLeft + viewport.clientWidth;
      const tileLeft = leftOf(tile);
      const tileRight = tileLeft + tile.offsetWidth;
      if (tileLeft < viewLeft || tileRight > viewRight) {
        viewport.scrollTo({ left: clamp(tileLeft), behavior: behavior() });
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
