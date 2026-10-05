# HDC visual refinement v1 — 2026-10-05

Baseline: `77877cef2be9a5342d48dcb60bdb931faf083668`.
Canonical homepage: root `/index.html`; inventory contains 22 root HTML routes and no other index-like source.
Scope: whole-site visual refinement authorized by the user after the metadata-only PR. Supersedes the earlier product-only file boundary for this workstream. No files deleted. No automatic merge or deployment.

## Design authority

Preserve Engineered Tactility, current HDC Display / Sans / Mono fonts, existing section order, production claims and interactions. Design variance 5, motion 2, density 5. Palette: #0B1013, #171D21, #036F86, #47C1C7, #7D4E2C, #D89A63, #F0EFED, #FFFFFF, #A9B3B7. `docs/design.md` is historical, not the authority for new palette/type changes.
Approved product-page image remains a layout reference, never production evidence. Customer photographs retain provenance labels. No invented compatibility or durability claims.

## Component ownership

- `hdc-sitewide-symmetry-v1.css`: shared shell (1320px including gutters, 1240px content at maximum), section rhythm, readable measures, footer rails and focus.
- `hdc-page-hero-media-v1.css`: all split visual heroes, their columns, heading scale, image ratio and captions. One image per split hero; no competing background image.
- `hdc-product-page-v1.css`: product gallery, full-object fit, glass intro, brief and process video.
- Specialist page files retain their bespoke interactions and structure.

## Implemented parameters

- Shell gutters: 20–40px; mobile 20px.
- Section rhythm: 64–112px; mobile 68px under existing breakpoint.
- Split hero stacks at 900px, image below copy; portrait frame max 448px on narrow screens.
- Landscape 3:2, environment 16:9, whole-object 3:4 contain.
- Captions occupy their own normal-flow row; no artwork occlusion.
- Hero heading: 44–88px desktop, 40–72px narrow; line height 1.02.
- Glass gallery: three equal portrait columns, single column below 600px.
- Object gallery: three columns, two below 900px.
- Visible Powered by ORVIA footer and `data-orvia-refinement` provenance marker.

## Validation status

Static local references and image integrity: passed (357 references, zero warnings).
Responsive browser evidence and review status are recorded in the accompanying QA record. Source implementation is not production deployment.
