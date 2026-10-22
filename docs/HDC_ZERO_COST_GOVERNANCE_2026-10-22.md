# HDC Zero-Cost Governance Adoption Record
**Date:** 2026-10-22  
**State:** REVIEW CANDIDATE — not merged, not deployed, no billing modifications  
**Project:** Hadi Digital Craft / https://hadidigitalcraft.com  
**Baseline:** `39163b7177734b405fee834bc581f28306ed6a42`  
**Cross-project authority:** ORVIA `standards/ORVIA_ZERO_COST_GOVERNANCE_PROTOCOL_v1.0.md` (pending independent adoption in ORVIA).

## HDC decision
- Maximum approved **incremental** expenditure: **PKR 0**.
- Keep the existing Cloudflare Workers Static Assets site, existing domain, GitHub CI, and browser-based guided Campaign Matcher. No new AI APIs, paid databases, queues, per-request services, paid frontend components, or automatic billing activation.
- First verify reuse, open-source/browser-native, and free-tier alternatives. Verify actual license, account limits, and conditions before calling a tool free.
- If a requirement cannot be delivered safely at zero additional expense: **STOP THAT PAID STEP**, not the whole website. Preserve existing site behavior.
- Require **three separate administrator approvals**, each displaying **🔴 PAID SERVICE WARNING — NO PURCHASE AUTHORIZED**. Approval 1: investigate necessity and free alternatives. Approval 2: explicitly review cost/overage/cap. Approval 3: authorize exact vendor, maximum PKR amount, duration and scope. Short “OK” is not consent to spend.
- After final approval, an email audit containing decision details **must be confirmed sent to the administrator's verified intended email address before paid activation**; until confirmed, halt. A public company email is not an assumed recipient. Payments and account billing changes remain administrator-only.
- Require provider-side account spending limits/hard caps wherever possible; a budget alert alone is not enforcement. If pricing, region, quota or licensing is unclear, classify as UNKNOWN_COST and stop that operation.
- No historical file deletion or automated cleanup. No paid service has been approved in this record.

## Cost declaration for each proposed HDC PR
Include an explicit section in its PR description:
```markdown
### 🔴 Zero-cost impact
- Incremental cost: PKR 0 / UNKNOWN / POSSIBLY PAID
- New vendor, service, pricing tier, license or metered API: none / details
- Two free alternatives considered: ...
- Existing plan/quotas verified (date/source): ...
- On-limit behavior / fallback: ...
- Billing or payment modification: none / BLOCKED
- Three administrator approvals + sent-email evidence: NOT APPLICABLE / BLOCKED UNTIL COMPLETE
```
The automated cost guard can only recognize known high-risk file changes and strings; human review and account-level hard limits remain necessary.

## Change record (append-only historical context)
Current GitHub `main` through PR #109 (2026-10-20) includes the guided Campaign Matcher, removal of floating WhatsApp, trimmed homepage microcopy, image crop correction and scroll depth across the homepage. Older 2026-10-20 handover and production docs are historical snapshots, not evidence of today's release. This governance branch changes neither the site UI nor infrastructure. Release state: `PROPOSED → BRANCH → PR → HUMAN REVIEW → MERGE`. Merge is not itself live deployment verification.

## Mandatory review before any merge
1. Inspect full diff for unintended actions, deleted files, changed Workers configuration, API calls and dependency additions.
2. Run standard HDC integration tests plus the proposed cost guard.
3. Verify that sensitive information, actual vendor invoices, customer records or credentials are absent from policy files.
4. Human explicitly authorizes merge; **no auto-merge, no billing change, no publication claims before verification**.
