"""features/business/router.py"""
from typing import Optional
from fastapi import APIRouter, Depends

from core.auth import get_current_user
from .schemas import BusinessListing
from .service import list_businesses, add_business

router = APIRouter(prefix="/businesses", tags=["Business"])


@router.get("/")
def get_businesses(
    category: Optional[str] = None,
    city: Optional[str] = None,
    search: Optional[str] = None,
):
    """[Public] Browse women-led businesses."""
    return list_businesses(category, city, search)


@router.post("/")
def create_business(data: BusinessListing, user: dict = Depends(get_current_user)):
    """[User] List your women-led business."""
    return add_business(data, user)
