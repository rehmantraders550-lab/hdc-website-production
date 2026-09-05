# HADI DigitalCraft – Design System for Stitch
**Version:** 1.0  
**Date:** 2026-09-06  
**Status:** Locked  
**Authority Benchmark:** flex-n-gate.com  
**Aesthetic:** Dark, industrial, premium cinematic

---

## 1. Brand Identity

**Company:** HADI DigitalCraft  
**Positioning:** Industrial art gallery for advanced DTF, UV DTF, offset, and high-volume packaging printing.

**Logo Treatment**
- Wordmark: HADI DigitalCraft
- “HADI” → heavy bold weight, near-white
- “DigitalCraft” → cyber teal
- “Digital” slightly bolder than “Craft”
- No extra space between the two words
- Source logo file: `hadi_i-removebg-preview.png`

**Tagline**
> Precision. Artistry. Crafted Digitally.

**Secondary line (footer / hero)**
> Where solutions are built

---

## 2. Color System

### Core Palette
| Token              | Value                          | Usage                              |
|--------------------|--------------------------------|------------------------------------|
| `--bg-deep`        | `#0A0A0C`                      | Primary section backgrounds        |
| `--bg-charcoal`    | `#121215`                      | Alternating pillar backgrounds     |
| `--bg-absolute`    | `#050507`                      | Footer, deepest blacks             |
| `--glass-bg`       | `rgba(10, 10, 12, 0.72)`       | Navbar glass                       |
| `--text-primary`   | `#F5F5F5`                      | Headlines & primary text           |
| `--text-secondary` | `#C8C8C8`                      | Supporting paragraphs              |
| `--border-subtle`  | `rgba(255, 255, 255, 0.08)`    | Navbar bottom border               |

### Accent Colors (Restricted)
| Token              | Value / Description            | Usage Rule                         |
|--------------------|--------------------------------|------------------------------------|
| `--accent-teal`    | Cyber teal (from logo)         | Hover states, active menu, subtle CTA borders only |
| `--accent-copper`  | Copper-amber (from logo)       | Hover states, image highlights, subtle CTA accents only |

**Rule:** Accents are never used as large background fills. They appear only on interactive states and micro-details.

---

## 3. Typography

- Primary: Strong, high-contrast sans-serif
- Headlines: Bold / heavy weight, generous letter-spacing optional
- Body: Short paragraphs only, high readability
- No decorative or playful typefaces
- Maintain clear hierarchy: Hero headline → Section titles → Body → CTA labels

**CTA Label Style**
- “Discover more”
- “Watch video”
- “Discover our News →”
- “Contact our team”

---

## 4. Layout & Spacing Principles

- Full-bleed media preferred for Hero
- Generous vertical rhythm between sections
- Scannable blocks
- Large numbers / stats when used
- Short professional paragraphs
- No cramped or multi-column decorative layouts on primary pages
- 8px base grid preferred for precision

---

## 5. Component Standards

### Navbar
- Component base: Relume Navbar 1 (customized)
- Height: ≤ 80px
- Position: Fixed / absolute over hero
- Glass effect:
  ```css
  background: rgba(10, 10, 12, 0.72);
  backdrop-filter: blur(16px) saturate(140%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
  ```
- Single-line menu
- High-contrast text

### Hero
- Component base: Relume Header 1 (full-bleed media)
- Full-bleed looping video background
- Deep black vignette for text readability
- Brand ticker at absolute bottom edge
- Primary CTA: [Watch video] → modal
- No scroll indicators or decorative progress bars

### Latest News
- Component base: Relume Blog 1 (3-column)
- Solid dark background `#0A0A0C`
- Flush imagery, zero drop shadows
- No category tags or dividers overlaid on images
- Clean text link CTA

### Core Pillars
- Alternating Feature 1 / Feature 2
- Backgrounds alternate between `#0A0A0C` and `#121215`
- Text + image split
- Short copy + [Discover more]
- Industrial photography only

### Footer
- Component base: Relume Footer 1
- Absolute black `#050507`
- Tagline + utility links + line-icon socials
- Accents only on hover

---

## 6. Visual Direction

**Photography / Media**
- Close-up industrial processes (press cylinders, color separations, varnish layers)
- Macro shots of embossing, metallic foils, spot UV
- High-velocity machinery
- Eco substrates and kraft textures
- Warm copper light reflections preferred

**Mood**
- Dark
- Precise
- Cinematic
- Industrial
- Premium
- Restrained

**Banned**
- Soft drop shadows on cards
- Large rounded corners
- Light-mode defaults
- Playful illustrations
- Consumer / startup UI patterns
- Category tags on news images
- Decorative scroll cues

---

## 7. Interaction Rules

- Hover states use restrained teal or copper only
- Transitions: short and purposeful (0.2s ease recommended)
- CTAs remain clean and high-contrast
- No heavy glow or neon effects

---

## 8. Page Structure Reference (Homepage)

1. Navbar (glass)
2. Hero (full-bleed video + ticker)
3. Latest News (3-card)
4. Expertise (Feature 1)
5. Innovation (Feature 2)
6. Sustainability (Feature 1)
7. HADI Industrial (Feature 2)
8. Footer

---

## 9. File References

- Logo: `hadi_i-removebg-preview.png`
- Homepage structure: `GEMINI_OUTPUT_v1.0_Home.md`
- Stitch brief: `STITCH_BRIEF_v1.0_Home.md`
- Hand-off package: `HANDOFF_v1.0_Home.md`

---

**End of Design System v1.0**  
This file is the single source of truth for visual and component decisions in Stitch.
