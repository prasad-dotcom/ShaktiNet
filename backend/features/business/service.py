"""features/business/service.py"""
import uuid
from datetime import datetime
from typing import Optional

from db import store
from .schemas import BusinessListing


def list_businesses(category: Optional[str], city: Optional[str], search: Optional[str]) -> list:
    result = list(store.businesses)
    if category:
        result = [b for b in result if b["category"].lower() == category.lower()]
    if city:
        result = [b for b in result if city.lower() in b["city"].lower()]
    if search:
        result = [b for b in result if
                  search.lower() in b["business_name"].lower() or
                  search.lower() in b["description"].lower()]
    return result


def add_business(data: BusinessListing, user: dict) -> dict:
    entry = {
        **data.dict(),
        "id": str(uuid.uuid4()),
        "owner_id": user["id"],
        "owner_name": user["name"],
        "verified": False,
        "created_at": datetime.utcnow().isoformat(),
    }
    store.businesses.append(entry)
    return {"message": "Business listed! Pending verification.", "id": entry["id"]}
