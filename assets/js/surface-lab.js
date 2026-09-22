(() => {
  const explorer = document.querySelector('[data-surface-explorer]');
  if (!explorer) return;
  const tabs = Array.from(explorer.querySelectorAll('[data-sl-tab]'));
  const panels = Array.from(explorer.querySelectorAll('[data-sl-panel]'));
  function select(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.slPanel !== tab.dataset.slTab; });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let target = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[target], true);
    });
  });
  select(tabs[0]);
})();
