"""
db/store.py — In-memory data store loaded from seed_data.json.
All features import from here. Lists/dicts are mutated in-place at runtime.
"""
import json
import copy
from pathlib import Path

_SEED_PATH = Path(__file__).parent / "seed_data.json"


def _load():
    with open(_SEED_PATH, "r", encoding="utf-8") as f:
        raw = json.load(f)
    return raw


_seed = _load()

# ── Keyed dicts for O(1) lookup ──────────────────────────────────────────────
# users keyed by email
users_db: dict = {u["email"]: copy.deepcopy(u) for u in _seed["users"]}

# jobs keyed by id
jobs_db: dict = {j["id"]: copy.deepcopy(j) for j in _seed["jobs"]}

# mentors keyed by user id
mentors_db: dict = {m["mentor_id"]: copy.deepcopy(m) for m in _seed.get("mentors", [])}

# ── Plain lists ──────────────────────────────────────────────────────────────
businesses: list = copy.deepcopy(_seed["businesses"])
achievers: list  = copy.deepcopy(_seed["achievers"])
nominations: list = copy.deepcopy(_seed.get("nominations", []))
sos_logs: list   = copy.deepcopy(_seed.get("sos_logs", []))
reports: list    = copy.deepcopy(_seed.get("reports", []))
mentorship_requests: list = copy.deepcopy(_seed.get("mentorship_requests", []))

# health_logs keyed by user_id → list of check-ins
health_logs: dict = copy.deepcopy(_seed.get("health_logs", {}))
