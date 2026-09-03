# HDC Website Production

Private production repository for the Hadi Digital Craft website.

## Deployment path

Recommended workflow:

```text
ChatGPT / local edits → GitHub private repo → Hostinger Git deployment → live website
```

## Hostinger setup

In Hostinger hPanel:

1. Open the HDC website.
2. Go to **Advanced → Git**.
3. Connect this repository.
4. Deploy to the website root, usually `public_html`.
5. Use the `main` branch.

## Important rules

- Keep raw AI image/video files outside the repo.
- Upload only optimized website assets to `assets/images/` and `assets/videos/`.
- Keep database files outside GitHub unless they are safe backups with no passwords or private data.
- Do not commit API keys, Hostinger passwords, database passwords, or email credentials.

## Suggested structure

```text
/
  index.html
  assets/
    css/
    js/
    images/
    videos/
  docs/
```
