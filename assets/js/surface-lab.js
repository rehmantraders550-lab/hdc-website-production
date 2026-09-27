(() => {
  const page = document.querySelector('.sl-page');
  const records = Array.isArray(window.HDC_SURFACE_LAB_MATERIALS) ? window.HDC_SURFACE_LAB_MATERIALS : [];
  if (!page || !records.length) return;

  const list = document.querySelector('[data-sl-material-list]');
  const activeRecord = document.querySelector('[data-sl-active-record]');
  const compareRegion = document.querySelector('[data-sl-compare-region]');
  const compareStatus = document.querySelector('[data-sl-compare-status]');
  const search = document.querySelector('#sl-material-search');
  const searchStatus = document.querySelector('[data-sl-search-status]');
  const decisionReadout = document.querySelector('[data-sl-decision-readout]');
  const decisionButtons = Array.from(document.querySelectorAll('[data-sl-decision-step]'));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const selected = new Set();

  const DECISIONS = [
    ['01 / Object','Identify the physical item or application before considering a production method.'],
    ['02 / Material','Confirm the material family, grade or best-known substrate description.'],
    ['03 / Coating','Identify any coating, paint, laminate, treatment or surface finish already present.'],
    ['04 / Geometry','Review form, dimensions, edges, curvature, clearance and printable area.'],
    ['05 / Environment','Clarify handling, cleaning, installation and intended use conditions.'],
    ['06 / Visual requirement','Define colour, opacity, finish, detail and the required visual behaviour.'],
    ['07 / Process candidate','Shortlist production routes without presenting an untested route as confirmed.'],
    ['08 / Validation status','Record what is known, what remains conditional and whether a sample or review is required.'],
    ['09 / Recommendation','Confirm the production route only after the project conditions and validation status are understood.']
  ];

  let activeSlug = getSlugFromHash() || records[0].slug;
  if (!records.some(function(record) { return record.slug === activeSlug; })) activeSlug = records[0].slug;

  const escapeHtml = function(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(char) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[char];
    });
  };

  const queryHref = function(record) {
    return 'request-a-quote.html?application=' + encodeURIComponent('Surface review') +
      '&surface=' + encodeURIComponent(record.name);
  };

  function getSlugFromHash() {
    const match = location.hash.match(/^#surface-(.+)$/);
    return match ? match[1] : '';
  }

  function recordBySlug(slug) {
    return records.find(function(record) { return record.slug === slug; });
  }

  function renderList(filter) {
    filter = filter || '';
    const term = filter.trim().toLowerCase();
    const visible = records.filter(function(record) {
      if (!term) return true;
      const haystack = [
        record.name,
        record.summary
      ].concat(record.variants || [])
       .concat((record.candidates || []).map(function(item) { return item[0]; }))
       .join(' ')
       .toLowerCase();
      return haystack.includes(term);
    });

    list.innerHTML = visible.map(function(record) {
      return '<button type="button" class="sl-material-row" data-sl-select="' + escapeHtml(record.slug) + '" aria-pressed="' + String(record.slug === activeSlug) + '">' +
        '<span class="sl-material-row__index">' + escapeHtml(record.index) + '</span>' +
        '<span class="sl-material-row__name">' + escapeHtml(record.name) + '</span>' +
        '<span class="sl-material-row__status" aria-hidden="true"></span>' +
      '</button>';
    }).join('');

    if (searchStatus) {
      searchStatus.textContent = term
        ? (visible.length ? visible.length + ' material' + (visible.length === 1 ? '' : 's') + ' shown.' : 'No matching material. Use Experimental / Unknown Surfaces if the surface is uncertain.')
        : records.length + ' material families available.';
    }
  }

  function renderActive(record) {
    if (!record) return;

    const variants = record.variants && record.variants.length
      ? record.variants.map(function(item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('')
      : '<li>Exact variant or coating requires review.</li>';

    const candidates = (record.candidates || []).map(function(item) {
      return '<li><span>' + escapeHtml(item[0]) + '</span><strong>' + escapeHtml(item[1]) + '</strong></li>';
    }).join('');

    const review = (record.review || []).map(function(item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');

    const media = record.image
      ? '<figure class="sl-record-media">' +
          '<img src="' + escapeHtml(record.image.src) + '" alt="' + escapeHtml(record.image.alt) + '" loading="lazy">' +
          '<figcaption>' + escapeHtml(record.name) + ' / surface study</figcaption>' +
        '</figure>'
      : '';

    activeRecord.innerHTML =
      '<div class="sl-record-top" id="surface-' + escapeHtml(record.slug) + '">' +
        '<div>' +
          '<p class="sl-record-kicker">' + escapeHtml(record.index) + ' / MATERIAL RECORD</p>' +
          '<h3>' + escapeHtml(record.name) + '</h3>' +
        '</div>' +
        '<div class="sl-record-state">' +
          '<b>' + escapeHtml(record.status) + '</b>' +
          '<span>Final process is confirmed after the exact surface and intended use are reviewed.</span>' +
        '</div>' +
      '</div>' +
      '<div class="sl-record-body' + (record.image ? '' : ' sl-record-body--no-media') + '">' +
        '<div class="sl-record-copy">' +
          '<p class="sl-record-summary">' + escapeHtml(record.summary) + '</p>' +
          '<div class="sl-evidence-grid">' +
            '<section class="sl-evidence-block"><b>Common forms / variants</b><ul>' + variants + '</ul></section>' +
            '<section class="sl-evidence-block"><b>Process candidates</b><ul class="sl-candidate-list">' + candidates + '</ul></section>' +
            '<section class="sl-evidence-block"><b>What HDC needs to review</b><ul>' + review + '</ul></section>' +
          '</div>' +
        '</div>' +
        media +
      '</div>' +
      '<div class="sl-record-actions">' +
        '<a class="button button--light" href="' + queryHref(record) + '">' + escapeHtml(record.action) + '</a>' +
        '<a href="#sl-review">Review requirements</a>' +
        '<label class="sl-compare-toggle">' +
          '<input type="checkbox" data-sl-compare="' + escapeHtml(record.key) + '"' + (selected.has(record.key) ? ' checked' : '') + '>' +
          '<span>Compare this material</span>' +
        '</label>' +
      '</div>';

    const compareInput = activeRecord.querySelector('[data-sl-compare]');
    if (compareInput) {
      compareInput.addEventListener('change', function() {
        if (compareInput.checked && selected.size >= 3) {
          compareInput.checked = false;
          if (compareStatus) compareStatus.textContent = 'You can compare up to three materials.';
          return;
        }
        if (compareInput.checked) selected.add(record.key);
        else selected.delete(record.key);
        renderComparison();
      });
    }
  }

  function renderComparison() {
    const ids = Array.from(selected);
    const selectedRecords = ids.map(function(id) {
      return records.find(function(record) { return record.key === id; });
    }).filter(Boolean);

    const cards = selectedRecords.map(function(record) {
      const candidateRows = (record.candidates || []).map(function(item) {
        return '<li><span>' + escapeHtml(item[0]) + '</span><b>' + escapeHtml(item[1]) + '</b></li>';
      }).join('');
      return '<article class="sl-compare-card">' +
        '<div class="sl-compare-card__head">' +
          '<span>' + escapeHtml(record.index) + ' / MATERIAL</span>' +
          '<button type="button" data-sl-remove-compare="' + escapeHtml(record.key) + '">Remove</button>' +
        '</div>' +
        '<h3>' + escapeHtml(record.name) + '</h3>' +
        '<p>' + escapeHtml(record.summary) + '</p>' +
        '<ul>' + candidateRows + '</ul>' +
        '<a href="#surface-' + escapeHtml(record.slug) + '">View material record</a>' +
      '</article>';
    });

    while (cards.length < 3) {
      const label = cards.length === 0 ? 'Select a material' : cards.length === 1 ? 'Select a second material' : 'Optional third material';
      cards.push('<div class="sl-compare-empty"><div><strong>' + label + '</strong><span>Choose from the Surface Explorer above.</span></div></div>');
    }

    compareRegion.innerHTML = cards.join('');

    compareRegion.querySelectorAll('[data-sl-remove-compare]').forEach(function(button) {
      button.addEventListener('click', function() {
        selected.delete(button.dataset.slRemoveCompare);
        renderComparison();
        const active = recordBySlug(activeSlug);
        if (active) renderActive(active);
      });
    });

    if (compareStatus) {
      compareStatus.textContent = ids.length < 2
        ? 'Select at least two materials to compare.'
        : ids.length + ' materials selected for comparison.';
    }
  }

  function selectRecord(slug, options) {
    options = options || {};
    const record = recordBySlug(slug);
    if (!record) return;
    activeSlug = slug;

    renderList(search ? search.value : '');
    renderActive(record);

    if (options.updateHash !== false) {
      history.replaceState(null, '', '#surface-' + record.slug);
    }

    if (options.scroll) {
      activeRecord.scrollIntoView({block:'start', behavior:reduceMotion.matches ? 'auto' : 'smooth'});
    }
  }

  list.addEventListener('click', function(event) {
    const button = event.target.closest('[data-sl-select]');
    if (!button) return;
    selectRecord(button.dataset.slSelect, {updateHash:true, scroll:false});
  });

  if (search) {
    search.addEventListener('input', function() { renderList(search.value); });
  }

  decisionButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const index = Number(button.dataset.slDecisionStep);
      const entry = DECISIONS[index];
      if (!entry) return;
      decisionButtons.forEach(function(item, i) {
        item.setAttribute('aria-pressed', String(i === index));
      });
      if (decisionReadout) {
        decisionReadout.innerHTML = '<b>' + escapeHtml(entry[0]) + '</b><span>' + escapeHtml(entry[1]) + '</span>';
      }
    });
  });

  window.addEventListener('hashchange', function() {
    const slug = getSlugFromHash();
    if (recordBySlug(slug)) selectRecord(slug, {updateHash:false, scroll:true});
  });

  renderList();
  renderActive(recordBySlug(activeSlug));
  renderComparison();
})();