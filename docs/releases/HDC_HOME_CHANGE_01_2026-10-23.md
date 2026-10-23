# HDC-HOME-CHANGE-01 — Homepage header and hero position

**Status:** DRAFT IMPLEMENTATION — feature branch only; NOT merged or production deployed.  
**Date:** 2026-10-23  
**Base:** `f4dc766e426a49db75bda470bcf204048cb7401e`  
**Scope:** Homepage layout, no interior page redesign.

## Approved requirements
1. Remove the visible “Request a quote” button from the homepage sticky header only. Preserve `request-a-quote.html`, interior-page navigation, and existing quote paths.
2. Use the approved **bottom-heading** variant: the existing headline is visually bottom-left within the full-bleed hero; the two existing hero actions stay in a separate upper field. Keep the semantic heading-first DOM order, original text, typefaces, image, links, and parallax.

## Proposed files
- `index.html`: omit the homepage-only `.header-quote` anchor.
- `assets/css/hdc-system.css`: homepage-scoped flex reordering plus narrow-phone two-column header correction, without global token changes.
- `tests/design-system.spec.ts`: multi-viewport visual geometry, absence of header quote, intact CTAs, sticky mobile navigation, quote route.
- This additive versioned release note. Existing history and media remain untouched.

## Validation gates
- Static validation: `python scripts/validate_site.py`.
- Tokens: `npm run tokens:check`.
- Responsive browser verification: `npm run test:ui` (Chromium and selected WebKit), including new 320/375/390/430/768/900/1440px checks.
- Wrangler configuration: `npm run deploy -- --dry-run` (no production deployment).
- RecordSync release-note gate; ensure new material-source anchor is reconciled after owner-approved merge.
- Manual visual review on branch preview required for heading legibility, crop, mobile header, and action affordances.

## Regression / rollback
- Expected risk: mobile header grid gap, awkward upper CTA vs lower headline positioning, very narrow text clipping, and photographic contrast. Existing reduced-motion, parallax, product-search, and quote-flow behavior must remain unchanged.
- If preview fails, apply a surgical correction **on this branch only**; re-run checks. Rollback by restoring these three files to the approved base commit through an additive revert commit; no source/historical file deletion.

### 🔴 Zero-cost impact
- Incremental approved spend: **PKR 0**.
- New vendor/service/API/library/runtime network request: **none**.
- New dependencies or Workers/Cloudflare bindings: **none**.
- Free alternatives considered: existing homepage-scoped CSS; shared design-system override. Selected the latter with scoped selectors and no new asset request.
- Existing preview/CI quotas and provider billing caps: **not independently verified**; do not enable or purchase anything if quota exceeded.
- On-limit fallback: code remains in GitHub draft PR, no paid deployment or paid verification.
- Billing/payment change: **none**.
- Three administrator approvals and sent-email evidence: **not applicable** while no payment is involved; mandatory if paid escalation becomes necessary.

**Promotion gate:** Owner must explicitly approve the exact visual preview and subsequently authorize merge. A draft PR and test runs are not production approval.
