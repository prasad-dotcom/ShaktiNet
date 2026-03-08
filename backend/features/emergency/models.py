# models.py for Emergency feature

from pydantic import BaseModel
from typing import Optional

class EmergencyContact(BaseModel):
    id: Optional[str]
    user_id: str
    name: str
    phone: str
