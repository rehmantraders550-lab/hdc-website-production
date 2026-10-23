#!/usr/bin/env python3
"""HDC RecordSync: dependency-free PR release-note gate and source freshness check.

GitHub is canonical. This script does NOT have ChatGPT Library access.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys
import urllib.error
import urllib.request

MANIFEST_PATH = Path("docs/HDC_RECORDSYNC_MANIFEST.json")
IGNORED_HISTORY = (
    ":(exclude)docs", ":(exclude).github", ":(exclude)scripts",
    ":(exclude)tests", ":(exclude).orvia", ":(exclude)README.md",
)


def material_path(path):
    """Identify changes requiring an auditable release note."""
    return not (path.startswith("docs/") or path in
                (".github/pull_request_template.md", "README.md"))


def assess_changed_paths(paths):
    paths = set(paths)
    material = [p for p in paths if material_path(p)]
    if not material:
        return True, "Documentation-only change; release candidate not required."
    releases = [p for p in paths
                if p.startswith("docs/releases/") and p.endswith(".md")]
    if releases:
        return True, f"{len(material)} material paths; release note: {sorted(releases)[0]}"
    return False, (f"{len(material)} material paths require a new "
                   "docs/releases/*.md release candidate documenting scope, QA and rollback.")


def pr_changed_files(event, env):
    repo = env.get("GITHUB_REPOSITORY", "")
    number = event.get("number")
    token = env.get("GITHUB_TOKEN", "")
    if not repo or not isinstance(number, int) or not token:
        raise ValueError("Missing repository, PR number or read-only GITHUB_TOKEN")
    api = env.get("GITHUB_API_URL", "https://api.github.com").rstrip("/")
    result = []
    for page in range(1, 101):
        url = f"{api}/repos/{repo}/pulls/{number}/files?per_page=100&page={page}"
        request = urllib.request.Request(url, headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "hdc-recordsync"})
        with urllib.request.urlopen(request, timeout=20) as response:
            batch = json.load(response)
        if not isinstance(batch, list):
            raise ValueError("Unexpected GitHub PR file-list response")
        result.extend(row["filename"] for row in batch)
        if len(batch) < 100:
            return result
    raise ValueError("PR exceeds 10,000 changed files; refusing partial check")


def latest_material_commit():
    p = subprocess.run(
        ["git", "log", "-1", "--format=%H", "HEAD", "--", ".", *IGNORED_HISTORY],
        text=True, capture_output=True, check=True)
    return p.stdout.strip()


def report(name, message, kind="info"):
    prefix = "::error" if kind == "error" else "::warning" if kind == "warning" else ""
    if prefix:
        print(f"{prefix} title={name}::{message}")
    else:
        print(f"{name}: {message}")
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as out:
            out.write(f"- **{name}** ({kind}): {message}\n")


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=("pr-check", "audit"), required=True)
    args = parser.parse_args(argv)
    if args.mode == "pr-check":
        if os.environ.get("GITHUB_EVENT_NAME") != "pull_request":
            report("RecordSync PR Gate", "Push event: PR file gate not applicable")
            return 0
        try:
            with open(os.environ["GITHUB_EVENT_PATH"], encoding="utf-8") as f:
                paths = pr_changed_files(json.load(f), os.environ)
            ok, message = assess_changed_paths(paths)
        except (KeyError, OSError, ValueError, urllib.error.URLError) as exc:
            report("RecordSync PR Gate", f"Unable to verify: {exc}", "error")
            return 1
        report("RecordSync PR Gate", message, "info" if ok else "error")
        return 0 if ok else 1
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        recorded = manifest["library_snapshot"]["last_material_source_commit"]
        actual = latest_material_commit()
        if not actual or not recorded or len(recorded) != 40:
            raise ValueError("Missing or invalid release SHA")
    except (KeyError, OSError, ValueError, subprocess.CalledProcessError) as exc:
        report("RecordSync Source Audit", str(exc), "error")
        return 1
    if actual == recorded:
        report("RecordSync Source Audit",
               f"SOURCE ALIGNED: {actual[:12]}. Library upload/readback is separately verified.")
    else:
        report("RecordSync Source Audit",
               f"LIBRARY RECONCILIATION NEEDED: newest material source {actual[:12]} "
               f"differs from recorded snapshot {recorded[:12]}.",
               "warning")
    return 0  # Never break a live website solely due to mirror lag.


if __name__ == "__main__":
    sys.exit(main())
