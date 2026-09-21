#!/usr/bin/env python3
from __future__ import annotations
import re, sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
TEXT_EXTS = {".html", ".css", ".js"}
ASSET_EXTS = {".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".mp4", ".webm", ".css", ".js", ".html", ".ico"}
MAX_ASSET_BYTES = 4 * 1024 * 1024

REF_RE = re.compile(r"(?:src|href|poster)\s*=\s*[\"']([^\"']+)[\"']", re.I)
CSS_URL_RE = re.compile(r"url\(\s*[\"']?([^\"')]+)[\"']?\s*\)", re.I)
ID_RE = re.compile(r"\bid\s*=\s*[\"']([^\"']+)[\"']", re.I)

errors = []
warnings = []
checked_refs = 0

def local_ref(value):
    value = value.strip()
    if not value or value.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None
    if re.match(r"^[a-z][a-z0-9+.-]*://", value, re.I):
        return None
    value = unquote(value.split("#", 1)[0].split("?", 1)[0])
    return value or None

def resolve_ref(source, ref):
    if ref.startswith("/"):
        return ROOT / ref.lstrip("/")
    return (source.parent / ref).resolve()

def check_ref(source, raw):
    global checked_refs
    ref = local_ref(raw)
    if not ref:
        return
    checked_refs += 1
    target = resolve_ref(source, ref)
    try:
        target.relative_to(ROOT)
    except ValueError:
        errors.append(f"{source.relative_to(ROOT)} -> path escapes repository: {raw}")
        return
    if not target.exists():
        errors.append(f"{source.relative_to(ROOT)} -> missing local reference: {raw}")

for path in sorted(ROOT.rglob("*")):
    if ".git" in path.parts or not path.is_file():
        continue
    rel = path.relative_to(ROOT)
    if path.suffix.lower() in TEXT_EXTS:
        text = path.read_text(encoding="utf-8", errors="replace")
        for m in REF_RE.finditer(text):
            check_ref(path, m.group(1))
        if path.suffix.lower() == ".css":
            for m in CSS_URL_RE.finditer(text):
                check_ref(path, m.group(1))
        if path.suffix.lower() == ".html":
            ids = ID_RE.findall(text)
            counts = {}
            for item in ids:
                counts[item] = counts.get(item, 0) + 1
            dupes = sorted(k for k, v in counts.items() if v > 1)
            if dupes:
                errors.append(f"{rel} -> duplicate id(s): {', '.join(dupes)}")
        if "data:image/" in text:
            warnings.append(f"{rel} -> contains embedded base64 image data; migrate to normal optimized assets")
        if "localhost" in text or "127.0.0.1" in text:
            errors.append(f"{rel} -> contains localhost reference")
    if path.suffix.lower() in ASSET_EXTS and path.stat().st_size > MAX_ASSET_BYTES:
        warnings.append(f"{rel} -> large asset {path.stat().st_size / 1024 / 1024:.2f} MB")

required = [ROOT / "index.html", ROOT / "assets/css/styles.css", ROOT / "assets/js/site.js"]
for req in required:
    if not req.exists():
        errors.append(f"required production file missing: {req.relative_to(ROOT)}")

videos = ROOT / "assets/videos"
hero_candidates = list(videos.rglob("*.mp4")) if videos.exists() else []
if not hero_candidates:
    warnings.append("no MP4 found under assets/videos; confirm hero fallback is intentional")

print(f"HDC integration validation: {checked_refs} local references checked")
for w in warnings:
    print(f"WARNING: {w}")
for e in errors:
    print(f"ERROR: {e}")
if errors:
    print(f"FAILED: {len(errors)} blocking issue(s), {len(warnings)} warning(s)")
    sys.exit(1)
print(f"PASSED: 0 blocking issues, {len(warnings)} warning(s)")
