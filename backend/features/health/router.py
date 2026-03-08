"""features/health/router.py"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user
from .schemas import HealthCheckin
from .service import log_checkin, get_history

router = APIRouter(prefix="/health", tags=["Health"])


@router.post("/checkin")
def checkin(data: HealthCheckin, user: dict = Depends(get_current_user)):
    """[User] Daily mental/physical health check-in."""
    return log_checkin(data, user)


@router.get("/history")
def history(user: dict = Depends(get_current_user)):
    """[User] View your health check-in history."""
    return get_history(user["id"])
