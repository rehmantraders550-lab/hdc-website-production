(() => {
  'use strict';

  const roots = document.querySelectorAll('[data-hdc-expanding-panels]');

  roots.forEach((root) => {
    if (root.dataset.ready === 'true') return;
    root.dataset.ready = 'true';

    const panels = [...root.querySelectorAll('[data-hdc-panel]')];
    let activePanel = null;

    const setState = (panel, expanded) => {
      const trigger = panel.querySelector('[data-hdc-panel-trigger]');
      const content = panel.querySelector('[data-hdc-panel-content]');
      panel.classList.toggle('is-active', expanded);
      trigger?.setAttribute('aria-expanded', String(expanded));
      content?.setAttribute('aria-hidden', String(!expanded));
    };

    const closeActive = ({ restoreFocus = false } = {}) => {
      if (!activePanel) return;
      const previous = activePanel;
      activePanel = null;
      setState(previous, false);
      root.classList.remove('is-interacting');
      if (restoreFocus) previous.querySelector('[data-hdc-panel-trigger]')?.focus({ preventScroll: true });
    };

    const openPanel = (panel) => {
      if (!panel || panel === activePanel) return;
      if (activePanel) setState(activePanel, false);
      activePanel = panel;
      setState(panel, true);
      root.classList.add('is-interacting');

      if (window.matchMedia('(max-width: 899px)').matches) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
      }
    };

    panels.forEach((panel, index) => {
      const trigger = panel.querySelector('[data-hdc-panel-trigger]');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        if (panel === activePanel) closeActive();
        else openPanel(panel);
      });

      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeActive({ restoreFocus: true });
          return;
        }

        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          const step = event.key === 'ArrowRight' ? 1 : -1;
          const next = panels[(index + step + panels.length) % panels.length];
          next.querySelector('[data-hdc-panel-trigger]')?.focus();
        }
      });
    });

    root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && activePanel) {
        event.preventDefault();
        closeActive({ restoreFocus: true });
      }
    });

    document.addEventListener('pointerdown', (event) => {
      if (activePanel && !root.contains(event.target)) closeActive();
    });
  });
})();