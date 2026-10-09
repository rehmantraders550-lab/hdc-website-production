# Cloudflare Website Pipeline

**Status:** Worker configuration staged for review. The current public site remains on Hostinger. No Worker has been deployed for this site, and no custom domain or DNS setting has changed.

## Source of truth

Use `rehmantraders550-lab/hdc-website-production` as the canonical source for HDC's current public HTML pages, CSS, JavaScript, approved media, and asset manifest. Keep these files in this repository.

Keep `HDC-ENGINEERED-TACTILITY/worker` as a separate backend candidate. It has D1/R2-backed quote and admin features, but it is a different implementation from the public static site. Do not connect the two during the first deployment.

The other Cloudflare-connected repositories are not substitutes for the public site:

- `hdc-engineered-tactility12` is an empty placeholder; its configured `/worker` path is absent.
- `HDC-RELOADED` is a PHP/MySQL Hostinger application, while its Cloudflare setup runs a Wrangler Worker deploy command.
- The existing `HDC-ENGINEERED-TACTILITY` deployment is behind its GitHub source, and its backend preview resources are not verified as isolated.

Do not delete or consolidate any of those repositories or Cloudflare resources for this migration.

## Deployment target

Use a new Cloudflare Worker named `hdc-public-site` with **Workers Static Assets**. It serves the existing HTML, CSS, JavaScript, and media from this repository. It has no Worker script, database, storage bucket, secrets, or paid form service.

- `wrangler.jsonc` points the static assets directory to the repository root and enables preview URLs.
- `.assetsignore` keeps repository documentation, automation, scripts, and the product CSV out of the public deployment.
- `package.json` pins Cloudflare's Wrangler CLI for the build and preview commands; it adds no runtime dependency.
- Keep the Worker on its `workers.dev` URL during acceptance. Do not attach `hadidigitalcraft.com yet.

The current quote form prepares an email or WhatsApp handoff. It does not store submissions. Verify that behavior on the preview URL and do not describe it as a database-backed form.

## Intended workflow

1. ChatGPT proposes a focused change on a branch; a human reviews the diff and pull request.
2. GitHub Actions checks local links, required files, manifest references, duplicate HTML IDs, and asset integrity.
3. Cloudflare Workers Builds creates a branch preview for review. It uses Workers Preview settings; this static-only Worker has no shared database or storage bindings.
4. A human checks the preview across important routes, images, responsive layouts, and enquiry behavior.
5. An approved merge to `main` deploys the static assets to the isolated `hdc-public-site` Worker on `workers.dev`.
6. Smoke-check the deployed Worker URL. Change the custom domain only as a separate, explicitly approved cutover with a rollback path.

GitHub validation and human review must happen before merging to `main`. Cloudflare deployment automation does not replace a protected branch or a human review gate.

## First Cloudflare connection

After this configuration is reviewed and merged:

1. In Cloudflare, open **Workers & Pages** → **Create application** → **Get started** next to **Import a repository**.
2. Authorize Cloudflare's GitHub app for `hdc-website-production` only.
3. Set the Worker name to `hdc-public-site`, the production branch to `main`, and the root directory to the repository root.
4. Leave the build command blank. Use Wrangler for deploy and preview; the repository pins its CLI version.
5. Enable preview builds and confirm the preview URL uses Worker Previews.
6. Leave custom domains and all D1/R2 bindings unset.

The Worker name must match `name` in `wrangler.jsonc`. Cloudflare Workers Builds requires this match.

## Existing pipeline assumptions and risks

| Risk | Current evidence | Handling |
|---|---|---|
| Hostinger live check | Existing GitHub workflow waits 90 seconds and checks `hadidigitalcraft.com` | Keep it while Hostinger remains production; it is not a Cloudflare deployment check |
| GitHub Actions dependency | Existing static validator runs on a hosted runner and installs Pillow from PyPI | It is CI-only; no package is added to the website runtime |
| Cloudflare access | The Cloudflare API connection rejected project creation with an authentication error | Connect the new Worker through the dashboard's GitHub authorization flow |
| Worker preview safety | Existing backend Worker uses D1/R2 | Do not reuse it for the public site; new static Worker has no data bindings |
| Existing quote handoff | Email/WhatsApp only | Validate it on preview; backend storage is a later, separate change |
| Public repository | The canonical source repo is public | Keep secrets and private/customer data out of Git; exclude non-site files from deployed assets |
| Multiple implementations | Static site, Worker backend, and PHP app coexist | Keep the static repository canonical for the public site and avoid blind merges |

## Cost and dependencies

Static asset requests on Workers are free. The first deployment adds no runtime service or third-party form provider. Wrangler is the only deployment tool dependency and is pinned in `package.json`. Check current account limits before adding any dynamic Worker code or paid products.
