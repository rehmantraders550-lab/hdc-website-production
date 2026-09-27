(() => {
  const page = document.querySelector('.sl-page');
  if (!page) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cards = Array.from(document.querySelectorAll('.sl-material-card'));
  const details = Array.from(document.querySelectorAll('.sl-material-detail'));
  const tools = document.querySelector('[data-sl-tools]');
  const search = document.querySelector('#sl-material-search');
  const searchStatus = document.querySelector('#sl-search-status');
  const compareRegion = document.querySelector('[data-sl-compare-region]');
  const compareStatus = document.querySelector('[data-sl-compare-status]');

  if (tools) tools.hidden = false;

  const cardByRecord = new Map(cards.map(card => [card.dataset.recordKey, card]));
  const detailByRecord = new Map(details.map(detail => [detail.dataset.recordKey, detail]));
  const selected = new Set();

  const normalized = value => (value || '').toLowerCase().replace(/\s+/g, ' ').trim();

  // Progressive enhancement: details are fully visible without JS.
  details.forEach(detail => {
    const header = detail.querySelector('.sl-detail-header');
    if (!header) return;

    const body = document.createElement('div');
    body.className = 'sl-detail-body';
    body.id = detail.id + '-body';

    Array.from(detail.children).forEach(child => {
      if (child !== header) body.appendChild(child);
    });

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'sl-detail-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', body.id);
    toggle.textContent = 'View details';

    header.appendChild(toggle);
    detail.appendChild(body);

    const setOpen = (open, moveFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close details' : 'View details';
      body.hidden = !open;
      body.inert = !open;
      detail.classList.toggle('is-open', open);
      if (moveFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    detail.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setOpen(false, true);
      }
    });

    detail._slSetOpen = setOpen;
    setOpen(false);
  });

  const openFromHash = () => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const detail = document.getElementById(id);
    if (!detail || !detail.classList.contains('sl-material-detail')) return;
    details.forEach(item => item._slSetOpen?.(item === detail));
    requestAnimationFrame(() => {
      detail.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  };

  cards.forEach(card => {
    const recordId = card.dataset.recordKey;
    const name = card.querySelector('.sl-material-card__name')?.textContent?.trim() || 'Material';

    const compare = document.createElement('label');
    compare.className = 'sl-compare-control';
    compare.innerHTML = '<input type="checkbox"> <span>Compare</span>';
    const input = compare.querySelector('input');
    input.setAttribute('aria-label', 'Compare ' + name);
    input.dataset.compareRecord = recordId;

    const actions = card.querySelector('.sl-material-card__actions');
    if (actions) actions.appendChild(compare);

    input.addEventListener('change', () => {
      if (input.checked && selected.size >= 3) {
        input.checked = false;
        if (compareStatus) compareStatus.textContent = 'You can compare up to three materials.';
        return;
      }
      if (input.checked) selected.add(recordId);
      else selected.delete(recordId);
      renderComparison();
    });
  });

  if (search) {
    search.addEventListener('input', () => {
      const query = normalized(search.value);
      let visible = 0;
      cards.forEach(card => {
        const match = !query || normalized(card.textContent).includes(query);
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (searchStatus) {
        searchStatus.textContent = query
          ? (visible ? visible + ' material' + (visible === 1 ? '' : 's') + ' shown.' : 'No matching material. Use Experimental / Unknown Surfaces if the surface is uncertain.')
          : '8 material families available.';
      }
    });
    if (searchStatus) searchStatus.textContent = '8 material families available.';
  }

  function renderComparison() {
    if (!compareRegion) return;
    const ids = Array.from(selected);
    const slots = [0, 1, 2].map(index => {
      const id = ids[index];
      if (!id) {
        const labels = ['Select a material', 'Select a second material', 'Optional third material'];
        return '<div class="sl-compare-slot"><span>0' + (index + 1) + '</span><strong>' + labels[index] + '</strong></div>';
      }

      const card = cardByRecord.get(id);
      const name = card?.querySelector('.sl-material-card__name')?.textContent?.trim() || id;
      const summary = card?.querySelector('.sl-material-card__summary')?.textContent?.trim() || '';
      const status = card?.querySelector('.sl-material-card__status')?.textContent?.trim() || 'Assessment required';
      const detail = detailByRecord.get(id);
      const href = detail ? '#' + detail.id : '#sl-materials';

      return '<article class="sl-compare-slot sl-compare-slot--filled">' +
        '<span>0' + (index + 1) + '</span>' +
        '<h3>' + escapeHtml(name) + '</h3>' +
        '<p>' + escapeHtml(summary) + '</p>' +
        '<ul><li>Direct UV — May suit</li><li>UV-DTF — May suit</li><li>Vinyl — May suit</li></ul>' +
        '<strong>' + escapeHtml(status) + '</strong>' +
        '<a href="' + href + '">Open material record</a>' +
      '</article>';
    });
    compareRegion.innerHTML = slots.join('');
    if (compareStatus) {
      compareStatus.textContent = ids.length < 2
        ? 'Select at least two materials to compare.'
        : ids.length + ' materials selected for comparison.';
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#surface-"]');
    if (!link) return;
    const detail = document.querySelector(link.getAttribute('href'));
    if (!detail?.classList.contains('sl-material-detail')) return;
    details.forEach(item => item._slSetOpen?.(item === detail));
  });

  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
