"""Pure, local HDC RecordSync gate tests; zero external services."""
from pathlib import Path
import importlib.util

target = Path(__file__).resolve().parents[1] / "scripts" / "check_recordsync.py"
spec = importlib.util.spec_from_file_location("hdc_recordsync", target)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


def test_documentation_only():
    assert mod.assess_changed_paths(["docs/HDC_CURRENT_PRODUCTION_STATE.md"])[0]


def test_missing_candidate_fails():
    assert not mod.assess_changed_paths(["assets/js/new.js"])[0]


def test_release_candidate_passes():
    assert mod.assess_changed_paths([
        "assets/js/new.js", "docs/releases/HDC_RELEASE_CANDIDATE_2026-10-22.md"
    ])[0]


def test_workflow_changes_need_record():
    assert not mod.assess_changed_paths([".github/workflows/hdc-integration.yml"])[0]


def test_template_only_is_documentation():
    assert mod.assess_changed_paths([".github/pull_request_template.md"])[0]
