/* ORVIA_COMPONENT: hdc-product-detail-v1
   Carries non-sensitive project inputs into HDC's existing editable quote form. */
(() => {
  const form = document.querySelector('[data-glass-project-brief]');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const params = new URLSearchParams();
    const application = String(values.get('application') || 'Glass surface decoration — project review').trim();
    const selectedSurface = String(values.get('surface') || 'Glass — details to confirm').trim();
    const details = String(values.get('glassDetails') || '').trim();
    const surface = details ? `${selectedSurface}; ${details}` : selectedSurface;

    params.set('application', application);
    params.set('surface', surface);
    ['quantity', 'dimensions', 'artwork', 'date'].forEach(key => {
      const value = String(values.get(key) || '').trim();
      if (value) params.set(key, value);
    });

    if (window.hdcTrack) window.hdcTrack('product_project_brief_continue', { product_family: 'glass_surface_decoration' });
    const destination = new URL(form.getAttribute('action') || 'request-a-quote.html', window.location.href);
    destination.search = params.toString();
    window.location.assign(destination.href);
  });
})();
