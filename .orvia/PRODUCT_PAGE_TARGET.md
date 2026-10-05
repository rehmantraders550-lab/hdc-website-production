# ORVIA Product-Page Target Record

**Workstream:** HDC product/application-page template  
**Target reference:** ChatGPT Library image **“HDC UV-DTF on glass and metal.png”** (`libfile_474dbf4beb488191abcdd2a49284b361`, generated 2026-10-05)  
**Source baseline:** `rehmantraders550-lab/hdc-website-production` / `main` / `9f5c9faaa6d7ef468ffd265caa8901800c30f996`  
**Implementation branch:** `orvia/product-page-glass-review-v1`

## Reference use

The image is the approved **end-goal layout reference** for the product-page family: the current HDC editorial hero and split application intro; proof-oriented imagery; a process register; method/specification context; and a project enquiry route. Preserve HDC typography, palette and the existing shared page shell in implementation.

The generated image is a design reference only. It is not an HDC production sample, product specification or evidence of glass compatibility. Do not reuse its copy claiming durability, adhesion, scratch/moisture/UV resistance, opacity, finishes, or general suitability. Do not present its generated artwork as client work.

## Verified constraints

- HDC glass intelligence record is provisional; it states that no HDC glass process is production-approved by that record.
- Use project-review language. Candidate methods are not approvals.
- Glass type, coating/treatment, printable face, geometry, intended use and cleaning environment need project-specific review.
- Do not promise food-contact, dishwasher/microwave, outdoor-life, structural-glazing or other durability performance without application-specific evidence.
- Visual assets in the product-page family are labeled by source as customer-supplied application references or illustrative references, never verified HDC production proof.
- The product brief carries only non-sensitive project fields to HDC's existing editable quote form; no price calculation is introduced.

## Source and file boundary

Root `/index.html` was verified at the baseline SHA and is the canonical homepage. Recursive tree inventory found no other index-like files. Keep `index.html`, global navigation, quote-form submission behavior beyond context prefill, and all unrelated files untouched.

Allowed files for this implementation:

- `glass-surface-decoration.html` (product detail page)
- `labels-decals.html` (product hero alignment only)
- `packaging-commercial-print.html` (product hero alignment only)
- `large-format-brand-environments.html` (product hero alignment only)
- `assets/css/hdc-product-page-v1.css` (shared alignment rules for the five product/application pages)
- `assets/js/hdc-product-page-v1.js` (new)
- `assets/videos/real-projects-2026-10-05/uv-printing-process-on-film.mp4` (replace the failing browser asset with the user-supplied 8-second H.264 clip)
- `assets/js/hdc-dynamic-system.js` (query prefill extension only)
- `products-object-printing.html` (product hero alignment, source label and existing glass application link)
- `.orvia/PRODUCT_PAGE_TARGET.md` (this reference and scope record)

No source deletion, homepage redesign, navigation rewrite, main-branch write, merge or production deployment is in scope.
