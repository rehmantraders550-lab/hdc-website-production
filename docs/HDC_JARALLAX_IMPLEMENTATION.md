# HDC Jarallax implementation

## Purpose and source

Add restrained visual depth to the hero introduction on all 21 current public pages in HDC’s Engineered Tactility system. Artwork, material and finishing imagery carry the motion; headings, navigation, captions and controls keep their current position and behavior.

- Verified base: `78c1d3ddc0021230cd4ec4d7dedb2258e3493cab`, merged Jarallax PR #97.
- Branch: `feat/hdc-parallax-all-pages-20261020`.
- Root `index.html` is the canonical homepage, verified at Git blob `47820767d0f4ad6e4a531e6f06ad4ba2646d0944`.
- The historical `previews/engineered-tactility-2026-10-07/index.html` remains unchanged. Its active assets are still consumed by the canonical homepage.
- Legacy `machine-dtf.html` and `hdc-expanding-panels-lab.html` retain their existing redirects and are unchanged.
- The user-provided `jarallax-master.zip` contains `README.md` and `CHANGELOG.md`; there is no separate `jarallax.md`.

## Art direction

Design variance 7/10, motion intensity 3/10, visual density 4/10, matching HDC design-system v2.

- Graphite `#0B1013`, charcoal `#171D21`, paper `#F0EFED`, white `#FFFFFF`, teal `#036F86` and copper `#D89A63` keep their current roles.
- Existing HDC Display remains the editorial voice; HDC Sans carries body copy and controls.
- Preserve the existing left-aligned hero copy, full-bleed homepage composition, split Surface Lab composition and finishing specimen frame.
- The only new visual behavior is a gentle difference between image travel and normal document travel. No heading reveals, zoom, fade, scroll interception, video or moving controls are introduced.
- Apply the same restrained effect to the introduction on every current page. Product cards, surface comparisons, forms and finishing gallery interactions keep their current behavior.

## Placement map

| Page | Route | Image frame | Speed |
| --- | --- | --- | --- |
| Homepage | `index.html` | `#home .hero-image` | 0.90 |
| About HDC | `about.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Applications | `applications.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Contact | `contact.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| FAQ | `faq.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Finishing & embellishment | `finishing-embellishment.html` | `.fe-hero__media` | 0.92 |
| Glass surface decoration | `glass-surface-decoration.html` | `.page-hero__media--portrait .hdc-parallax-frame` | 0.94 |
| Industries | `industries.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Labels & decals | `labels-decals.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Large format & brand environments | `large-format-brand-environments.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Large-format production guide | `machine-large-format.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Offset production guide | `machine-offset.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| UV DTF production guide | `machine-uv-dtf.html` | `.page-hero__media--portrait .hdc-parallax-frame` | 0.94 |
| Direct-to-object UV production guide | `machine-uv-flatbed.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Packaging & commercial print | `packaging-commercial-print.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Production methods | `production.html` | `.prod-hero__media` | 0.90 |
| Products & object printing | `products-object-printing.html` | `.page-hero__media--portrait .hdc-parallax-frame` | 0.94 |
| Request a quote | `request-a-quote.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Selected work | `selected-work.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Services | `services.html` | `.page-hero__media .hdc-parallax-frame` | 0.90 |
| Surface Lab | `surface-lab.html` | `.sl-hero__visual` | 0.88 |

Jarallax speed 1 tracks ordinary document travel. Values close to 1 keep differential movement small. This implementation uses only `type: 'scroll'`.

The Production hero uses balanced desktop text columns so “Production” remains a whole word beside its introduction. This small shared-layout correction preserves its existing type scale and copy.

## Runtime contract

1. Static HTML and existing CSS render the complete hero first, with existing source URLs, alt text, loading priority and dimensions.
2. All 21 current pages load the same small HDC controller and scoped adapter CSS; each page has exactly one opted-in hero frame.
3. The controller checks a minimum width of 22.5rem, reduced-motion preference, data-saving preference and document visibility. This enables gentle image depth on touch devices while retaining a static fallback on very narrow screens.
4. Eligible sessions load the local, versioned Jarallax core once. No CDN, jQuery, video extension, React integration, npm runtime package or new network provider is required.
5. Split-hero pages reserve the existing 3:2, 3:4 or 16:9 image geometry in a dedicated frame, while the caption stays outside it. After the image loads successfully, Jarallax moves that same image node into its generated layer. Its existing object-fit and object-position are preserved, including contain on whole-object photographs. No duplicate image or duplicate alt text is introduced.
6. A narrower layout, reduced-motion request, connection preference change or hidden page destroys the instance and restores the original image and inline styles. When Jarallax detaches an image from a responsive `<picture>`, the controller pins the already-selected source for the duration of enhancement and restores the authored source on teardown. Crossing the 64rem mobile art-direction breakpoint restarts the enhancement so the correct crop is selected. Eligible sessions can initialize again.
7. Page-hide destroys instances; page-show reconciles eligibility for browser back/forward cache restoration.
8. A missing/blocked core, unsupported enhancement or failed image leaves the existing static page available. Other website scripts do not depend on the enhancement.

## Eligibility matrix

| Condition | Result | Initial optional core request |
| --- | --- | --- |
| Viewport at least 22.5rem, normal motion | Image-only depth, including touch devices | Yes, one same-origin request |
| Viewport below 22.5rem | Existing static imagery | None |

| Reduced motion | Existing static imagery | None |
| Save-Data preference exposed as enabled | Existing static imagery | None |
| JavaScript disabled | Existing static imagery | None |
| Core load blocked or fails | Existing static imagery | Failed attempt; no retry loop |

Save-Data is respected when the browser exposes it. No user-agent sniffing or device-model lists are used. After an already eligible desktop has loaded the core, changing preferences stops motion but cannot undo those transferred bytes.

## Files and provenance

| Responsibility | Path |
| --- | --- |
| Eligibility, loading, presets, lifecycle | `assets/js/hdc-parallax.js` |
| Image layer and overlay stacking | `assets/css/hdc-parallax.css` |
| Pinned core, source map, MIT license | `assets/vendor/jarallax/3.1.0/` |
| Browser behavior and fallback checks | `tests/parallax.spec.ts` |
| Existing responsive regression matrix | `tests/design-system.spec.ts` |

Vendor files are copied unchanged from the provided archive. The optional core is 11,380 bytes uncompressed, approximately 4.0KB under gzip in the local measurement. The source map is available for debugging and is not requested by ordinary page execution.

The existing static validator continues to reject embedded content images. Its only vendor exception is Jarallax's exact one-pixel transparent GIF fallback inside this specific SHA-256-pinned core file. A changed core hash or any different embedded image remains blocked.

| Source artifact | SHA-256 |
| --- | --- |
| Provided ZIP | `632070404335f6d913fa5e03aa6921bc20f783c1bb9d0003950d92bb10516b92` |
| `jarallax.min.js` | `a0f19bc766c317c29d5627005afdf1b49d20063e9f337ec7a1eb08c3461dbcdf` |
| `jarallax.min.js.map` | `7591a57bf000ee10b62821a68bb6674c58627f6f754c7efc9ffa73545e8da56c` |
| `LICENSE` | `0cf391b41b51fe54705b4adcc818c975acea827d32a692351034b12e5bf2b06e` |

API and license reference: <https://github.com/nk-o/jarallax>. The supplied README documents `imgElement`, `imgPosition`, `keepImg`, `containerClass`, `disableParallax`, reduced motion and the `destroy` method. Only the image core is used; the other archive integrations and development dependencies are not installed.

## Acceptance and promotion

- Preserve the exact text, headings, menu items, destinations, product data and image references on all 21 current pages.
- Verify actual differential image travel, stable heading/document geometry, clipped image coverage and absence of horizontal page overflow in Chromium and WebKit.
- Verify static layouts below 22.5rem and absence of an optional core download on reduced-motion and data-saving sessions; verify correct mobile art direction and restored image sources across breakpoints.
- Verify preference toggles, desktop/phone resize, script failure and JavaScript-disabled hero rendering.
- Re-run the existing responsive design-system suite, token drift check, static asset validator and Wrangler dry run.
- Publish a branch preview and PR. Production promotion follows the user’s visual validation.
- Browser checks are evidence for browser behavior, not a claim of physical iPhone or Android hardware testing.

## Rollback

Removing the `data-hdc-parallax` opt-ins and their adapter/controller references restores the previous static behavior. The vendor assets can remain harmlessly stored; no file deletion is required.
