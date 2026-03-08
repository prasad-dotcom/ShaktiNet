"""features/health/schemas.py"""
from pydantic import BaseModel
from typing import Optional, List


class HealthCheckin(BaseModel):
    mood: int           # 1-5
    stress_level: int   # 1-5
    notes: Optional[str] = None
    symptoms: Optional[List[str]] = []
