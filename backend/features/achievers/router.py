"""features/achievers/router.py"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user
from .schemas import AchieverNomination
from .service import get_approved_achievers, nominate_achiever

router = APIRouter(prefix="/achievers", tags=["Achievers"])


@router.get("/")
def achievers():
    """[Public] Return all approved achievers from seed data."""
    return get_approved_achievers()


@router.post("/nominate")
def nominate(data: AchieverNomination, user: dict = Depends(get_current_user)):
    """[User] Nominate a woman for the achievers wall."""
    return nominate_achiever(data, user)
