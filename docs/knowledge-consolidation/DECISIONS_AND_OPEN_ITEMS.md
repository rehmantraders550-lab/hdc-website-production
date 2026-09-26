# HDC Decisions, Risks, and Open Items

**Baseline:** `main@0bd720206f88b5d95e6346b8b504ff9c316e7336`

## Active decisions

### D-001 — Production authority
GitHub `main` is the canonical production source. The root `/index.html` is the canonical homepage. Stored project records explain governance/history but do not override verified live source.

### D-002 — Non-destructive consolidation
This knowledge pack is additive. No original repository file or Library record is removed, replaced, renamed, or “cleaned up” because it was consolidated.

### D-003 — Application-led service architecture
The active four-service system is:
- Labels & Decals
- Products & Object Printing
- Packaging & Commercial Print
- Large Format & Brand Environments

Earlier top-level DTF/UV-DTF/Offset/Large-Format service structures are retained as historical states.

### D-004 — Homepage interaction family
Use a small family of intentional behaviors instead of inventing unique mechanics per section:
- native horizontal rail;
- explicit expanding aperture/panel state;
- interactive editorial register;
- static editorial register;
- compact sequential process;
- non-interactive curatorial pause.

### D-005 — Visual truth over decorative effect
Material and production behavior control visual decisions. Effects must be physically plausible and revealed through controlled light.

### D-006 — Surface Lab qualification
Machine compatibility alone does not equal HDC production approval. Uncertain jobs route to validation/sample review.

### D-007 — Deployment correctness
A merged commit or green CI badge does not prove production correctness. Public entry routes must be verified independently.

## Known loopholes corrected by this consolidation

### L-001 — Summary loss
**Risk:** A master summary can omit small facts with no visible warning.  
**Correction:** SOURCE_COVERAGE_LEDGER + atomic record layer.

### L-002 — Authority inversion
**Risk:** A detailed old handoff can appear more authoritative than current production.  
**Correction:** explicit authority classes + temporal scope.

### L-003 — Silent contradiction resolution
**Risk:** two different values or architectures can be averaged or one silently discarded.  
**Correction:** conflict/supersession relationships; historical state retained.

### L-004 — Binary blindness
**Risk:** images/video/code are reduced to prose and their real content disappears.  
**Correction:** binaries/executable source remain authoritative in Git and are indexed by SHA rather than replaced.

### L-005 — Duplicate destruction
**Risk:** semantic deduplication can destroy multiple independent evidence trails.  
**Correction:** normalize the concept but retain every supporting source identity.

### L-006 — Giant-file retrieval degradation
**Risk:** one enormous master file becomes difficult for humans and retrieval systems to navigate.  
**Correction:** seven-purpose-file architecture; atomic machine ledger separated from human canonical projection.

### L-007 — Historical truth treated as current truth
**Risk:** old documents may be accurate for their date but wrong today.  
**Correction:** SUPERSEDED status and temporal notes rather than deletion.

### L-008 — False completeness
**Risk:** discovered records are treated as “all records.”  
**Correction:** v1 explicitly states discovery limits and requires later sources to enter registry/coverage before promotion.

## Open items requiring future verification

### O-001 — Canonical URL migration
Some repository pages in the baseline still reference the old `linen-crane-652095.hostingersite.com` canonical/OG URL. Re-audit against the currently intended production canonical domain before editing.

### O-002 — Integration Guard false-green behavior
The current workflow can warn and skip live verification if `HDC_LIVE_URL` is absent, while source validation passes. The homepage signature is also generic. Revisit before claiming deployment hardening is complete.

### O-003 — Hostinger incident operator detail
The exact successful final hPanel action/button sequence was not observed. Keep it unknown unless the user provides reliable evidence.

### O-004 — Exhaustive chat-history import
The current pack includes discovered HDC Library records and the verified repository snapshot. It is not yet a literal export of every historical HDC chat message. If full forensic chat ingestion is desired, run a separate inventory/import pass and append newly discovered sources.

### O-005 — Visual-only evidence extraction
Image binaries are preserved, but fine visual facts that exist only in pixels are not exhaustively converted into textual atoms. Do that only when a specific visual-evidence corpus is needed; never discard the original pixels.

## Update protocol

When HDC evolves:

1. fetch latest `main`;
2. record new commit/tree;
3. compare paths against previous baseline;
4. extract only changed/new knowledge;
5. append new atoms;
6. mark superseded atoms rather than deleting;
7. update relationships;
8. regenerate canonical projection;
9. re-run coverage ledger;
10. verify no source has silently disappeared.
