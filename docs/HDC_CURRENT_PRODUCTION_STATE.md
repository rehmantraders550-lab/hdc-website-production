# HDC Current Production State

**Last reconciled:** 2026-10-20
**Platform:** Cloudflare Workers Static Assets
**Repository:** `rehmantraders550-lab/hdc-website-production`
**Branch:** `main`

## Locked business position

Hadi Digital Craft is a specialised commercial printing-services business. HDC does **not** sell printers, machinery, printing equipment, or printing hardware.

Core service taxonomy (dedicated service page and product-register filter):
- Labels & Decals

Homepage service-panel display label:
- Labels & Stickers (display copy only; the product family filter and dedicated Labels & Decals page retain their existing name)
- Products & Object Printing
- Packaging & Commercial Print
- Large Format & Brand Environments

Production methods remain subordinate to the service architecture: UV DTF may support labels, decals, products or objects where technically appropriate; Offset supports Packaging & Commercial Print; Large Format supports Large Format & Brand Environments. Events & Personalisation is an application category, not a core service.

## Locked visual doctrine

**Engineered Tactility**

The website should demonstrate printing through material evidence: substrate, ink, transfer, surface, pressure, registration, texture, reflection, edge definition, scale, and production precision.

Avoid machinery-sales presentation, generic futuristic printing, neon/RGB tech styling, fake smoke, particles, unsupported technical claims, and generic promotional-gift aesthetics.

## Current homepage section order — verified 2026-10-20

1. Hero (`#home`)
2. What We Print / service panels (`#services`) — immediately after the hero
3. Product Register (`#products`)
4. Surface Library (`#surfaces`)
5. Finishing (`#finishing`)
6. Process (`#process`)
7. About (`#about`)

The first service panel is titled **Labels & Stickers**. This is a homepage display-label change; the product filter and dedicated Labels & Decals service page remain named **Labels & Decals**.

## Interaction doctrine

Motion should be controlled, linear, mechanical, precise, and slow enough to inspect. Use restrained crossfades, clipped reveals, rule drawing, shallow scale settling, and controlled camera movement.

Do not use bounce, elastic easing, floating particles, excessive parallax, novelty transitions, or unnecessary 3D UI.

## Mobile doctrine

Mobile is independently composed, not a compressed desktop layout. Core copy must remain visible; no hover dependency; no accidental horizontal overflow; touch targets and media crops must be explicitly mobile-safe.

## Content / claims discipline

Do not invent production capacity, machine specifications, certifications, turnaround times, durability figures, sustainability claims, universal surface compatibility, colour tolerances, volume statistics, or client outcomes.

For selected work, use client names / logos / project imagery only where publishing permission and attribution are verified.

## Contact currently approved for implementation

- Phone / WhatsApp: 0317 7267318
- Email: REHMANTRADERS550@GMAIL.COM
- Location: Opp. Nayyer Mall, G.T. Road, Gujrat

## Recent production change — 2026-10-20

- PR [#100](https://github.com/rehmantraders550-lab/hdc-website-production/pull/100) merged to `main` as merge commit `37fa654f8ee5ded3e6236478abe1f7e3d4c3c3c3`.
- Moved the complete `#services` section directly after the homepage hero and renamed its first panel to **Labels & Stickers**.
- GitHub static-site validation and responsive browser tests passed. Cloudflare recorded production deployment `c576f046-d414-430b-a7b2-0116ba80979f` at 2026-10-20 08:58 UTC; the live homepage HTML was checked and confirmed the new order and label.
- The separately discussed mobile header wordmark adjustment was not included in PR #100 and is not recorded as deployed by this change.

## Current implementation direction

The earlier Shopify implementation language in Phase 5 is obsolete for HDC. The canonical production route is now:

`ChatGPT → GitHub pull request / main → Cloudflare Workers Static Assets → HDC Worker`

The repository `wrangler.jsonc` configures the static asset directory. The integration workflow validates the Worker build and smoke-tests the `workers.dev` deployment. Custom-domain routing is maintained separately.

The architectural, visual, interaction, responsive, evidence, and QA decisions from Phases 4–5 remain valid and should be translated into the Hostinger/custom-code stack rather than Shopify sections.

## Build sequence

1. Global design system, header, footer, CTA
2. Homepage sections 01–12
3. Reusable technology-page template
4. DTF / UV DTF / Offset / Large Format pages
5. Portfolio system with verified projects
6. Industries
7. Request a Quote flow
8. About / Contact
9. FAQ / trust proof
10. Blog / SEO after commercial core is complete
