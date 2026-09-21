#!/usr/bin/env python3
from __future__ import annotations
import hashlib, json, re, sys
from pathlib import Path
from urllib.parse import unquote

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "asset-manifest.json"
TEXT_EXTS = {".html", ".css", ".js"}
ASSET_EXTS = {".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".mp4", ".webm", ".css", ".js", ".html", ".ico"}
MAX_ASSET_BYTES = 4 * 1024 * 1024

REF_RE = re.compile(r"""(?:src|href|poster)\s*=\s*["']([^"']+)["']""", re.I)
CSS_URL_RE = re.compile(r"""url\(\s*["']?([^"')]+)["']?\s*\)""", re.I)
ID_RE = re.compile(r"""\bid\s*=\s*["']([^"']+)["']""", re.I)

errors, warnings = [], []
checked_refs = 0

def local_ref(value: str):
    value = value.strip()
    if not value or value.startswith(("#","mailto:","tel:","data:","javascript:")):
        return None
    if "${" in value or "{{" in value:
        return None
    if re.match(r"^[a-z][a-z0-9+.-]*://", value, re.I):
        return None
    value = unquote(value.split("#",1)[0].split("?",1)[0])
    return value or None

def resolve_ref(source: Path, ref: str):
    if ref.startswith("/"):
        return ROOT / ref.lstrip("/")
    if source.suffix.lower() == ".js":
        return (ROOT / ref).resolve()
    return (source.parent / ref).resolve()

def check_ref(source: Path, raw: str):
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
            dupes = sorted(k for k,v in counts.items() if v > 1)
            if dupes:
                errors.append(f"{rel} -> duplicate id(s): {', '.join(dupes)}")
        if "data:image/" in text:
            errors.append(f"{rel} -> embedded base64 image data is not allowed in production")
        if "localhost" in text or "127.0.0.1" in text:
            errors.append(f"{rel} -> contains localhost reference")
    if path.suffix.lower() in ASSET_EXTS and path.stat().st_size > MAX_ASSET_BYTES:
        warnings.append(f"{rel} -> large asset {path.stat().st_size/1024/1024:.2f} MB")

for req in [ROOT/"index.html", ROOT/"assets/css/styles.css", ROOT/"assets/js/site.js", MANIFEST]:
    if not req.exists():
        errors.append(f"required production file missing: {req.relative_to(ROOT)}")

if MANIFEST.exists():
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    seen_slots, seen_paths, pixel_hashes = set(), {}, {}
    for item in data.get("slots", []):
        slot, relpath = item["slot"], item["path"]
        if slot in seen_slots:
            errors.append(f"manifest duplicate slot: {slot}")
        seen_slots.add(slot)
        p = ROOT / relpath
        if not p.exists():
            errors.append(f"manifest missing asset: {relpath}")
            continue
        seen_paths.setdefault(relpath, []).append(slot)
        if p.suffix.lower() in {".webp",".jpg",".jpeg",".png"}:
            try:
                with Image.open(p) as im:
                    w,h = im.size
                    if (w,h) != (item["width"], item["height"]):
                        errors.append(f"{relpath} -> dimensions {w}x{h}, manifest says {item['width']}x{item['height']}")
                    rgb = im.convert("RGB")
                    pixhash = hashlib.sha256(rgb.tobytes()).hexdigest()
                    pixel_hashes.setdefault(pixhash, []).append((slot, relpath))
                    ratio = w / h
                    if slot.endswith("hero.poster") and abs(ratio - 16/9) > 0.05:
                        errors.append(f"{relpath} -> hero poster aspect ratio must be ~16:9")
                    if "service." in slot and not (1.25 <= ratio <= 1.85):
                        warnings.append(f"{relpath} -> unusual service-card aspect ratio {ratio:.2f}")
            except Exception as exc:
                errors.append(f"{relpath} -> image decode failed: {exc}")
        sha256 = hashlib.sha256(p.read_bytes()).hexdigest()
        item["sha256_runtime"] = sha256

    for pixhash, entries in pixel_hashes.items():
        unique_paths = sorted(set(path for _,path in entries))
        if len(unique_paths) > 1:
            errors.append("duplicate live image pixels: " + " | ".join(f"{slot}:{path}" for slot,path in entries))

    for path, slots in seen_paths.items():
        if len(slots) > 1:
            warnings.append(f"{path} -> reused in multiple semantic slots: {', '.join(slots)}")

videos = ROOT / "assets/videos"
if not (videos.exists() and list(videos.rglob("*.mp4"))):
    warnings.append("no MP4 found under assets/videos; confirm hero fallback is intentional")

print(f"HDC integration validation: {checked_refs} local references checked")
for w in warnings: print(f"WARNING: {w}")
for e in errors: print(f"ERROR: {e}")
if errors:
    print(f"FAILED: {len(errors)} blocking issue(s), {len(warnings)} warning(s)")
    sys.exit(1)
print(f"PASSED: 0 blocking issues, {len(warnings)} warning(s)")
