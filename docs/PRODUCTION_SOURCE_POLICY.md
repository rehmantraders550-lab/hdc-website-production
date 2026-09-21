# HDC Production Source Policy

The only normal production source is GitHub `main`.

## Locked route

```
approved branch
-> automated validation
-> visual approval
-> merge to main
-> Hostinger Git deployment
-> live smoke verification
```

## Prohibited normal-route behavior

- Do not manually overwrite `public_html` for routine releases.
- Do not inject images as Base64 into HTML, CSS or JavaScript.
- Do not point a page at an image before the image exists in the repository.
- Do not treat a GitHub commit as "deployed" until the live smoke check passes.
- Do not delete repository assets as part of automated cleanup.

Manual `public_html` upload is an emergency recovery path only. Any emergency server-side change must be reconciled back into GitHub before the next release.

## Media rule

Every live image must appear in `assets/asset-manifest.json` with:
- semantic slot
- repository path
- expected dimensions
- aspect classification
- source Git blob checksum
- lifecycle status

CI blocks missing assets, wrong dimensions, broken references, inline Base64 images and duplicate decoded image pixels used as different live assets.
