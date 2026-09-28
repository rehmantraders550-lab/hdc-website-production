(() => {
  const page = document.querySelector('body[data-page="production"]');
  const methods = Array.isArray(window.HDC_PRODUCTION_METHODS) ? window.HDC_PRODUCTION_METHODS : [];
  if (!page || !methods.length) return;

  const grid = document.querySelector('[data-prod-system-grid]');
  const specialistHost = document.querySelector('[data-prod-specialist]');
  const recordHost = document.querySelector('[data-prod-record]');
  const recordCode = document.querySelector('[data-prod-record-code]');
  const routeButtons = Array.from(document.querySelectorAll('[data-prod-route-step]'));
  const routeReadout = document.querySelector('[data-prod-route-readout]');
  const projectCopy = document.querySelector('[data-prod-project-copy]');
  const projectCta = document.querySelector('[data-prod-project-cta]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const ROUTING = [
    ['01 / SURFACE','Confirm the substrate or finished surface before selecting a production method.'],
    ['02 / GEOMETRY','Check whether the job is flat, curved, dimensional or constrained by machine clearance.'],
    ['03 / ARTWORK','Review reproduction requirements, opacity, colour, registration and artwork readiness.'],
    ['04 / RUN','Consider quantity, repeatability, setup requirements and production efficiency.'],
    ['05 / HANDLING','Account for finishing, installation, wear, cleaning and intended use conditions.'],
    ['06 / PROCESS','Select and validate the production method against the actual physical job.']
  ];

  const primary = methods.filter(function(method){ return method.tier === 'primary'; });
  const specialist = methods.find(function(method){ return method.tier === 'specialist'; });
  let activeSlug = slugFromHash() || primary[0].slug;
  if (!methodBySlug(activeSlug)) activeSlug = primary[0].slug;

  function escapeHtml(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(char){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[char];
    });
  }

  function slugFromHash(){
    const value = window.location.hash.replace(/^#/,'');
    return methods.some(function(method){ return method.slug === value; }) ? value : '';
  }

  function methodBySlug(slug){
    return methods.find(function(method){ return method.slug === slug; });
  }

  function quoteHref(method){
    return 'request-a-quote.html?application=' + encodeURIComponent(method.name + ' production review');
  }

  function renderSystems(){
    grid.innerHTML = primary.map(function(method){
      return '<button type="button" class="prod-system-card" data-prod-method="' + escapeHtml(method.slug) + '" aria-pressed="' + String(method.slug === activeSlug) + '">' +
        '<span class="prod-system-card__media"><img src="' + escapeHtml(method.image) + '" alt="" loading="lazy"></span>' +
        '<span class="prod-system-card__shade" aria-hidden="true"></span>' +
        '<span class="prod-system-card__body">' +
          '<span class="prod-system-card__index">' + escapeHtml(method.index) + '</span>' +
          '<span class="prod-system-card__family">' + escapeHtml(method.family) + '</span>' +
          '<h3>' + escapeHtml(method.name) + '</h3>' +
          '<p>' + escapeHtml(method.short) + '</p>' +
        '</span>' +
      '</button>';
    }).join('');

    if (specialist && specialistHost){
      specialistHost.innerHTML =
        '<span>' + escapeHtml(specialist.index) + '</span>' +
        '<strong>' + escapeHtml(specialist.name) + '</strong>' +
        '<small>' + escapeHtml(specialist.short) + '</small>' +
        '<b aria-hidden="true">→</b>';
      specialistHost.setAttribute('aria-pressed',String(specialist.slug === activeSlug));
    }
  }

  function relatedMarkup(method){
    return (method.related || []).map(function(item){
      return '<a class="text-link" href="' + escapeHtml(item[1]) + '">' + escapeHtml(item[0]) + '</a>';
    }).join('');
  }

  function renderRecord(method){
    if (!method) return;
    activeSlug = method.slug;
    if (recordCode) recordCode.textContent = method.key;

    recordHost.innerHTML =
      '<figure class="prod-record__media">' +
        '<img src="' + escapeHtml(method.image) + '" alt="' + escapeHtml(method.imageAlt) + '" loading="lazy">' +
        '<figcaption class="prod-record__media-foot"><span>' + escapeHtml(method.index) + ' / ' + escapeHtml(method.family) + '</span><span>Production evidence</span></figcaption>' +
      '</figure>' +
      '<div class="prod-record__copy">' +
        '<p class="eyebrow">PRODUCTION METHOD — ' + escapeHtml(method.index) + '</p>' +
        '<h2 id="prod-record-title">' + escapeHtml(method.name) + '</h2>' +
        '<p class="prod-record__description">' + escapeHtml(method.description) + '</p>' +
        '<div class="prod-record__facts">' +
          '<div><b>What it does</b><span>' + escapeHtml(method.what) + '</span></div>' +
          '<div><b>Best-considered applications</b><span>' + escapeHtml(method.applications) + '</span></div>' +
          '<div><b>Material & surface context</b><span>' + escapeHtml(method.material) + '</span></div>' +
          '<div><b>Suitability & review factors</b><span>' + escapeHtml(method.review) + '</span></div>' +
        '</div>' +
      '</div>' +
      '<aside class="prod-record__aside">' +
        '<div>' +
          '<b>Technical depth</b>' +
          '<div class="prod-record__meta">' +
            '<div><small>System class</small><strong>' + escapeHtml(method.tier === 'primary' ? 'Primary production system' : 'Specialist production route') + '</strong></div>' +
            '<div><small>Machine documentation</small><strong>Dedicated method guide available</strong></div>' +
            '<div><small>Related services</small><strong>' + (method.related || []).map(function(item){ return escapeHtml(item[0]); }).join(' · ') + '</strong></div>' +
          '</div>' +
        '</div>' +
        '<div class="prod-record__actions">' +
          '<a class="button button--dark" href="' + escapeHtml(method.machineGuide) + '">Open machine guide</a>' +
          '<a class="text-link" href="' + quoteHref(method) + '">Discuss this production route</a>' +
          relatedMarkup(method) +
        '</div>' +
      '</aside>';

    if (projectCopy){
      projectCopy.textContent = 'Current context: ' + method.name + '. Share the application, quantity, dimensions, surface or substrate, and artwork readiness so HDC can review whether this route fits the actual job.';
    }
    if (projectCta){
      projectCta.href = quoteHref(method);
      projectCta.textContent = 'Discuss ' + method.family;
    }
  }

  function selectMethod(slug, options){
    options = options || {};
    const method = methodBySlug(slug);
    if (!method) return;

    activeSlug = method.slug;
    renderSystems();
    renderRecord(method);

    if (options.updateHash !== false){
      history.replaceState(null,'','#' + method.slug);
    }

    if (options.scrollRecord){
      document.querySelector('#production-record').scrollIntoView({
        block:'start',
        behavior:reduceMotion.matches ? 'auto' : 'smooth'
      });
    }
  }

  grid.addEventListener('click',function(event){
    const button = event.target.closest('[data-prod-method]');
    if (!button) return;
    selectMethod(button.dataset.prodMethod,{updateHash:true,scrollRecord:false});
  });

  if (specialistHost && specialist){
    specialistHost.addEventListener('click',function(){
      selectMethod(specialist.slug,{updateHash:true,scrollRecord:false});
    });
  }

  routeButtons.forEach(function(button){
    button.addEventListener('click',function(){
      const index = Number(button.dataset.prodRouteStep);
      const entry = ROUTING[index];
      if (!entry) return;
      routeButtons.forEach(function(item,i){
        item.setAttribute('aria-pressed',String(i === index));
      });
      if (routeReadout) routeReadout.textContent = entry[0] + ' — ' + entry[1];
    });
  });

  window.addEventListener('hashchange',function(){
    const slug = slugFromHash();
    if (slug) selectMethod(slug,{updateHash:false,scrollRecord:true});
  });

  renderSystems();
  renderRecord(methodBySlug(activeSlug));

  if (slugFromHash()) {
    requestAnimationFrame(function(){
      const target = document.querySelector('#production-record');
      if (target) target.scrollIntoView({block:'start',behavior:'auto'});
    });
  }
})();