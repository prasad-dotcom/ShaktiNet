"""features/achievers/schemas.py"""
from pydantic import BaseModel
from typing import Optional


class AchieverNomination(BaseModel):
    name: str
    field: str
    reason: str
    year: Optional[str] = None
