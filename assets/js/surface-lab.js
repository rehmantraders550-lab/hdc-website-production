(() => {
  const page = document.querySelector('.sl-page');
  const data = window.HDCSurfaceLabData;
  if (!page || !data) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');

  const rail = page.querySelector('[data-sl-decision-rail]');
  const decisionIndex = page.querySelector('[data-sl-decision-index]');
  const decisionLabel = page.querySelector('[data-sl-decision-label]');
  const decisionPrompt = page.querySelector('[data-sl-decision-prompt]');
  const decisionDetail = page.querySelector('[data-sl-decision-detail]');

  const grid = page.querySelector('[data-sl-material-grid]');
  const search = page.querySelector('#sl-material-search');
  const searchStatus = page.querySelector('#sl-search-status');
  const compareRegion = page.querySelector('[data-sl-compare-region]');
  const compareStatus = page.querySelector('[data-sl-compare-status]');

  const record = page.querySelector('[data-sl-record]');
  const recordIndex = page.querySelector('[data-sl-record-index]');
  const recordName = page.querySelector('[data-sl-record-name]');
  const recordStatus = page.querySelector('[data-sl-record-status]');
  const recordSummary = page.querySelector('[data-sl-record-summary]');
  const recordVariants = page.querySelector('[data-sl-record-variants]');
  const recordCandidates = page.querySelector('[data-sl-record-candidates]');
  const recordSignals = page.querySelector('[data-sl-record-signals]');
  const recordReview = page.querySelector('[data-sl-record-review]');
  const recordImage = page.querySelector('[data-sl-record-image]');
  const recordFallback = page.querySelector('[data-sl-record-fallback]');
  const recordFallbackName = page.querySelector('[data-sl-record-fallback-name]');
  const recordReviewLink = page.querySelector('[data-sl-record-review-link]');
  const recordServiceLink = page.querySelector('[data-sl-record-service-link]');

  const byKey = new Map(data.materials.map(item => [item.key, item]));
  const bySlug = new Map(data.materials.map(item => [item.slug, item]));
  const selected = new Set();
  let active = data.materials[0];

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  })[ch]);

  const normalized = value => String(value || '').toLowerCase().replace(/\s+/g,' ').trim();

  const reviewHref = material =>
    'request-a-quote.html?application=' + encodeURIComponent('Surface review') +
    '&surface=' + encodeURIComponent(material.name);

  function setDecision(step) {
    if (!step) return;
    rail.querySelectorAll('[data-sl-step]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.slStep === step.id));
    });
    decisionIndex.textContent = step.index;
    decisionLabel.textContent = step.label;
    decisionPrompt.textContent = step.prompt;
    decisionDetail.textContent = step.detail;
  }

  data.decisionSteps.forEach(step => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sl-decision-step';
    button.dataset.slStep = step.id;
    button.setAttribute('role','listitem');
    button.setAttribute('aria-pressed','false');
    button.innerHTML =
      '<span class="sl-decision-step__index">' + esc(step.index) + '</span>' +
      '<strong>' + esc(step.label) + '</strong>' +
      '<small>' + esc(step.prompt) + '</small>';
    button.addEventListener('click', () => setDecision(step));
    rail.appendChild(button);
  });
  setDecision(data.decisionSteps[0]);

  function materialCard(material) {
    const article = document.createElement('article');
    article.className = 'sl-material-card';
    article.dataset.recordKey = material.key;

    const media = material.image
      ? '<div class="sl-material-card__media"><img src="' + esc(material.image) + '" alt="' + esc(material.imageAlt) + '" loading="lazy"></div>'
      : '<div class="sl-material-card__media sl-material-card__media--empty">Approved material imagery pending</div>';

    article.innerHTML =
      '<div class="sl-material-card__top"><span class="sl-material-card__index">' + esc(material.index) + '</span><span class="sl-material-card__status">' + esc(material.publicStatus) + '</span></div>' +
      media +
      '<h3>' + esc(material.name) + '</h3>' +
      '<p class="sl-material-card__summary">' + esc(material.summary) + '</p>' +
      '<ul class="sl-material-card__signals">' + material.signals.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
      '<div class="sl-material-card__actions">' +
        '<button class="sl-material-card__open" type="button">Open material record</button>' +
        '<label class="sl-compare-control"><input type="checkbox" aria-label="Compare ' + esc(material.name) + '"><span>Compare</span></label>' +
      '</div>';

    const open = article.querySelector('.sl-material-card__open');
    const checkbox = article.querySelector('input[type="checkbox"]');

    open.addEventListener('click', () => {
      setActive(material, true);
    });

    checkbox.addEventListener('change', () => {
      if (checkbox.checked && selected.size >= 3) {
        checkbox.checked = false;
        compareStatus.textContent = 'You can compare up to three materials.';
        return;
      }
      if (checkbox.checked) selected.add(material.key);
      else selected.delete(material.key);
      renderCompare();
    });

    return article;
  }

  data.materials.forEach(material => grid.appendChild(materialCard(material)));

  function listInto(target, values, fallback) {
    target.innerHTML = '';
    const items = values?.length ? values : [fallback];
    items.forEach(value => {
      const li = document.createElement('li');
      li.textContent = value;
      target.appendChild(li);
    });
  }

  function setActive(material, scroll = false) {
    if (!material) return;
    active = material;

    grid.querySelectorAll('.sl-material-card').forEach(card => {
      card.classList.toggle('is-active', card.dataset.recordKey === material.key);
    });

    recordIndex.textContent = material.index;
    recordName.textContent = material.name;
    recordStatus.textContent = material.publicStatus;
    recordSummary.textContent = material.summary;
    recordVariants.textContent = material.variants;
    listInto(recordCandidates, material.candidates, 'No process candidate is shown until the exact surface is reviewed.');
    listInto(recordSignals, material.signals, 'Surface review required.');
    listInto(recordReview, material.review, 'Object / application details');

    recordReviewLink.href = reviewHref(material);
    recordServiceLink.href = material.serviceHref;
    recordServiceLink.textContent = material.serviceLabel;

    if (material.image) {
      recordImage.hidden = false;
      recordFallback.hidden = true;
      recordImage.src = material.image;
      recordImage.alt = material.imageAlt;
    } else {
      recordImage.hidden = true;
      recordFallback.hidden = false;
      recordFallbackName.textContent = material.name;
    }

    const newHash = '#surface-' + material.slug;
    if (location.hash !== newHash) history.replaceState(null,'',newHash);

    if (scroll) {
      page.querySelector('#sl-detail')?.scrollIntoView({
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }

    if (window.hdcTrack) {
      window.hdcTrack('surface_material_open', { material: material.name, record_key: material.key });
    }
  }

  function renderCompare() {
    const ids = Array.from(selected);
    compareRegion.innerHTML = '';

    [0,1,2].forEach(index => {
      const key = ids[index];
      if (!key) {
        const empty = document.createElement('div');
        empty.className = 'sl-compare-slot sl-compare-slot--empty';
        empty.innerHTML = '<div><span class="sl-slot-label">0' + (index + 1) + '</span><p>' +
          (index === 0 ? 'Select a material above.' : index === 1 ? 'Select a second material.' : 'Optional third material.') +
          '</p></div>';
        compareRegion.appendChild(empty);
        return;
      }

      const material = byKey.get(key);
      const slot = document.createElement('article');
      slot.className = 'sl-compare-slot';
      slot.innerHTML =
        '<div class="sl-compare-slot__head"><div><span class="sl-slot-label">' + esc(material.index) + '</span><h3>' + esc(material.name) + '</h3></div><button type="button" class="sl-compare-remove">Remove</button></div>' +
        '<p>' + esc(material.publicStatus) + '</p>' +
        '<ul>' + material.signals.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
        '<p><strong>Candidate routes:</strong> ' + esc(material.candidates.length ? material.candidates.join(' · ') : 'Not shown until review') + '</p>' +
        '<button type="button" class="sl-material-card__open">View record</button>';

      slot.querySelector('.sl-compare-remove').addEventListener('click', () => {
        selected.delete(material.key);
        const card = grid.querySelector('[data-record-key="' + CSS.escape(material.key) + '"]');
        const input = card?.querySelector('input[type="checkbox"]');
        if (input) input.checked = false;
        renderCompare();
      });

      slot.querySelector('.sl-material-card__open').addEventListener('click', () => setActive(material, true));
      compareRegion.appendChild(slot);
    });

    compareStatus.textContent = ids.length < 2
      ? 'Select at least two materials to compare.'
      : ids.length + ' materials selected. Comparison is descriptive and does not rank materials.';
  }

  function applySearch() {
    const q = normalized(search.value);
    let visible = 0;
    data.materials.forEach(material => {
      const haystack = normalized([
        material.name,
        material.summary,
        material.variants,
        ...material.signals,
        ...material.candidates
      ].join(' '));
      const match = !q || haystack.includes(q);
      const card = grid.querySelector('[data-record-key="' + CSS.escape(material.key) + '"]');
      if (card) card.hidden = !match;
      if (match) visible += 1;
    });
    searchStatus.textContent = q
      ? (visible ? visible + ' material' + (visible === 1 ? '' : 's') + ' shown.' : 'No direct match. Use Experimental / Unknown Surfaces if the surface is uncertain.')
      : data.materials.length + ' material families available.';
  }

  search.addEventListener('input', applySearch);

  const hashMaterial = () => {
    const match = location.hash.match(/^#surface-(.+)$/);
    if (!match) return null;
    return bySlug.get(match[1]) || null;
  };

  const initial = hashMaterial() || data.materials[0];
  setActive(initial, false);
  renderCompare();

  addEventListener('hashchange', () => {
    const material = hashMaterial();
    if (material && material !== active) setActive(material, false);
  });

  page.querySelectorAll('[data-surface-reactive]').forEach(surface => {
    let frame = 0;
    surface.addEventListener('pointermove', event => {
      if (!finePointer.matches || reduceMotion.matches || (event.pointerType && event.pointerType !== 'mouse')) return;
      const rect = surface.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        surface.style.setProperty('--surface-x', x.toFixed(1) + '%');
        surface.style.setProperty('--surface-y', y.toFixed(1) + '%');
      });
    });
  });
})();