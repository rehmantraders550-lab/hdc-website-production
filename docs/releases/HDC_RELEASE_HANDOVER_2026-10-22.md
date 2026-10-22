# HDC Release Handover · 2026-10-22

**Status:** Canonical GitHub main through PR #110, verified; snapshot created during RecordSync reconciliation.  
**Observed GitHub main:** `93e3275dba85a121bd1cbaec6bb949ce03ae6cab` (2026-10-22).  
**Last customer-facing website-source commit:** `39163b7177734b405fee834bc581f28306ed6a42` (PR #109, 2026-10-20).  
**CI proof:** [HDC Integration Guard run 39770861097](https://github.com/rehmantraders550-lab/hdc-website-production/actions/runs/39770861097) for PR #110 merge succeeded: static validation, responsive browser QA, and Worker homepage/promoted assets/redirect smoke tests all succeeded.  
**Cloudflare custom-domain visual verification:** Not independently repeated as part of this archival reconciliation. No new Cloudflare deployment ID claimed.  
**Prior Library handover:** `HDC_Recent_Development_Handover_Imran_Khilji_2026-10-20`; historically valid, must not be deleted.

## All merged changes since the previous handover

| PR | Merge SHA | Description |
| --- | --- | --- |
| [#104](https://github.com/rehmantraders550-lab/hdc-website-production/pull/104) | `6f8c80329438a6f3cb2cd0388053d32435d83162` | Guided browser-only Campaign Matcher selects marketing paths/product families and pre-fills existing enquiry; no new paid API required. |
| [#105](https://github.com/rehmantraders550-lab/hdc-website-production/pull/105) | `f5285164826802cd302e517cb4d0b51bc0544205` | Removed global floating WhatsApp shortcut; preserved contact/quote WhatsApp paths. |
| [#106](https://github.com/rehmantraders550-lab/hdc-website-production/pull/106) | `77c316acf367f55e03c7ed21afe6e39021bdc11e` | Removed requested homepage copy, markers and Artwork Map; balanced spacing. |
| [#107](https://github.com/rehmantraders550-lab/hdc-website-production/pull/107) | `9f02fb6b929d37923eca09bed1f430b45929315a` | Removed remaining screenshot-identified microcopy, keeping imagery and active campaign choices. |
| [#108](https://github.com/rehmantraders550-lab/hdc-website-production/pull/108) | `bff4c39bcb860300d6dc0fa5e3cfaa99fc80288b` | Corrected Jarallax mobile image source/crop and art-direction breakpoint handling, tested. |
| [#109](https://github.com/rehmantraders550-lab/hdc-website-production/pull/109) | `39163b7177734b405fee834bc581f28306ed6a42` | Restrained scroll depth across all homepage sections, keeping content and controls stationary and accessibility fallbacks. |
| [#110](https://github.com/rehmantraders550-lab/hdc-website-production/pull/110) | `93e3275dba85a121bd1cbaec6bb949ce03ae6cab` | Adopted zero-incremental-cost governance and mandatory PR cost-impact template; no new paid services or site UI change. |

## Locked HDC operating context

HDC is printing-services only, with no printer/equipment sales. Core services: Labels & Decals; Products & Object Printing; Packaging & Commercial Print; Large Format & Brand Environments. Homepage first service display label is **Labels & Stickers**, though the service taxonomy remains Labels & Decals.

Visual doctrine is **Engineered Tactility**, showing real print/surface/ink/material evidence. Mobile uses responsive art direction, safe crop and reduced-motion and Save-Data fallbacks. Avoid unsupported claims and generic bottle/glass-focused imagery. Website route remains GitHub main → Cloudflare Worker Static Assets → HDC Worker; separate D1/R2 or AI services are not assumed live.

**Cost limit:** PKR 0 additional approved spend. The red-warning, three-approval, audit-email policy is defined in `docs/HDC_ZERO_COST_GOVERNANCE_2026-10-22.md`. No exception is authorized. No files are deleted.

## RecordSync correction and limitations

1. Older handovers and PR #100 production-state sections are **historical**, not current.
2. The new `docs/HDC_RECORDSYNC_MANIFEST.json` records source head, last website-source commit, current handover path and Library mirror.
3. The proposed CI RecordSync gate requires a dated `docs/releases/*.md` release candidate with any material PR and warns if newer material site-source commits exceed the archived mirror anchor. It **cannot directly attest that ChatGPT Library was updated**.
4. Mirror publication requires **separate upload and readback** using an authorized Library connection; upload failures must be recorded as pending, not reported as success. Preserve all versions.
5. This handover describes **main through PR #110** only. The RecordSync implementation itself remains a PR candidate until its own review/merge and CI qualification, and the separate zero-cost billing/CI guard is scheduled for later work.

**Governance:** Smallest valid change. Maximum verification. No silent scope expansion.
