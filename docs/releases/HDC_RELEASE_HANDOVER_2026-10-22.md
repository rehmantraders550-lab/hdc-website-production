# HDC Release Handover and Knowledge-Mirror Reconciliation

**Project:** Hadi Digital Craft (HDC) website  
**Prepared:** 2026-10-22 (Pakistan time)  
**Repository:** [rehmantraders550-lab/hdc-website-production](https://github.com/rehmantraders550-lab/hdc-website-production)  
**Canonical branch:** `main`  
**Verified source-head SHA at reconciliation:** `93e3275dba85a121bd1cbaec6bb949ce03ae6cab`  
**Latest site/UI source commit:** `39163b7177734b405fee834bc581f28306ed6a42` (PR #109, 2026-10-20)  
**Previous Library handover:** `HDC_Recent_Development_Handover_Imran_Khilji_2026-10-20` (historical; retained)  
**Record status:** Current for the **observed canonical source through PR #110**; new subsequent PRs require renewed reconciliation.

## 1. Source hierarchy and certainty

1. Live source of truth is GitHub `main`, not an older Library document.
2. The authoritative HDC static deployment route is GitHub `main` to Cloudflare Worker Static Assets `hdc-website-production`.
3. `main` push Integration Guard run [39770861097](https://github.com/rehmantraders550-lab/hdc-website-production/actions/runs/39770861097) **completed successfully** for SHA `93e3275d...` on 2026-10-22. All three named jobs succeeded: static-site validation, responsive design-system checks, and Cloudflare Worker homepage/promoted-asset/redirect smoke tests.
4. The successful smoke tests cover the `workers.dev` production Worker endpoint. An independent visual/browser check on the custom domain for this exact release was **not** established by this reconciliation. Do not claim it happened.
5. Earlier records citing PR #100 or #103 as the latest release are valid *historical snapshots*, not current-state statements.

## 2. Verified merged changes after older Library handover

| PR | Date (UTC) | Verified merge commit | What changed |
| --- | --- | --- | --- |
| [#104](https://github.com/rehmantraders550-lab/hdc-website-production/pull/104) | 2026-10-20 15:16 | `6f8c80329438a6f3cb2cd0388053d32435d83162` | Introduced guided browser-side Campaign Matcher on homepage, matching campaign goals to product families and pre-filling the existing job brief. Does **not** require new paid AI service or endpoint. |
| [#105](https://github.com/rehmantraders550-lab/hdc-website-production/pull/105) | 2026-10-20 15:41 | `f5285164826802cd302e517cb4d0b51bc0544205` | Removed floating WhatsApp shortcut on homepage and interior pages; kept explicit WhatsApp routes in contact/quote flows. |
| [#106](https://github.com/rehmantraders550-lab/hdc-website-production/pull/106) | 2026-10-20 15:49 | `77c316acf367f55e03c7ed21afe6e39021bdc11e` | Removed specifically marked homepage intro, Material Library explanation, mockup disclaimer, process label and Artwork Map content; rebalanced spacing. |
| [#107](https://github.com/rehmantraders550-lab/hdc-website-production/pull/107) | 2026-10-20 15:54 | `9f02fb6b929d37923eca09bed1f430b45929315a` | Removed remaining screenshot-marked microcopy, while retaining images, service content and Campaign Matcher controls. |
| [#108](https://github.com/rehmantraders550-lab/hdc-website-production/pull/108) | 2026-10-20 16:43 | `bff4c39bcb860300d6dc0fa5e3cfaa99fc80288b` | Preserved mobile responsive `<picture>` art direction when Jarallax moves image nodes; repaired teardown and breakpoint behavior, added regression checks. |
| [#109](https://github.com/rehmantraders550-lab/hdc-website-production/pull/109) | 2026-10-20 18:50 | `39163b7177734b405fee834bc581f28306ed6a42` | Extended restrained image-layer scroll depth to all homepage sections; text and controls stay static; respects reduced motion, Save-Data and constrained viewports. |
| [#110](https://github.com/rehmantraders550-lab/hdc-website-production/pull/110) | 2026-10-22 11:28 | `93e3275dba85a121bd1cbaec6bb949ce03ae6cab` | Adopted HDC zero-cost governance and a pull-request cost-disclosure template; no website UI, Worker, DNS or billing changes. |

All seven PRs are independently confirmed as merged in GitHub. This handover does not conflate source integration and custom-domain browser verification.

## 3. Current HDC invariants

- **Business:** commercial printing-services only, not printer/equipment sales. Service architecture: Labels & Decals; Products & Object Printing; Packaging & Commercial Print; Large Format & Brand Environments.
- **Visual language:** Engineered Tactility, material evidence over speculative marketing claims. Avoid generic bottle/glass prop saturation and unsupported client/product outcomes.
- **Site:** 21 page/static-asset architecture under Cloudflare Workers; homepage hero → service panels → Campaign Matcher / relevant marketing content → Product Register → Surface Library → Finishing → Process → About, with subsequent closing CTA as implemented. The October 20 hero/service reorder remains; first service homepage panel reads **Labels & Stickers** (other service taxonomy retains **Labels & Decals**).
- **WhatsApp:** no floating bubble; intentional contact/quote routes preserved.
- **Campaign Matcher:** client-side rule-based marketing selector; no new billable API needed for this implementation.
- **Responsive:** independent mobile art direction, image crop preservation, touch-safe UI and reduced-motion and Save-Data fallbacks.
- **Payments:** incremental spend authorization **PKR 0**. See [`docs/HDC_ZERO_COST_GOVERNANCE_2026-10-22.md`](https://github.com/rehmantraders550-lab/hdc-website-production/blob/main/docs/HDC_ZERO_COST_GOVERNANCE_2026-10-22.md). Three separate red-warning approvals and confirmed email record required before an unavoidable paid exception; none is approved here.
- **File integrity:** never delete source or historical Library handovers; additive versioned reconciliation only.

## 4. Test and deployment evidence

- PR #104 reported Chromium 215 passes, Campaign Matcher 2 targeted passes, local references 427 with zero issues, token/build/dry-run checks passed (reported by that PR; not rerun in this archival record).
- PR #108 reported targeted Chromium parallax 54 passes (reported by PR; not rerun here).
- [Latest main-branch HDC Integration Guard](https://github.com/rehmantraders550-lab/hdc-website-production/actions/runs/39770861097) completed **successfully** with jobs `Verify responsive design system`, `Validate static site and assets`, `Verify Cloudflare candidate render` all successful. The third job checks Worker HTTP homepage, the expected static pages/assets, and legacy redirects.
- Cloudflare production deployment **ID** for PR #110 was not retrieved by this audit. Do not invent one.
- Independent custom-domain **visual** and mobile-browser post-merge checks: **not verified by this handover**.

## 5. Record drift and the correction

### Original gap
The Library's October 20 handover recorded the site before PRs #104–#110. GitHub `main` continued to change, while the snapshot remained static. Separate GitHub production-state docs still described the PR #100 release. The previous integration workflow had no verified check for the publication of a new Library handover.

### Corrective design: HDC RecordSync Gate
- **Canonical source:** GitHub main and its PR/CI evidence.
- **Current-state register:** `docs/HDC_CURRENT_PRODUCTION_STATE.md` amended to show the latest audited release and to retain the earlier #100 snapshot as history.
- **Release chronology:** this handover + additive `docs/releases/HDC_RELEASE_CANDIDATE_RECORDSYNC_2026-10-22.md` for the new sync controls.
- **Manifest:** `docs/HDC_RECORDSYNC_MANIFEST.json` links the audited source head, last website-source commit, audit evidence and uploaded Library file ID.
- **Pull-request check:** proposed `scripts/check_recordsync.py` + existing integration workflow extension verify a meaningful release record is included when technical source changes. No extra paid integrations.
- **Push-time drift audit:** compare website-content git history with manifest's recorded source snapshot; report `STALE` in GitHub Actions instead of claiming an old mirror is current. This audit cannot independently fetch ChatGPT Library; publication is explicitly confirmed by the connector readback and is **not** automatically guaranteed by GitHub Actions.
- **Historical records remain preserved**. The mirror must show which GitHub head it covers and stop claiming current after source divergence.

## 6. Separation of responsibilities / next release

- **This handover's source snapshot covers GitHub `main` through #110 only.** RecordSync code is a separate implementation candidate until its own PR is merged and validated. Once merged, record its final merge SHA and update Library snapshot metadata if website-source code changed.
- **Zero-cost spending CI guard, provider billing caps, and paid-API detection** remain a separate deferred technical task and are NOT implemented by RecordSync.
- **Do not infer** that writing a record automatically sends email or provides account spending limits.

**Handover disposition:** New versioned Library mirror is intended to supersede the older handover for source-current questions; older files are intentionally retained as historical evidence.