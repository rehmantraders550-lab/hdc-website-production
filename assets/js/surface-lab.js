(() => {
  const page = document.querySelector('.sl-page');
  const records = Array.isArray(window.HDC_SURFACE_LAB_MATERIALS) ? window.HDC_SURFACE_LAB_MATERIALS : [];
  if (!page || !records.length) return;

  const list = document.querySelector('[data-sl-material-list]');
  const recordHost = document.querySelector('[data-sl-active-record]');
  const recordCode = document.querySelector('[data-sl-record-code]');
  const compareRegion = document.querySelector('[data-sl-compare-region]');
  const compareStatus = document.querySelector('[data-sl-compare-status]');
  const compareAction = document.querySelector('[data-sl-compare-action]');
  const search = document.querySelector('#sl-material-search');
  const searchStatus = document.querySelector('[data-sl-search-status]');
  const decisionReadout = document.querySelector('[data-sl-decision-readout]');
  const decisionButtons = Array.from(document.querySelectorAll('[data-sl-decision-step]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const DECISIONS = [
    ['01 / OBJECT','Identify the physical item before considering a production route.'],
    ['02 / MATERIAL','Confirm the material family, grade or best-known substrate description.'],
    ['03 / COATING','Identify any coating, paint, laminate, treatment or surface finish already present.'],
    ['04 / GEOMETRY','Review form, dimensions, edges, curvature, clearance and printable area.'],
    ['05 / ENVIRONMENT','Clarify handling, cleaning, installation and intended use conditions.'],
    ['06 / VISUAL REQUIREMENT','Define colour, opacity, finish, detail and the required visual behaviour.'],
    ['07 / PROCESS CANDIDATE','Shortlist possible routes without treating an untested route as confirmed.'],
    ['08 / VALIDATION STATUS','Record what is known, what remains conditional and whether testing is required.'],
    ['09 / RECOMMENDATION','Confirm the route only after the project conditions and validation status are understood.']
  ];

  const TAGLINES = {
    'glass':'Transparent and coated glass surfaces.',
    'acrylic':'Clear and coloured acrylic surfaces.',
    'coated-metal':'Painted, powder-coated and treated metal surfaces.',
    'acm':'Composite panel and architectural display surfaces.',
    'pvc':'Foam-board and rigid PVC surfaces.',
    'wood':'Natural and engineered board surfaces.',
    'rigid-plastics':'ABS, PET, PC and other rigid polymer surfaces.',
    'unknown':'Unconfirmed, mixed or unidentified surfaces.'
  };

  const selected = new Set(records.slice(0,3).map(function(record){ return record.key; }));
  let activeSlug = getSlugFromHash() || records[0].slug;
  if (!recordBySlug(activeSlug)) activeSlug = records[0].slug;

  function escapeHtml(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(char){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[char];
    });
  }

  function getSlugFromHash(){
    const match = window.location.hash.match(/^#surface-(.+)$/);
    return match ? match[1] : '';
  }

  function recordBySlug(slug){
    return records.find(function(record){ return record.slug === slug; });
  }

  function shortCopy(record){
    const base = record.summary || '';
    const first = base.split(/[.!?]/)[0].trim();
    return first.length > 66 ? first.slice(0,63).trimEnd() + '…' : first + (first ? '.' : '');
  }

  function reviewHref(record){
    return 'request-a-quote.html?application=' + encodeURIComponent('Surface review') +
      '&surface=' + encodeURIComponent(record.name);
  }

  function renderMaterials(filter){
    const term = (filter || '').trim().toLowerCase();
    const visible = records.filter(function(record){
      if (!term) return true;
      const haystack = [record.name,record.summary]
        .concat(record.variants || [])
        .concat((record.candidates || []).map(function(item){ return item[0]; }))
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });

    list.innerHTML = visible.map(function(record){
      return '<button type="button" class="sl-material-card" data-sl-select="' + escapeHtml(record.slug) + '" aria-pressed="' + String(record.slug === activeSlug) + '">' +
        '<span class="sl-material-card__media"><img src="' + escapeHtml(record.thumb) + '" alt="' + escapeHtml(record.thumbAlt || '') + '" loading="lazy"></span>' +
        '<span class="sl-material-card__index">' + escapeHtml(record.index) + '</span>' +
        '<span class="sl-material-card__copy"><strong>' + escapeHtml(record.name) + '</strong><span>' + escapeHtml(shortCopy(record)) + '</span></span>' +
        '<span class="sl-material-card__arrow" aria-hidden="true">→</span>' +
      '</button>';
    }).join('');

    if (searchStatus){
      searchStatus.textContent = term
        ? (visible.length ? visible.length + ' material' + (visible.length === 1 ? '' : 's') + ' shown.' : 'No matching material. Use Experimental / Unknown Surfaces if the material is uncertain.')
        : records.length + ' material families available.';
    }
  }

  function galleryMarkup(record){
    const img = record.image || (record.thumb ? {src:record.thumb,alt:record.thumbAlt || record.name + ' surface study'} : null);
    if (!img){
      return '<div class="sl-record-main"><div class="sl-record-placeholder">' + escapeHtml(record.name) + ' / visual evidence pending</div></div>';
    }

    const positions = ['50% 50%','28% 50%','72% 50%','50% 28%'];
    return '<div class="sl-record-main"><img data-sl-main-image src="' + escapeHtml(img.src) + '" alt="' + escapeHtml(img.alt) + '"></div>' +
      '<div class="sl-record-thumbs" aria-label="Material image views">' +
      positions.map(function(pos,index){
        return '<button type="button" class="sl-record-thumb" data-sl-thumb="' + escapeHtml(pos) + '" aria-pressed="' + String(index === 0) + '" aria-label="View ' + (index + 1) + '">' +
          '<img src="' + escapeHtml(img.src) + '" alt="" aria-hidden="true" style="object-position:' + escapeHtml(pos) + '">' +
        '</button>';
      }).join('') +
      '</div>';
  }

  function renderRecord(record){
    if (!record) return;
    activeSlug = record.slug;
    if (recordCode) recordCode.textContent = record.key;

    const variants = (record.variants && record.variants.length ? record.variants : ['Exact variant or coating requires review.'])
      .slice(0,5)
      .map(function(item){ return '<li>' + escapeHtml(item) + '</li>'; })
      .join('');

    const review = (record.review || [])
      .slice(0,5)
      .map(function(item){ return '<li>' + escapeHtml(item) + '</li>'; })
      .join('');

    const processRows = (record.candidates || []).map(function(item){
      return '<div class="sl-process-row"><span>' + escapeHtml(item[0]) + '</span><span class="sl-process-state">' + escapeHtml(item[1]) + '</span></div>';
    }).join('');

    recordHost.innerHTML =
      '<div class="sl-record-gallery">' +
        galleryMarkup(record) +
      '</div>' +
      '<div class="sl-record-info">' +
        '<p class="sl-record-kicker">MATERIAL FAMILY</p>' +
        '<h2 id="sl-record-heading">' + escapeHtml(record.name) + '</h2>' +
        '<p class="sl-record-subtitle">' + escapeHtml(TAGLINES[record.slug] || 'Surface family under review.') + '</p>' +
        '<p class="sl-record-summary">' + escapeHtml(record.summary) + '</p>' +
        '<div class="sl-record-facts">' +
          '<div><b>Common forms / variants</b><ul>' + variants + '</ul></div>' +
          '<div><b>Review inputs</b><ul>' + review + '</ul></div>' +
        '</div>' +
      '</div>' +
      '<aside class="sl-record-process" aria-label="Process suitability">' +
        '<b>Process suitability</b>' +
        '<div class="sl-process-list">' + processRows + '</div>' +
        '<details class="sl-record-notes"><summary>View technical notes</summary><ul>' +
          '<li>Suitability remains conditional until the exact material, coating, geometry and intended use are reviewed.</li>' +
          '<li>Sample testing may be required before production.</li>' +
        '</ul></details>' +
        '<div class="sl-record-actions">' +
          '<a class="button button--dark" href="' + reviewHref(record) + '">' + escapeHtml(record.action) + ' <span aria-hidden="true">→</span></a>' +
          '<a class="sl-text-action" href="' + reviewHref(record) + '">Send your ' + escapeHtml(record.name.toLowerCase()) + ' sample for review</a>' +
          '<label class="sl-compare-toggle"><input type="checkbox" data-sl-compare="' + escapeHtml(record.key) + '"' + (selected.has(record.key) ? ' checked' : '') + '><span>Compare this material</span></label>' +
        '</div>' +
      '</aside>';

    recordHost.querySelectorAll('[data-sl-thumb]').forEach(function(button){
      button.addEventListener('click',function(){
        const main = recordHost.querySelector('[data-sl-main-image]');
        if (!main) return;
        main.style.objectPosition = button.dataset.slThumb;
        recordHost.querySelectorAll('[data-sl-thumb]').forEach(function(item){
          item.setAttribute('aria-pressed',String(item === button));
        });
      });
    });

    const compareInput = recordHost.querySelector('[data-sl-compare]');
    if (compareInput){
      compareInput.addEventListener('change',function(){
        if (compareInput.checked && selected.size >= 3){
          compareInput.checked = false;
          if (compareStatus) compareStatus.textContent = 'You can compare up to three materials.';
          return;
        }
        if (compareInput.checked) selected.add(record.key);
        else selected.delete(record.key);
        renderCompare();
      });
    }
  }

  function renderCompare(){
    const chosen = Array.from(selected)
      .map(function(key){ return records.find(function(record){ return record.key === key; }); })
      .filter(Boolean);

    const chips = chosen.map(function(record){
      return '<article class="sl-compare-chip">' +
        '<img src="' + escapeHtml(record.thumb) + '" alt="">' +
        '<strong>' + escapeHtml(record.name) + '</strong>' +
        '<button type="button" data-sl-remove-compare="' + escapeHtml(record.key) + '" aria-label="Remove ' + escapeHtml(record.name) + ' from comparison">×</button>' +
      '</article>';
    });

    chips.push('<button type="button" class="sl-compare-add" data-sl-add-material><span aria-hidden="true">＋</span> Add another material</button>');
    compareRegion.innerHTML = chips.join('');

    compareRegion.querySelectorAll('[data-sl-remove-compare]').forEach(function(button){
      button.addEventListener('click',function(){
        selected.delete(button.dataset.slRemoveCompare);
        renderCompare();
        const active = recordBySlug(activeSlug);
        if (active) renderRecord(active);
      });
    });

    const addButton = compareRegion.querySelector('[data-sl-add-material]');
    if (addButton){
      addButton.disabled = selected.size >= 3;
      addButton.addEventListener('click',function(){
        const next = records.find(function(record){ return !selected.has(record.key); });
        if (!next) return;
        if (selected.size < 3) selected.add(next.key);
        renderCompare();
        renderRecord(recordBySlug(activeSlug));
      });
    }

    if (compareStatus){
      compareStatus.textContent = chosen.length < 2
        ? 'Select at least two materials to compare.'
        : chosen.length + ' materials selected.';
    }
  }

  function renderCompareDetail(){
    let detail = document.querySelector('[data-sl-compare-detail]');
    if (!detail){
      detail = document.createElement('div');
      detail.className = 'sl-compare-detail';
      detail.setAttribute('data-sl-compare-detail','');
      document.querySelector('.sl-compare-layout').insertAdjacentElement('afterend',detail);
    }

    const chosen = Array.from(selected)
      .map(function(key){ return records.find(function(record){ return record.key === key; }); })
      .filter(Boolean);

    if (chosen.length < 2){
      if (compareStatus) compareStatus.textContent = 'Select at least two materials before comparing.';
      detail.hidden = true;
      return;
    }

    detail.innerHTML = '<div class="sl-compare-detail-grid">' + chosen.map(function(record){
      const rows = (record.candidates || []).map(function(item){
        return escapeHtml(item[0]) + ' — ' + escapeHtml(item[1]);
      }).join('<br>');
      return '<article><h3>' + escapeHtml(record.name) + '</h3><p>' + rows + '<br><br><strong>' + escapeHtml(record.status) + '</strong></p></article>';
    }).join('') + '</div>';
    detail.hidden = false;
    detail.scrollIntoView({block:'nearest',behavior:reduceMotion.matches ? 'auto' : 'smooth'});
  }

  function selectRecord(slug,options){
    options = options || {};
    const record = recordBySlug(slug);
    if (!record) return;
    activeSlug = record.slug;
    renderMaterials(search ? search.value : '');
    renderRecord(record);

    if (options.updateHash !== false){
      history.replaceState(null,'','#surface-' + record.slug);
    }
    if (options.scrollRecord){
      document.querySelector('#sl-record').scrollIntoView({block:'start',behavior:reduceMotion.matches ? 'auto' : 'smooth'});
    }
  }

  list.addEventListener('click',function(event){
    const card = event.target.closest('[data-sl-select]');
    if (!card) return;
    selectRecord(card.dataset.slSelect,{updateHash:true,scrollRecord:false});
  });

  if (search){
    search.addEventListener('input',function(){ renderMaterials(search.value); });
  }

  decisionButtons.forEach(function(button){
    button.addEventListener('click',function(){
      const index = Number(button.dataset.slDecisionStep);
      const entry = DECISIONS[index];
      if (!entry) return;
      decisionButtons.forEach(function(item,i){
        item.setAttribute('aria-pressed',String(i === index));
      });
      if (decisionReadout) decisionReadout.textContent = entry[0] + ' — ' + entry[1];
    });
  });

  if (compareAction){
    compareAction.addEventListener('click',function(event){
      event.preventDefault();
      renderCompareDetail();
    });
  }

  window.addEventListener('hashchange',function(){
    const slug = getSlugFromHash();
    if (recordBySlug(slug)) selectRecord(slug,{updateHash:false,scrollRecord:true});
  });

  renderMaterials();
  renderRecord(recordBySlug(activeSlug));
  renderCompare();
})();