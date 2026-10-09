# Cloudflare Website Pipeline

**Status:** migration plan only. As of 2026-10-09, the current production route is still documented as Hostinger. No Pages project, custom-domain change, or production deployment is enabled by this document.

## Source of truth

Use `rehmantraders550-lab/hdc-website-production` as the canonical public website source for its current HTML pages, styles, scripts, approved media, and asset manifest. Do not copy these files into another repository to make deployment work.

Keep the Cloudflare Worker application in `HDC-ENGINEERED-TACTILITY/worker` as a separate backend candidate. It includes D1/R2-backed quote and admin features, but it is not the same implementation as the current static website. Connect the two only after an explicit interface and data-flow review.

The other Cloudflare-connected repositories are not deployable substitutes for the canonical site:

- `hdc-engineered-tactility12` is an empty placeholder; its configured `/worker` path is absent.
- `HDC-RELOADED` is a PHP/MySQL Hostinger application, while its Cloudflare configuration runs `npx wrangler deploy`.
- `HDC-ENGINEERED-TACTILITY` contains a real Worker, but the observed Cloudflare deployment is older than the latest GitHub commit and its preview data resources have not been shown to be isolated.

Do not delete or consolidate any of these repositories or Cloudflare resources as part of this migration.

## Intended workflow

1. ChatGPT prepares a narrowly scoped change on a branch. A human checks the diff and opens or reviews its pull request.
2. GitHub validates local links, required files, manifest references, duplicate HTML IDs, and asset size before merge.
3. Cloudflare Pages deploys pull requests and non-main branches to review URLs. Review responsive layouts, all important routes, assets, and enquiry behavior there.
4. Only an approved merge to `main` may publish the Pages production deployment.
5. After deployment, smoke-check the homepage, critical pages, CSS/JS, and representative media on the Pages URL. Keep the existing Hostinger site and DNS unchanged until the Cloudflare copy passes acceptance.

The static site has no framework build step: the repository root is the Pages output. Keep the runtime dependency set at zero. The existing site enquiry form prepares an email and WhatsApp message; it does not persist submissions to the Worker database. Treat that behavior as an acceptance item, not as a working backend.

## Gates before enabling Cloudflare production

- Create a Pages project linked to this repository, with the correct root/output directory and production branch `main`.
- Confirm pull request previews build successfully and do not deploy to the existing custom domain.
- Require the GitHub validation check and human review before merge. A Git push to `main` can otherwise publish without the intended review.
- Replace or split the current Hostinger live-smoke job only after the target is chosen. That job waits 90 seconds and tests `hadidigitalcraft.com`; it does not verify Cloudflare Pages.
- Verify that the Pages project name, `pages.dev` URL, canonical tags, redirects, 404 behavior, and media paths are correct.
- Change the custom domain only as a separate cutover step with the accepted Pages deployment available and a rollback path.

The Cloudflare Pages project has not been created yet: the available Cloudflare API connection returned an authentication error on the create request. No Cloudflare resource or DNS setting was changed.

## Hidden dependencies and failure modes

| Dependency or risk | Current evidence | Required handling |
|---|---|---|
| Hostinger deployment assumptions | Existing GitHub workflow sleeps 90 seconds and checks the current domain | Keep it while Hostinger is production; add a distinct Pages smoke check before cutover |
| PyPI/Pillow | Current asset validator imports Pillow and CI installs it | Remove the package dependency or explicitly accept and pin it before treating that job as dependency-free |
| GitHub Actions | Current checks require a hosted runner and remote actions | Keep checks small; pin trusted actions and do not rely on Actions alone as the human approval gate |
| Cloudflare Git integration | Worker connections exist, but Pages project creation was not authorized by the API connection | Grant the required Pages project permissions or create/link the project in Cloudflare UI |
| Quote submission | Static form creates an email/WhatsApp handoff | Do not claim submissions are stored; integrate the Worker only after preview D1/R2 isolation and end-to-end testing |
| Worker preview data | The Worker config includes production D1/R2 bindings and no confirmed preview-specific bindings | Do not exercise write paths on previews until preview resources are separated and verified |
| Repository visibility | Canonical repo is public | Keep credentials and customer/private data out of Git; public website assets are intentionally accessible |
| Multiple source copies | Older static, Worker, and PHP implementations coexist | Keep this repo canonical for the public static site; make backend ownership an explicit later decision |

## Cost boundary

Pages for static assets is the intended low-cost first deployment. Do not add paid storage, analytics, form vendors, image CDNs, or a framework just to publish this static site. Confirm current account limits and any custom-domain cost before cutover; this plan does not change billing or DNS.
