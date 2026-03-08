# schemas.py for AdminPanel feature

from pydantic import BaseModel
from typing import Optional

class AdminUserCreate(BaseModel):
    username: str
    email: str
    password: str

class AdminUserOut(BaseModel):
    id: str
    username: str
    email: str
    is_superadmin: bool
