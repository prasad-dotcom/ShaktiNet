"""features/achievers/service.py"""
import uuid
from datetime import datetime

from db import store
from .schemas import AchieverNomination


def get_approved_achievers() -> list:
    return [a for a in store.achievers if a.get("status") == "approved"]


def nominate_achiever(data: AchieverNomination, user: dict) -> dict:
    entry = {
        **data.dict(),
        "id": str(uuid.uuid4()),
        "photo_url": None,
        "submitted_by": user["name"],
        "status": "pending",
        "submitted_at": datetime.utcnow().isoformat(),
    }
    store.nominations.append(entry)
    return {"message": "Nomination submitted! Our team will review it."}
