# models.py for Safety feature

from pydantic import BaseModel
from typing import Optional

class SafetyReport(BaseModel):
    id: Optional[str]
    user_id: str
    location: str
    description: str
    status: str = "open"
