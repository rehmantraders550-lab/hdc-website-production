# Cloudflare Website Pipeline

**Status:** Production pipeline operational; last reconciled 2026-10-22.  
**Repository:** `rehmantraders550-lab/hdc-website-production`  
**Production Worker:** `hdc-website-production`  
**Public site:** [hadidigitalcraft.com](https://hadidigitalcraft.com)  
**Worker URL:** [hdc-website-production.rehmantraders550.workers.dev](https://hdc-website-production.rehmantraders550.workers.dev)

## Most recent independently checked main-branch release · 2026-10-22

- **Source head:** [`93e3275dba85a121bd1cbaec6bb949ce03ae6cab`](https://github.com/rehmantraders550-lab/hdc-website-production/commit/93e3275dba85a121bd1cbaec6bb949ce03ae6cab), PR #110, documentation/PR template only.
- **Verification:** [HDC Integration Guard run 39770861097](https://github.com/rehmantraders550-lab/hdc-website-production/actions/runs/39770861097) succeeded, including Worker smoke on `workers.dev`.
- **Last user-facing feature change:** PR #109 commit `39163b7177734b405fee834bc581f28306ed6a42`. See [detailed reconciled handover](releases/HDC_RELEASE_HANDOVER_2026-10-22.md).
- **Custom-domain visual QA and exact deployment ID for #110:** not independently verified in this audit.
- **RecordSync rollout:** manifest and PR candidate gate are being introduced in an isolated branch. Merging does not on its own certify Library publication. Preserve earlier release records below as historical.

## Source of truth and production target

The GitHub repository's `main` branch is the canonical source for the public HDC website: HTML, CSS, JavaScript, approved media, manifests, and static assets. Wrangler's `wrangler.jsonc` configures the `hdc-website-production` Worker to serve static assets from the repository root.

The production domain is already routed to the production site. This is an established Cloudflare deployment, not the earlier Hostinger-to-Cloudflare migration proposal. Do not re-create the Worker, change DNS, attach another domain, or add backend bindings as part of routine site updates.

The public site deployment is static. The separate HDC backend candidate and any private D1/R2 resources are not part of this public static-asset deployment unless a later approved change explicitly adds them.

## Release path

1. Make a focused change on a feature branch.
2. Open a pull request targeting `main`.
3. GitHub Actions runs the **HDC Integration Guard**. It validates local page references, IDs, asset integrity, generated design tokens, Wrangler static-asset configuration, and the responsive UI with Chromium and WebKit.
4. Review and merge the pull request to `main`.
5. Cloudflare builds and deploys the updated `main` revision to the production Worker.
6. The main-branch workflow waits for deployment propagation, smoke-tests the Worker homepage, and checks promoted pages and assets.
7. Verify the live domain when the change affects customer-visible content or layout.

GitHub Actions validates the candidate; Cloudflare performs the production deployment. A branch push alone does not publish the production site.

## Historical verified release — PR #100

- **PR:** [#100 — Move homepage services below hero](https://github.com/rehmantraders550-lab/hdc-website-production/pull/100)
- **Merge commit:** `37fa654f8ee5ded3e6236478abe1f7e3d4c3c3c3`
- **Changes:** moved the complete “What We Print” service section directly after the homepage hero; changed the first panel display title to “Labels & Stickers.” The catalogue filter and dedicated service page remain “Labels & Decals.”
- **Checks:** static site/asset validation and responsive browser tests passed.
- **Cloudflare deployment:** `c576f046-d414-430b-a7b2-0116ba80979f`, recorded 2026-10-20 at 08:58 UTC.
- **Live verification:** fetched the production homepage and confirmed the order `#home` → `#services` → `#products`, and the updated “Labels & Stickers” title.

The mobile-header wordmark adjustment discussed separately was not included in PR #100 and is not confirmed as deployed by this release.

## Configuration and deployment safety

- `wrangler.jsonc` names the production Worker `hdc-website-production`, points static assets to `.`, and enables `workers.dev` and preview URLs.
- `package.json` pins Wrangler and the build uses `npm run tokens:build`.
- `.assetsignore` controls which repository files are excluded from the public static site.
- Keep customer artwork, credentials, private data, and secrets out of the public repository and deployed asset directory.
- The current website enquiry flow is not to be described as database-backed unless a later implementation verifies persistent storage.
- Changes to the production domain, DNS, Worker bindings, secrets, or backend resources require a separate scoped change and explicit review.

## Historical note

The earlier migration plan described Hostinger as production and proposed creating a new `hdc-public-site` Worker. That plan was superseded when the production Worker became `hdc-website-production`; use the release path and target documented above for current work.
