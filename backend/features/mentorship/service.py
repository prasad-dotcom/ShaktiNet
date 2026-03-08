"""features/mentorship/service.py"""
import uuid
from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from db import store
from .schemas import MentorProfile, MentorshipRequest


def list_mentors(expertise: Optional[str]) -> list:
    result = [m for m in store.mentors_db.values() if m.get("active")]
    if expertise:
        result = [m for m in result if any(expertise.lower() in e.lower() for e in m["expertise"])]
    return result


def register_mentor(profile: MentorProfile, user: dict) -> dict:
    store.mentors_db[user["id"]] = {
        **profile.dict(),
        "mentor_id": user["id"],
        "name": user["name"],
        "city": user.get("city"),
        "active": True,
        "registered_at": datetime.utcnow().isoformat(),
    }
    return {"message": "You are now registered as a mentor!"}


def send_mentorship_request(data: MentorshipRequest, user: dict) -> dict:
    if data.mentor_id not in store.mentors_db:
        raise HTTPException(status_code=404, detail="Mentor not found")
    store.mentorship_requests.append({
        **data.dict(),
        "id": str(uuid.uuid4()),
        "from_user": user["id"],
        "from_name": user["name"],
        "status": "pending",
        "requested_at": datetime.utcnow().isoformat(),
    })
    return {"message": "Mentorship request sent!"}
