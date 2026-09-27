(() => {
  const root = document.querySelector('[data-product-universe]');
  if (!root) return;

  const viewport = root.querySelector('[data-product-universe-viewport]');
  const rows = [...root.querySelectorAll('[data-product-universe-row]')];
  const tiles = [...root.querySelectorAll('.product-universe__tile')];
  const anchors = rows[0] ? [...rows[0].querySelectorAll('.product-universe__tile')] : tiles;
  const prev = root.querySelector('[data-product-universe-prev]');
  const next = root.querySelector('[data-product-universe-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = window.matchMedia('(max-width: 759px)');

  if (!viewport || tiles.length !== 20 || rows.length !== 2 || anchors.length !== 10) return;

  const WAIT = Object.freeze({
    PREPARE: 140,
    TRAVEL: 1080,
    MAX_STAGGER: 400,
    POST_LOCK: 220,
    META: 400
  });

  let assemblyStarted = false;
  let assemblyObserver = null;
  let assemblyTimers = [];

  const setState = state => {
    root.dataset.state = state;
  };

  const clearAssemblyTimers = () => {
    assemblyTimers.forEach(window.clearTimeout);
    assemblyTimers = [];
  };

  const settleImmediately = () => {
    clearAssemblyTimers();
    root.classList.remove('is-assembly-ready');
    setState('interactive');
  };

  const runAssembly = () => {
    if (assemblyStarted) return;
    assemblyStarted = true;

    if (reduceMotion.matches || mobileLayout.matches) {
      settleImmediately();
      return;
    }

    root.classList.add('is-assembly-ready');
    setState('prepared');

    assemblyTimers.push(window.setTimeout(() => {
      setState('assembling');

      assemblyTimers.push(window.setTimeout(() => {
        setState('settled');

        assemblyTimers.push(window.setTimeout(() => {
          setState('interactive');
          requestAnimationFrame(() => {
            root.classList.remove('is-assembly-ready');
          });
        }, WAIT.POST_LOCK + WAIT.META));
      }, WAIT.TRAVEL + WAIT.MAX_STAGGER));
    }, WAIT.PREPARE));
  };

  if (reduceMotion.matches || mobileLayout.matches || !('IntersectionObserver' in window)) {
    settleImmediately();
    assemblyStarted = true;
  } else {
    root.classList.add('is-assembly-ready');
    setState('dormant');

    assemblyObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        assemblyObserver.disconnect();
        assemblyObserver = null;
        runAssembly();
      }
    }, { threshold: [0, 0.25, 0.5] });

    assemblyObserver.observe(root);
  }

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
    const index = anchors.findIndex(tile => tileLeft(tile) > x + threshold);
    return index === -1 ? anchors.length - 1 : index;
  };

  const findPreviousIndex = () => {
    const x = viewport.scrollLeft;
    const threshold = 8;

    for (let index = anchors.length - 1; index >= 0; index -= 1) {
      if (tileLeft(anchors[index]) < x - threshold) return index;
    }

    return 0;
  };

  const scrollToColumn = (index, behavior = smoothBehavior()) => {
    const tile = anchors[Math.max(0, Math.min(anchors.length - 1, index))];
    if (!tile) return;

    viewport.scrollTo({
      left: clamp(tileLeft(tile)),
      behavior
    });
  };

  const updateControls = () => {
    const tolerance = 2;
    if (prev) prev.disabled = viewport.scrollLeft <= tolerance;
    if (next) next.disabled = viewport.scrollLeft >= maxScroll() - tolerance;
  };

  prev?.addEventListener('click', () => scrollToColumn(findPreviousIndex()));
  next?.addEventListener('click', () => scrollToColumn(findNextIndex()));

  tiles.forEach(tile => {
    tile.addEventListener('focus', () => {
      const viewportRect = viewport.getBoundingClientRect();
      const tileRect = tile.getBoundingClientRect();
      const fullyVisible = tileRect.left >= viewportRect.left && tileRect.right <= viewportRect.right;

      if (!fullyVisible) {
        viewport.scrollTo({
          left: clamp(tileLeft(tile)),
          behavior: 'auto'
        });
      }
    });
  });

  let frame = 0;
  viewport.addEventListener('scroll', () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = 0;
      updateControls();
    });
  }, { passive: true });

  reduceMotion.addEventListener?.('change', event => {
    if (event.matches) settleImmediately();
  });

  mobileLayout.addEventListener?.('change', event => {
    if (event.matches) settleImmediately();
  });

  window.addEventListener('resize', updateControls, { passive: true });
  updateControls();
})();