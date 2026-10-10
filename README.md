# HDC Website Production

Private production repository for the Hadi Digital Craft website.

## Production pipeline

```text
ChatGPT → GitHub pull request / `main` → Cloudflare Workers Static Assets → HDC Worker
```

**Platform:** Cloudflare Workers Static Assets (`hdc-website-production.rehmantraders550.workers.dev`)  
**Business:** specialised commercial printing services only  
**Visual doctrine:** Engineered Tactility

HDC does **not** sell printers, machinery, printing equipment, or printing hardware.

## Canonical project state

See:

- `docs/HDC_CURRENT_PRODUCTION_STATE.md`
- `docs/HDC_APPROVED_ASSET_MANIFEST.md`

The current homepage architecture contains 12 production-defined sections from Hero through final brand close. The customer-facing service architecture is Labels & Decals; Products & Object Printing; Packaging & Commercial Print; and Large Format & Brand Environments. Events & Personalisation is an application category. Earlier Shopify-specific implementation wording is obsolete; valid Phase 4–5 architecture, visual, interaction, responsive, evidence and QA rules are to be implemented in the Hostinger/custom-code stack.

## Repository structure

```text
/
  index.html
  assets/
    brand/
    css/
    js/
    images/
      approved/
      projects/
    videos/
      approved/
  docs/
```

## Media rules

- Keep raw AI/source image and video files outside the production repo.
- Upload only optimized website derivatives.
- Use media as evidence of process, material, application, scale, production or quality.
- AI-generated imagery must not be represented as verified HDC client work.
- Machinery may appear as production evidence but never as an equipment-sales object.

## Security

- Keep database files outside GitHub unless they are safe backups with no passwords or private data.
- Never commit API keys, Hostinger passwords, database credentials, private keys or email credentials.

## Deployment

GitHub is the source of truth. Pull requests run the HDC Integration Guard and receive Cloudflare preview deployments. A push to `main` runs asset and route smoke checks against `https://hdc-website-production.rehmantraders550.workers.dev`; Cloudflare serves the static assets configured in `wrangler.jsonc`. Keep custom-domain routing as a separate DNS/deployment setting.
