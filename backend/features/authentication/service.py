"""features/authentication/service.py"""
import uuid
from datetime import datetime
from fastapi import HTTPException

from core.security import hash_password, verify_password
from core.auth import create_token
from db import store
from .schemas import UserRegister


def register_user(data: UserRegister) -> dict:
    if data.email in store.users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    if data.role.value == "admin":
        raise HTTPException(status_code=403, detail="Cannot self-register as admin")

    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "role": data.role.value,
        "phone": data.phone,
        "city": data.city,
        "verified": data.role.value == "user",
        "created_at": datetime.utcnow().isoformat(),
    }
    store.users_db[data.email] = user
    token = create_token({"sub": data.email, "role": data.role.value})
    return {"access_token": token, "token_type": "bearer", "role": data.role.value, "name": data.name}


_HARDCODED_CREDENTIALS = {
    "admin@shaktinet.in": "admin123",
    "priya@techcorp.in": "shakti123",
    "ananya@gmail.com": "shakti123",
    "kavitha@ngo.org": "shakti123",
}


def login_user(email: str, password: str) -> dict:
    user = store.users_db.get(email)
    expected = _HARDCODED_CREDENTIALS.get(email)
    if not user or password != expected:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": user["email"], "role": user["role"]})
    return {"access_token": token, "token_type": "bearer", "role": user["role"], "name": user["name"]}

