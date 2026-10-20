# HDC Jarallax implementation

## Purpose and source

Add restrained visual depth to three editorial introductions in HDC’s Engineered Tactility system. Artwork, material and finishing imagery carry the motion; headings, navigation, captions and controls keep their current position and behavior.

- Verified base: `735016ecd6ecd43f945c087b8d6fda175d7bc512`, merged design-system PR #96.
- Branch: `feat/hdc-jarallax-20261020`.
- Root `index.html` is the canonical homepage, verified at Git blob `75507660252d0e1677b347aae6504746dc0a1de7`.
- The historical `previews/engineered-tactility-2026-10-07/index.html` remains unchanged. Its active assets are still consumed by the canonical homepage.
- Legacy `machine-dtf.html` and `hdc-expanding-panels-lab.html` retain their existing redirects and are unchanged.
- The user-provided `jarallax-master.zip` contains `README.md` and `CHANGELOG.md`; there is no separate `jarallax.md`.

## Art direction

Design variance 7/10, motion intensity 3/10, visual density 4/10, matching HDC design-system v2.

- Graphite `#0B1013`, charcoal `#171D21`, paper `#F0EFED`, white `#FFFFFF`, teal `#036F86` and copper `#D89A63` keep their current roles.
- Existing HDC Display remains the editorial voice; HDC Sans carries body copy and controls.
- Preserve the existing left-aligned hero copy, full-bleed homepage composition, split Surface Lab composition and finishing specimen frame.
- The only new visual behavior is a gentle difference between image travel and normal document travel. No heading reveals, zoom, fade, scroll interception, video or moving controls are introduced.
- Concentrate the effect in the introduction on each selected page. Product cards, surface comparisons, forms and finishing gallery interactions keep their current behavior.

## Placement map

| Page | Selected image frame | Preset speed | Behavior |
| --- | --- | --- | --- |
| Homepage | `#home .hero-image` | 0.90 | Existing tile / horses / signage / personalized objects image drifts gently behind stable copy and overlays. |
| Surface Lab | `.sl-hero__visual` | 0.88 | Existing material study image gains depth beside the static introduction. |
| Finishing & embellishment | `.fe-hero__media` | 0.92 | Existing finish samples drift subtly; caption and readability overlay remain above the image. |

Jarallax speed 1 tracks ordinary document travel. Values close to 1 keep differential movement small. This implementation uses only `type: 'scroll'`.

## Runtime contract

1. Static HTML and existing CSS render the complete hero first, with existing source URLs, alt text, loading priority and dimensions.
2. Only the three selected pages load the small HDC controller and scoped adapter CSS.
3. The controller checks width of at least 64rem, fine pointer, hover support, reduced-motion preference, data-saving preference and document visibility.
4. Eligible sessions load the local, versioned Jarallax core once. No CDN, jQuery, video extension, React integration, npm runtime package or new network provider is required.
5. After the existing image loads successfully, Jarallax moves that same image node into its generated layer. No duplicate image or duplicate alt text is introduced.
6. A narrower layout, reduced-motion request, connection preference change or hidden page destroys the instance and restores the original image and inline styles. Eligible sessions can initialize again.
7. Page-hide destroys instances; page-show reconciles eligibility for browser back/forward cache restoration.
8. A missing/blocked core, unsupported enhancement or failed image leaves the existing static page available. Other website scripts do not depend on the enhancement.

## Eligibility matrix

| Condition | Result | Initial optional core request |
| --- | --- | --- |
| Desktop, at least 64rem, hover/fine pointer, normal motion | Image-only depth | Yes, one same-origin request |
| Phone, narrow tablet or window below 64rem | Existing static imagery | None |
| Large touch device with coarse pointer | Existing static imagery | None |
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

- Preserve the exact text, headings, menu items, destinations, product data and image references on all three pages.
- Verify actual differential image travel, stable heading/document geometry, clipped image coverage and absence of horizontal page overflow in Chromium and WebKit.
- Verify static phone layouts and absence of an optional core download on mobile, reduced-motion and data-saving sessions.
- Verify preference toggles, desktop/phone resize, script failure and JavaScript-disabled hero rendering.
- Re-run the existing responsive design-system suite, token drift check, static asset validator and Wrangler dry run.
- Publish a branch preview and PR. Production promotion follows the user’s visual validation.
- Browser checks are evidence for browser behavior, not a claim of physical iPhone or Android hardware testing.

## Rollback

Removing the three `data-hdc-parallax` opt-ins and their adapter/controller references restores the previous static behavior. The vendor assets can remain harmlessly stored; no file deletion is required.
