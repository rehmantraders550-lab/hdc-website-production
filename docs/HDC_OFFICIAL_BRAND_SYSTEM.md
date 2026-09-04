# HDC Official Brand System

**Status:** Team-approved / locked  
**Effective:** 2026-09-03  
**Website doctrine:** Engineered Tactility

## Authority

The supplied Hadi Digital Craft logo is the official HDC logo and the governing colour source for the website. The website must use the real logo asset rather than reconstructing the identity as text.

The implementation palette below is sampled directly from the approved raster logo supplied by the team. These are the locked web values unless the team later supplies master Pantone / CMYK / RGB specifications, in which case those master specifications supersede the sampled web values.

Taste Skill v2 is integrated as a design-quality review dependency at `docs/external/taste-skill/SKILL.md`. It can challenge generic composition, weak hierarchy, poor responsive behaviour, contrast failures and unnecessary visual effects, but it cannot redefine HDC's logo, palette, typography doctrine, commercial-printing position, architecture or evidence rules.

## Official web palette

| Token | Value | Role |
|---|---:|---|
| HDC Black | `#000000` | Absolute visual anchor |
| HDC Charcoal | `#171F20` | Primary dark typography / production field |
| HDC Circuit White | `#F0F1F1` | Logo circuit / primary light |
| HDC Deep Blue | `#135778` | Technical depth, editorial links, active hierarchy |
| HDC Teal | `#37AAA5` | Primary technical interaction |
| HDC Aqua | `#76D6CE` | Focus, active states, high-contrast technical accent |
| HDC Steel | `#61888B` | Secondary technical / structural support |
| HDC Mist | `#B4C5C7` | Muted light text on dark fields |
| HDC Gold | `#D9A35A` | Material / tactile emphasis |
| HDC Amber | `#C57D20` | Secondary warm material accent |
| HDC Copper | `#824925` | Surface / print-detail emphasis |
| HDC Umber | `#491F08` | Deep warm support |
| HDC Champagne | `#F0CD8B` | Controlled warm highlight |

## Derived spatial fields

The website does not use an unrelated beige / grey system. Light and dark fields are derived from the official logo family:

| Token | Value | Derivation / use |
|---|---:|---|
| Paper | `#F0F0ED` | Circuit White with a trace of Champagne |
| Paper Deep | `#F0EEE9` | Warm editorial secondary surface |
| Canvas | `#F0ECE2` | Material-led warm field |
| Coal | `#090C0D` | Black + Charcoal production field |
| Coal Soft | `#0D1112` | Secondary dark surface |
| Muted Dark | `#384E50` | Charcoal / Steel support text |

These derived fields allow the brand colours to be present throughout the site without turning every component into a brightly coloured object.

## Usage doctrine

### Cool technical register

Deep Blue, Teal, Aqua, Steel and Mist carry:

- navigation and active states;
- focus treatment;
- technical rules and separators;
- section indexes;
- interactive feedback;
- controlled informational hierarchy.

Teal / Aqua is the primary interaction family. Deep Blue provides depth and legible hierarchy on light fields.

### Warm material register

Gold, Amber, Copper, Umber and Champagne carry:

- material and specimen emphasis;
- tactile print moments;
- finish cues;
- restrained warm gradients;
- physical / surface-led details.

Warm colours do not become competing primary CTA colours. Their purpose is material character, not interface noise.

### Spatial hierarchy

Black, Charcoal, Circuit White and the derived Paper fields remain the dominant spatial system. This preserves the editorial and industrial character of Engineered Tactility while letting the full official palette resonate through rules, states, details and material fields.

## Contrast guardrails

Implementation checks for the official palette include:

- Charcoal on Circuit White: strong body-text contrast.
- Deep Blue on Circuit White: suitable for readable technical hierarchy.
- Aqua on Charcoal: strong high-contrast interactive state.
- Teal on Charcoal: suitable for readable accent text.
- Gold on Charcoal: suitable for restrained warm emphasis.
- Steel is not used as small body copy on light fields without a darker supporting tone.

## Prohibited colour behaviour

Do not introduce:

- AI-purple or unrelated neon;
- generic SaaS gradients;
- RGB glow effects;
- unrelated lime / fluorescent accents;
- arbitrary extra brand colours;
- decorative colour noise that competes with material imagery.

## Implementation

- Official logo: `assets/images/HDC-OFFICIAL-LOGO.webp`
- Design tokens and global colour behaviour: `assets/css/styles.css`
- Header / footer logo injection: `assets/js/site.js`
- Full Taste Skill v2: `docs/external/taste-skill/SKILL.md`
- HDC Taste Skill precedence profile: `docs/external/taste-skill/README.md`

## Release rule

All brand-system changes remain on the preview branch until visual and responsive QA is complete and the team approves the result. Production `main` is not used for unvalidated visual experiments.
