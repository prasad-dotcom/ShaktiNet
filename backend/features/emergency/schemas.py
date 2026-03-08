# schemas.py for Emergency feature

from pydantic import BaseModel
from typing import Optional

class EmergencyContactCreate(BaseModel):
    user_id: str
    name: str
    phone: str

class EmergencyContactOut(BaseModel):
    id: str
    user_id: str
    name: str
    phone: str
