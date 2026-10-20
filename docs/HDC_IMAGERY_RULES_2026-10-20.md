# HDC imagery system — Engineered Tactility

## Current direction

The new collection replaces the photography on all 21 current public pages, including the homepage catalogue, product detail dialogs, Surface Lab records, finishing selectors, background fallbacks and social preview images. It contains 38 original generated visual studies, including a dedicated portrait homepage image for phones. The existing HDC brand mark, typography, navigation, service architecture, quote flow and shared Jarallax behavior are retained.

## Subject rules

- Use zero bottles, glass jars, cups, mugs, tumblers or other drinkware in the new photography. Check the background as well as the primary subject.
- Show glass as flat printed panes, architectural panels or close details of print and transparent edges.
- Lead with printed results: tiles, wood panels, labels, adhesive films, packaging, stationery, posters, signage, acrylic plaques, metal tags and selected corporate gift objects.
- Use machinery to explain a production route, with plausible mechanical geometry. Never imply that equipment is for sale.
- A technical material category is not universal proof of print compatibility. Keep the existing project review and suitability boundaries.

## Photographic language

| Element | Direction |
| --- | --- |
| Composition | Architectural, asymmetric and uncluttered; one coherent camera view |
| Lighting | Directional daylight with readable midtones and natural contact shadows |
| Background | Paper `#F0EFED`, pale stone, restrained graphite `#0B1013` or charcoal `#171D21` |
| Artwork accents | Teal `#036F86`, copper `#D89A63`, white and restrained cyan |
| Material evidence | Ink boundary, fibres, grain, coating, cut edge, liner or shallow relief |
| Product framing | Approximately 75–85% of the frame; preserve object geometry and useful margins |
| Avoid | Muddy darkness, excessive metallic effects, neon glow, decorative smoke, lifestyle clutter and fabricated brands |

Use the existing editorial typography in the website. Do not bake headlines, UI controls or sales copy into photographs. Certificates remain blank illustrative formats without invented institutions, accreditations or personal identities.

## Placement and framing

| Territory | Primary subjects |
| --- | --- |
| Homepage | Canvas, geometric tile, signage, carton and flat print specimens |
| Labels & Decals | Transfer film, label rolls, kiss-cut sheets and print detail |
| Products & Objects | Acrylic plaque, notebook, metal tag, wood and rigid plastic samples |
| Packaging & Commercial Print | Carton, brochures, stationery, certificates and paper edges |
| Large Format & Environments | Architectural graphics, posters, wall vinyl and rigid display panels |
| Production | Illustrative flatbed, offset, wide-format, proof and registration studies |
| Surface Lab | Dedicated glass, acrylic, metal, ACM, wood, paperboard, polymer and film studies |
| Finishing | Gloss, foil, embossing, paper texture and cut/fold detail |
| Contact / Quote / FAQ | Print review, stock texture and sample assessment |

Use landscape 3:2 photography in standard split heroes. The new object hero retains a portrait frame and its contain fit. Glass and UV DTF heroes now use landscape frames appropriate to their new flat subjects. The homepage selects a dedicated portrait photograph below 64rem through a native picture source; media-specific preloads avoid downloading both hero images on initial phone visits.

## Provenance and claims

The new scenes are generated illustrations. Identify them as illustrative visual studies in relevant alt text and captions. Do not label them as customer-supplied photographs, completed HDC client projects, real production evidence, test results or performance certification. The Selected Work holding policy remains intact. No service claims, pricing, compatibility guarantees, client attributions or product catalogue offerings are added by this imagery refresh.

The former drinkware gallery becomes an illustrative objects and materials gallery. The glass page uses flat glass studies and a static transfer-film study in its existing media layout. The original photographs, video, historical homepage and retired route files remain stored unchanged.

## Delivery and maintenance

- Web assets: `assets/images/renewal-20261020/`. Exported WebP derivatives retain their generated source dimensions; full source PNGs remain outside the production repository.
- Asset dimensions, Git blob checksums and lifecycle status are registered in `assets/asset-manifest.json`.
- Detailed generation prompts and internal production maps remain outside this public repository.
- Use explicit image dimensions and decoding hints. Load the current hero eagerly and below-fold photography lazily where appropriate.
- Keep brand identity separate from photographic refreshes. Preserve existing source files and create versioned replacements; do not delete files for cleanup.
- Validate all public routes, dynamic product views, image loading, horizontal overflow, phone art direction, and the existing Chromium/WebKit motion and layout checks before promotion.
- Publish a review branch and preview. Production promotion follows visual validation and the normal GitHub main pipeline.

Browser tests establish loading, source selection and layout behavior. Subject exclusion also requires visual inspection of every new photograph; prompts alone are not evidence that an image meets the rule.
