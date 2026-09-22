(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const gallery = document.querySelector('[data-finish-gallery]');
  if (gallery) {
    const figure = gallery.querySelector('.fe-gallery__visual');
    const image = gallery.querySelector('[data-gallery-image]');
    const kicker = gallery.querySelector('[data-gallery-kicker]');
    const caption = gallery.querySelector('[data-gallery-caption]');
    const items = Array.from(gallery.querySelectorAll('.fe-gallery__item'));
    let activeItem = items.find(item => item.classList.contains('is-active')) || items[0];
    let changeTimer = 0;

    items.forEach(item => {
      const source = item.dataset.image;
      if (source && source !== image?.getAttribute('src')) {
        const preload = new Image();
        preload.src = source;
      }
    });

    const updateGallery = (item, shouldTrack = false) => {
      if (!item || item === activeItem || !image) return;
      window.clearTimeout(changeTimer);
      items.forEach(candidate => {
        const selected = candidate === item;
        candidate.classList.toggle('is-active', selected);
        candidate.setAttribute('aria-pressed', String(selected));
      });
      activeItem = item;

      const applyContent = () => {
        image.src = item.dataset.image || image.src;
        image.alt = item.dataset.alt || '';
        if (kicker) kicker.textContent = item.dataset.kicker || '';
        if (caption) caption.textContent = item.dataset.caption || '';
        figure?.classList.remove('is-changing');
      };

      if (reduceMotion.matches) applyContent();
      else {
        figure?.classList.add('is-changing');
        changeTimer = window.setTimeout(applyContent, 140);
      }

      if (shouldTrack) window.hdcTrack?.('finish_gallery_select', { finish_intent: item.dataset.kicker || '' });
    };

    items.forEach((item, index) => {
      item.addEventListener('click', () => updateGallery(item, true));
      item.addEventListener('focus', () => updateGallery(item));
      item.addEventListener('pointerenter', event => {
        if (finePointer.matches && (!event.pointerType || event.pointerType === 'mouse')) updateGallery(item);
      });
      item.addEventListener('keydown', event => {
        let nextIndex = null;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % items.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = items.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        items[nextIndex].focus();
      });
    });
  }

  const layerExplorer = document.querySelector('[data-layer-explorer]');
  if (layerExplorer) {
    const tabs = Array.from(layerExplorer.querySelectorAll('[role="tab"]'));
    const panels = Array.from(layerExplorer.querySelectorAll('[role="tabpanel"]'));
    const shapes = Array.from(layerExplorer.querySelectorAll('[data-layer-shape]'));
    const tabList = layerExplorer.querySelector('[role="tablist"]');
    const compactLayout = window.matchMedia('(max-width: 900px)');
    const syncOrientation = () => tabList?.setAttribute('aria-orientation', compactLayout.matches ? 'horizontal' : 'vertical');
    syncOrientation();
    compactLayout.addEventListener?.('change', syncOrientation);

    const selectLayer = (tab, shouldTrack = false) => {
      if (!tab) return;
      const layer = tab.dataset.layer;
      tabs.forEach(candidate => {
        const selected = candidate === tab;
        candidate.setAttribute('aria-selected', String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.layerPanel !== layer; });
      shapes.forEach(shape => shape.classList.toggle('is-active', shape.dataset.layerShape === layer));
      if (shouldTrack) window.hdcTrack?.('production_layer_select', { artwork_layer: layer || '' });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectLayer(tab, true));
      tab.addEventListener('keydown', event => {
        const horizontal = compactLayout.matches;
        const forwardKey = horizontal ? 'ArrowRight' : 'ArrowDown';
        const backKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
        let nextIndex = null;
        if (event.key === forwardKey) nextIndex = (index + 1) % tabs.length;
        if (event.key === backKey) nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        tabs[nextIndex].focus();
        selectLayer(tabs[nextIndex]);
      });
    });
  }
})();
