# Taste Skill - HDC Integration

**Upstream:** https://github.com/Leonxlnx/taste-skill  
**Pinned upstream file:** `CHANGELOG.md` blob `f0ef4d4aac258b9605ac8c3d1432ef782e10127a`  
**Licence:** MIT - upstream copyright notice retained in the upstream project.

This directory records the design guidance adopted for the Hadi Digital Craft website. It is a reference dependency, not website runtime code, so it does not add JavaScript, CSS, or loading cost to the public site.

## HDC application

Use the upstream skill to prevent generic template design, preserve responsive and reduced-motion behaviour, and require a pre-flight design/quality review.

HDC's approved visual system takes priority where there is a conflict:

- Engineered Tactility stays the governing visual direction.
- The HDC palette, logo, typography, and commercial-printing positioning remain locked.
- Editorial serif typography and technical register labels are permitted because they are explicit HDC brand choices.
- No rule may introduce generic SaaS, equipment-retail, promotional-merchandise, or template-print-shop styling.
- Real HDC media and verified service claims remain mandatory.

The upstream `CHANGELOG.md` is stored alongside this record for traceability.

## Official HDC brand lock — 2026-09-03

The team-approved Hadi Digital Craft logo is the authoritative visual identity. The web implementation uses the optimized web asset at `assets/images/HDC-OFFICIAL-LOGO.webp`.

The official logo-derived colour family is implemented as CSS design tokens in `assets/css/styles.css`. Taste Skill remains a quality and anti-generic-design review layer; it must never override the HDC brand identity, Engineered Tactility, the established editorial/technical typography system, the approved page architecture, or evidence-bound content rules.

### Required pre-flight review

Before any HDC visual change is approved, verify:

1. The official logo is used rather than a text-built substitute.
2. Colour usage comes from the HDC token system; no unrelated neon or template accent is introduced.
3. Teal/aqua is used primarily for technical interaction and controlled emphasis.
4. Gold/copper is used for tactile/material emphasis rather than indiscriminate decoration.
5. Black and ivory remain the primary spatial fields so the site stays editorial and production-led.
6. Responsive behaviour, reduced motion, accessibility, evidence integrity and service positioning remain intact.
