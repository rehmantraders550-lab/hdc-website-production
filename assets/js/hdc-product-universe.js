(() => {
  const root = document.querySelector('[data-product-universe]');
  if (!root) return;

  const viewport = root.querySelector('[data-product-universe-viewport]');
  const track = root.querySelector('[data-product-universe-track]');
  const pauseButton = root.querySelector('[data-product-universe-pause]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 899px)');
  if (!viewport || !track) return;

  const originals = [...track.children];
  originals.forEach(tile => {
    const clone = tile.cloneNode(true);
    clone.setAttribute('data-product-universe-clone', '');
    clone.setAttribute('aria-hidden', 'true');
    clone.removeAttribute('role');
    clone.tabIndex = -1;
    track.append(clone);
  });

  let pausedByUser = false;
  let pausedByContext = false;
  let previousTime = 0;
  let animationFrame = 0;
  const shouldMove = () => !pausedByUser && !pausedByContext && !reduceMotion.matches && !mobile.matches;
  const halfWidth = () => track.scrollWidth / 2;

  const setPauseLabel = () => {
    const paused = pausedByUser || reduceMotion.matches || mobile.matches;
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.textContent = paused ? 'Resume movement' : 'Pause movement';
    pauseButton.disabled = reduceMotion.matches || mobile.matches;
  };
  const tick = time => {
    if (shouldMove()) {
      if (previousTime) {
        viewport.scrollLeft += (time - previousTime) * .012;
        if (viewport.scrollLeft >= halfWidth()) viewport.scrollLeft -= halfWidth();
      }
      previousTime = time;
    } else previousTime = 0;
    animationFrame = requestAnimationFrame(tick);
  };
  const scrollByTile = direction => {
    pausedByContext = true;
    viewport.scrollBy({ left: direction * Math.max(viewport.clientWidth * .72, 220), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  };

  root.querySelector('[data-product-universe-prev]')?.addEventListener('click', () => scrollByTile(-1));
  root.querySelector('[data-product-universe-next]')?.addEventListener('click', () => scrollByTile(1));
  pauseButton.addEventListener('click', () => { pausedByUser = !pausedByUser; setPauseLabel(); });
  root.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') pausedByContext = true; });
  root.addEventListener('pointerleave', () => { pausedByContext = false; });
  root.addEventListener('focusin', () => { pausedByContext = true; });
  root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) pausedByContext = false; });
  reduceMotion.addEventListener?.('change', setPauseLabel);
  mobile.addEventListener?.('change', setPauseLabel);
  setPauseLabel();
  animationFrame = requestAnimationFrame(tick);
  addEventListener('pagehide', () => cancelAnimationFrame(animationFrame), { once: true });
})();
