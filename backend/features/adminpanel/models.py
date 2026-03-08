# models.py for AdminPanel feature

from pydantic import BaseModel
from typing import Optional

class AdminUser(BaseModel):
    id: Optional[str]
    username: str
    email: str
    hashed_password: str
    is_superadmin: bool = False
