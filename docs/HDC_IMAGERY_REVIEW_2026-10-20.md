# HDC imagery refresh — review package

## Implementation

- 38 new generated visual studies connected across all 21 current public pages and dynamic image views.
- Zero bottles, jars, cups, mugs or tumblers in the new collection. Flat glass panels replace drinkware imagery.
- Dedicated portrait homepage photography for phones, selected through a native picture source without loading both hero images.
- Existing HDC identity, typography, navigation, service architecture, quote flow and shared Jarallax behavior retained.
- Original image and video files preserved. Catalogue offerings unchanged.

## Visual review

[Desktop homepage](imagery-review-20261020/homepage-desktop.png) · [430px phone homepage](imagery-review-20261020/homepage-phone-430.png)

The desktop capture shows the JavaScript-disabled static fallback. The phone capture uses a 430px viewport and device-pixel ratio of 3.

## Verification

- Static validation: 421 references, zero errors and zero warnings.
- Design token check and Git whitespace check passed.
- All 38 WebP files decode successfully and are used by the site.
- 77 focused Chromium cases verified across the initial run and targeted rerun. Two tests required selector updates for the native picture wrapper; their rerun passed.
- Focused coverage includes 21 public routes, dynamic product imagery, 390px and 430px phone art direction, overflow and Jarallax fallbacks.
- Full Chromium/WebKit CI and hosted-preview verification remain pending publication.

## Records

- [Imagery rules](HDC_IMAGERY_RULES_2026-10-20.md)
- Detailed generation prompts and internal production maps are maintained outside this public review branch.
- Generation mode: built-in image generation. Scenes are illustrative, with provenance reflected in alt text and relevant captions.

## Publication status

Implementation commit: `906e5dca2a1789a3bf787257acc55d97d9884efa`.

Local review branch: `feat/hdc-imagery-renewal-20261020`. It includes the pending all-page Jarallax work from PR #98.

This review package covers public website assets and implementation only. Hosted-preview and full CI verification follow publication. Production promotion remains pending visual validation.
