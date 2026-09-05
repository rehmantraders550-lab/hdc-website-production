# Stitch-Ready Brief + Implementation Notes
**Version:** v1.0 – Homepage  
**Date:** 2026-09-05  
**Company:** HADI DigitalCraft  
**Status:** Ready for Stitch assembly  
**Authority:** flex-n-gate.com structure + locked dark industrial standards

---

## 1. Stitch-Ready Component Brief (Homepage)

### 1.1 Navbar
- **Relume Component:** Navbar 1 (Customized)
- **Exact Content:**
  - Brand: HADI DigitalCraft  
    - “HADI” = heavy bold weight  
    - “DigitalCraft” = cyber teal, with “Digital” slightly bolder than “Craft”
  - Menu (single line): Our Agency · Expertise · Innovation · Sustainability · News / Projects · Partner Resources
- **Visual Notes:**
  - Background: `rgba(10, 10, 12, 0.72)`
  - Backdrop blur: 16px
  - Height: ≤ 80px
  - Border-bottom: 1px solid rgba(255,255,255,0.08)
  - No drop shadows
  - High-contrast white text
  - Sharp / minimal corners

### 1.2 Hero
- **Relume Component:** Header 1 (Full-bleed media + text overlay)
- **Exact Content:**
  - Headline: Where precision meets artistry.
  - Supporting text: An industrial art gallery that elevates advanced DTF, UV DTF, and offset printing into precise, gallery-grade industrial solutions. We set new technical and aesthetic standards for professional printing in Pakistan.
  - Brand ticker (bottom edge): Crafted Digitally. Crafted Digitally. Crafted Digitally.
- **Visual Notes:**
  - Full-bleed looping background video (press cylinders, color separations, spot varnish catching copper light)
  - Deep black transparent vignette for text readability
  - No scroll cues, progress bars, or section numbers
  - Primary CTA: [Watch video] → opens cinematic modal of Gujrat production process

### 1.3 Latest News
- **Relume Component:** Blog 1 (3-column grid)
- **Exact Content:**
  - Section title: Latest news
  - Card 1: Launch of new 3D embossed rigid packaging lines  
    (Visual: ultra-macro of deep amber paperboard with raised 3D gold embossing)
  - Card 2: Elevating brands with premium UV DTF solutions  
    (Visual: metallic foils + spot UV textures)
  - Card 3: Advancements in automated structural box design  
    (Visual: flat-pack blueprints + custom boxboard prototypes)
- **Visual Notes:**
  - Background: solid `#0A0A0C`
  - Flush imagery, zero drop shadows
  - No category tags, no row lines, no border dividers on images
  - CTA: [Discover our News →] (clean text link + arrow)

### 1.4 Core Pillars (Stacked)

**Pillar 1 – Expertise** (Text Left / Image Right)  
- Relume: Feature 1  
- Heading: Expertise  
- Copy: HADI DigitalCraft provides brands and agencies a comprehensive print solution using our collective resources.  
- CTA: [Discover more]  
- Background: deep black  
- Image: industrial multi-color offset setups and precise printing beds

**Pillar 2 – Innovation** (Image Left / Text Right)  
- Relume: Feature 2  
- Heading: Innovation  
- Copy: Focusing on the tactile future of print with enhanced perceived quality, deep 3D embossing, and specialized varnish layers.  
- CTA: [Discover more]  
- Background: `#121215`  
- Image: tactile copper/amber geometric shards under thick spot UV gloss

**Pillar 3 – Sustainability** (Text Left / Image Right)  
- Relume: Feature 1  
- Heading: Sustainability  
- Copy: As a leader in professional printing, we are committed to the care of our environment by using eco-conscious substrates.  
- CTA: [Discover more]  
- Background: deep black  
- Image: eco kraft packaging, organic textures, FSC-certified boards

**Pillar 4 – HADI Industrial** (Image Left / Text Right)  
- Relume: Feature 2  
- Heading: HADI Industrial  
- Copy: Providing a full range of high-volume manufacturing, from structural engineering to fully assembled folding cartons.  
- CTA: [Discover more]  
- Background: `#121215`  
- Image: high-velocity folding boxboard production machinery

### 1.5 Footer
- **Relume Component:** Footer 1
- **Exact Content:**
  - Tagline: Precision. Artistry. Crafted Digitally.
  - Section anchor: Where solutions are built
  - Links: Our Agency · Expertise · Innovation · Sustainability · News · Partner Resources · Contact Us · Legal Terms / Privacy Policy
  - Socials: LinkedIn · Instagram · Facebook (clean line icons only)
- **Visual Notes:**
  - Background: absolute black `#050507`
  - Cyber teal + copper accents only on hover states
  - No floating metadata or version labels

---

## 2. First Implementation Notes (Homepage)

### Priority Order for Stitch
1. Apply global dark industrial theme (backgrounds, typography, button styles)
2. Build Navbar with locked glass CSS
3. Build Hero (full-bleed video + vignette + ticker)
4. Build Latest News 3-card grid
5. Build the four stacked Pillars (alternate Feature 1 / Feature 2)
6. Build Footer

### Critical CSS Tokens (lock these)
```css
--bg-deep: #0A0A0C;
--bg-charcoal: #121215;
--bg-absolute: #050507;
--glass-bg: rgba(10, 10, 12, 0.72);
--glass-blur: 16px;
--text-primary: #F5F5F5;
--accent-teal: cyber teal (from logo);
--accent-copper: copper-amber (from logo);
```

### Accent Rule
Copper and cyber teal are **only** allowed on:
- Hover states
- Active menu items
- Subtle CTA borders / underlines
- Never as large background fills

### Banned Elements
- Drop shadows on cards
- Category tags overlaid on images
- Soft / large rounded corners
- Light-mode defaults
- Decorative scroll indicators
- Multi-row or tall navbar

### Logo Treatment
- “HADI” = heavy bold
- “DigitalCraft” = cyber teal
- “Digital” slightly bolder than “Craft”
- No extra space between the two words

---

**Status:** This brief is complete and ready for Stitch assembly.
