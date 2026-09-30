# HDC Knowledge Consolidation v1

**Project:** Hadi Digital Craft website  
**Repository:** `rehmantraders550-lab/hdc-website-production`  
**Baseline production SHA:** `0bd720206f88b5d95e6346b8b504ff9c316e7336`  
**Baseline tree SHA:** `d2bd24d9e61a807709607969183cb87fb500496a`  
**Created:** 2026-09-26  
**Status:** Additive knowledge layer; production files unchanged.

## Purpose

Reduce project-file pressure without losing source evidence, historical decisions, implementation logic, warnings, failed approaches, or provenance.

This directory is **not** a replacement for the repository, Git history, Library originals, or historical HDC records. It is a navigable knowledge layer over those sources.

## Authority order

1. Latest explicit user instruction.
2. Verified GitHub `main` at the current production SHA.
3. Canonical root `/index.html` and production CSS/JS/assets.
4. Current repository policy and production documentation.
5. Validated HDC / ORVIA execution records.
6. Historical handoffs and superseded project records.
7. External research.

A lower-authority source may explain history, rationale, or a superseded state, but must not silently override a higher-authority current source.

## Files

- `SOURCE_REGISTRY.yaml` — source identities, authority, version, scope, and provenance.
- `SOURCE_COVERAGE_LEDGER.yaml` — explicit accounting for what was extracted, preserved-only, unresolved, superseded, or intentionally non-knowledge.
- `KNOWLEDGE_ATOMS.jsonl` — atomic facts, rules, decisions, constraints, observations, warnings, and historical states.
- `CANONICAL_KNOWLEDGE.md` — human-readable current HDC website knowledge.
- `RELATIONSHIPS.yaml` — dependencies, conflicts, supersession, derivation, and authority links.
- `DECISIONS_AND_OPEN_ITEMS.md` — active decisions, unresolved items, verification gaps, and historical changes.
- `README.md` — this operating guide.

## Loss-prevention rules

- Never delete or overwrite originals merely because their contents were consolidated.
- Never treat a summary as proof that a source was fully represented.
- Every important canonical statement must map to one or more source or knowledge IDs.
- Duplicate statements are normalized, but duplicate evidence is retained as provenance.
- Contradictions are recorded; they are never silently averaged or erased.
- Historical records remain historically valid even when superseded.
- Binary assets and executable source are indexed, not replaced by prose descriptions.
- Git blob SHA is the preferred integrity identifier for repository files.
- Library/file IDs identify external project knowledge records where available.
- Current production truth and historical/project knowledge are different authority classes.

## Coverage rule

Every discovered source must receive a coverage status:

- `EXTRACTED`
- `INDEXED_BINARY`
- `PRESERVED_ONLY`
- `SUPERSEDED_BUT_RETAINED`
- `INTENTIONALLY_NON_KNOWLEDGE`
- `UNRESOLVED`

No discovered source may disappear from the ledger without an explicit status.

## Update rule

When production changes:

1. Record the new `main` SHA and tree SHA.
2. Re-scan changed paths only.
3. Append or supersede knowledge atoms; do not rewrite history silently.
4. Update canonical knowledge from validated active atoms.
5. Re-run source coverage and broken-reference checks.
6. Preserve previous pack versions or commits through Git history.

## Important scope note

This v1 implementation covers the verified HDC production repository snapshot plus the HDC project records explicitly discovered during consolidation. It does **not** claim that every historical ChatGPT conversation has been exhaustively exported. Any later-discovered HDC record should be added to the registry and coverage ledger before its knowledge is promoted.
