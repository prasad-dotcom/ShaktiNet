"""features/mentorship/router.py"""
from typing import Optional
from fastapi import APIRouter, Depends

from core.auth import get_current_user
from .schemas import MentorProfile, MentorshipRequest
from .service import list_mentors, register_mentor, send_mentorship_request

router = APIRouter(prefix="/mentors", tags=["Mentorship"])


@router.get("/")
def get_mentors(expertise: Optional[str] = None):
    """[Public] Browse available mentors."""
    return list_mentors(expertise)


@router.post("/register")
def become_mentor(profile: MentorProfile, user: dict = Depends(get_current_user)):
    """[User] Register yourself as a mentor."""
    return register_mentor(profile, user)


@router.post("/request")
def request_mentor(data: MentorshipRequest, user: dict = Depends(get_current_user)):
    """[User] Send a mentorship request."""
    return send_mentorship_request(data, user)
