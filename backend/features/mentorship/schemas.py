"""features/mentorship/schemas.py"""
from pydantic import BaseModel
from typing import Optional, List


class MentorProfile(BaseModel):
    expertise: List[str]
    bio: str
    available_slots: int
    linkedin: Optional[str] = None
    languages: Optional[List[str]] = ["English"]


class MentorshipRequest(BaseModel):
    mentor_id: str
    message: str
    goals: str
