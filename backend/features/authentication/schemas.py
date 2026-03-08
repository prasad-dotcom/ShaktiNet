"""features/authentication/schemas.py"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class Role(str, Enum):
    admin    = "admin"
    employer = "employer"
    user     = "user"


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Role = Role.user
    phone: Optional[str] = None
    city: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    role: str
    city: Optional[str]
    verified: bool
    created_at: str
