"""features/business/schemas.py"""
from pydantic import BaseModel
from typing import Optional


class BusinessListing(BaseModel):
    business_name: str
    category: str
    description: str
    city: str
    contact_email: str
    website: Optional[str] = None
    instagram: Optional[str] = None
