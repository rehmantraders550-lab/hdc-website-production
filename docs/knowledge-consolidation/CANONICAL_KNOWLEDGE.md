# HDC Canonical Knowledge — Website

**Baseline:** `main@0bd720206f88b5d95e6346b8b504ff9c316e7336`  
**Purpose:** Current working knowledge for Hadi Digital Craft website development.  
**Rule:** This file is a projection of validated knowledge. Exact source bytes remain in Git / Library records.

## 1. Authority

Use this precedence when records disagree:

1. Latest explicit user instruction.
2. Verified GitHub `main`.
3. Canonical root `/index.html` and production CSS/JS/assets.
4. Current repository policy/docs.
5. Validated HDC / ORVIA records.
6. Historical handoffs.
7. External references.

Do not promote an older handoff above current production simply because it is more detailed.

## 2. Business position

Hadi Digital Craft is a specialised commercial printing-services business. It is not an equipment-sales website.

Current core service architecture:

1. Labels & Decals
2. Products & Object Printing
3. Packaging & Commercial Print
4. Large Format & Brand Environments

Events & Personalisation is an application category. Production methods such as UV DTF, Offset, and Large Format remain subordinate to application-led services.

Claims must remain evidence-bound. Do not invent capacity, specifications, turnaround, certifications, sustainability, durability, universal surface compatibility, tolerances, statistics, client results, or attribution.

## 3. Production governance

Canonical repository: `rehmantraders550-lab/hdc-website-production`  
Production branch: `main`  
Canonical homepage: root `/index.html`

Normal release sequence:

`approved branch → automated validation → visual approval → merge to main → Hostinger Git deployment → live verification`

Key rules:

- no unreviewed visual experiments directly on `main`;
- no routine manual `public_html` overwrite;
- no AI Builder deployment route for this site;
- no deletion or automated cleanup of repository assets;
- a commit is not “deployed” until the public route is verified;
- preserve prior known-good Git state for rollback.

## 4. ORVIA execution doctrine

Primary principle:

**Smallest valid change. Maximum verification. No silent scope expansion.**

Preferred workflow:

`VERIFY MAIN → AUDIT → FAILURE ANALYSIS → ISOLATE BRANCH → IMPLEMENT SMALLEST UNIT → STATIC VALIDATE → DIFF LOCK → PR → INTEGRATION GUARD → MERGE → LIVE VISUAL QA → MICRO-SURGERY IF REQUIRED → RECORD`

Before implementation:

- verify current `main` SHA;
- fetch exact implicated files;
- enumerate scope;
- inspect existing reusable architecture;
- preserve unrelated DOM/CSS/JS;
- identify failure modes before choosing complexity.

If a write result is uncertain, do not blindly retry. Re-fetch branch state, compare against `main`, and apply only the missing change.

## 5. Visual system

Primary doctrine: **Engineered Tactility**.

HDC should demonstrate printing through physical evidence:

- substrate;
- ink/transfer;
- pressure and registration;
- texture and reflectivity;
- edge definition;
- scale;
- construction;
- production precision.

Approved visual benchmark:

**museum-like object photography + forensic material detail + credible print engineering + editorial sequencing**

Visual hierarchy:

`Object → Material → Finish → Information`

Avoid:

- generic luxury props;
- machinery-sales presentation;
- neon/cyberpunk styling;
- fake smoke/particles;
- plastic-looking paper;
- impossible emboss/varnish depth;
- fake readable specifications;
- unsupported client imagery;
- generic AI mockup aesthetics.

### Prompting architecture

`object → substrate → graphic system → print/decoration process → physical finish behavior → lighting → camera/lens → composition → process-specific imperfections → negative constraints`

Lighting proves the process; it does not decorate it.

## 6. Homepage composition

The latest validated homepage logic is a **controlled sequence of composition families**, not one repeated grid.

Current conceptual rhythm includes:

1. Hero — full-bleed cinematic field
2. Product Universe — contained manual horizontal object rail
3. Capability Strip — modular equal units
4. Production Evidence — editorial split
5. Production Register — immersive expanding-panel interruption
6. Surface Lab — mirrored editorial split
7. Applications — modular application gallery
8. Material Aperture — compact expanding material family
9. Material Detail — editorial specimen split
10. Environment — full-bleed visual reset
11. Process — compact production path
12. Quality — editorial-register variant
13. Selected Work — curatorial pause / evidence-aware holding state
14. Project Enquiry — closing split

Older repository documents that describe a 12-section homepage remain historically useful but do not override later verified evolution.

### Symmetry doctrine

Symmetry does not mean centering everything.

Use:

- repeated axes;
- shared gutters;
- mirrored imbalance;
- predictable spacing;
- deliberate full-bleed interruptions;
- controlled ratios such as 45/55, 55/45, 5/7, 6/6, and modular equal divisions.

Sequence-level rhythm may oscillate:

`left-heavy → right-heavy → modular → immersive → mirrored → quiet pause`

## 7. Interaction architecture

### Product Universe

Use native horizontal browsing:

- native overflow;
- user-owned swipe/trackpad momentum;
- buttons only as assistance;
- no autoplay;
- no clones;
- no infinite looping;
- no vertical-wheel hijack;
- no mandatory snap;
- immediate focus reveal.

### Production Register / Material Aperture

Persistent explicit state:

- click/tap opens;
- only one active panel;
- active panel can close;
- selecting another transfers state;
- Escape closes;
- keyboard navigation is supported;
- outside click closes;
- hover may enhance but never owns state.

### Editorial Register

Finishing & Embellishment uses an interactive indexed register driving feature imagery/caption.

Quality may reuse the same structural chassis while remaining static information. Do not add fake active-state semantics to static rows.

### Selected Work

Treat as a curatorial pause. Temporary imagery must not impersonate real project evidence.

### Responsive behavior

Mobile is independently composed, not compressed desktop.

Do not rely on hover for critical content or interaction. Prevent accidental horizontal overflow except where an intentional horizontal browser rail exists.

## 8. Surface Lab

Surface Lab is a decision/support system, not a claim that HDC can print on everything.

Core decision logic:

`OBJECT → MATERIAL → COATING → GEOMETRY → ENVIRONMENT → VISUAL REQUIREMENT → PROCESS CANDIDATE → VALIDATION STATUS → RECOMMENDATION`

Important distinction:

**machine-compatible ≠ substrate-qualified ≠ HDC production-approved**

Canonical status vocabulary:

`UNTESTED → EXPERIMENTAL → VALIDATED → PRODUCTION APPROVED → RESTRICTED → RETIRED`

Content projection:

- PUBLIC
- CONDITIONAL
- INTERNAL
- BLOCKED

For unknown/unvalidated surfaces, prioritize sample test, object review, or process recommendation rather than direct guarantees.

## 9. Deployment and Hostinger

GitHub `main` is the production source of truth.

Hostinger Git integration is the normal deployment route.

The September 23 incident proved that correct static files can exist while the apex domain serves the wrong website context. Therefore validate:

- apex `/`;
- apex `/index.html`;
- `www`;
- critical page;
- CSS/JS asset fingerprint;
- `robots.txt`;
- `sitemap.xml`.

Do not infer production correctness from a green workflow alone.

Known integration-guard concern:

- live verification can be skipped when `HDC_LIVE_URL` is absent;
- generic text such as “Hadi Digital Craft” is not a strong release fingerprint;
- fixed sleep is weaker than bounded convergence polling.

DNS changes require a full zone read first. Preserve MX, SPF, DKIM, DMARC and verification records.

## 10. Historical states that must remain visible

Historical records are retained because they explain why the current system exists.

Examples:

- early service architecture treated DTF/UV DTF/Offset/Large Format as top-level service categories;
- later architecture moved to application-led service categories;
- early Stitch-era design records used different visual/component assumptions;
- September 2 repository docs describe an earlier homepage state;
- September 26 work established the newer interaction and symmetry system.

Do not erase these records; mark them superseded.

## 11. Active open items

1. Exact final hPanel button/confirmation sequence for the successful apex-domain attachment was not observed.
2. Recheck canonical/social URLs on current production pages because older source may still reference the Hostinger preview domain.
3. Harden/verify the Integration Guard against skipped live checks and non-unique smoke signatures.
4. Any newly discovered historical HDC project record must first be registered and coverage-accounted before its content becomes canonical.
