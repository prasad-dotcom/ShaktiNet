"""core/auth.py — JWT creation + FastAPI dependency helpers."""
from datetime import datetime, timedelta
from typing import List

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from config.settings import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from db import store

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def create_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if not email or email not in store.users_db:
            raise HTTPException(status_code=401, detail="Invalid token")
        return store.users_db[email]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired — please log in again")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


def require_role(*roles: str):
    """Factory: returns a FastAPI dependency that enforces one of the given roles."""
    def checker(user: dict = Depends(get_current_user)):
        if user["role"] not in roles:
            raise HTTPException(
                status_code=403,
                detail=f"Access denied. Required: {list(roles)}, you have: {user['role']}",
            )
        return user
    return checker
