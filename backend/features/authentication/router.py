"""features/authentication/router.py"""
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from core.auth import get_current_user
from .schemas import UserRegister, Token, UserOut
from .service import register_user, login_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=Token)
def register(data: UserRegister):
    """Register as user or employer (admin role blocked)."""
    return register_user(data)


@router.post("/login", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends()):
    """Login with email + password (OAuth2 form)."""
    return login_user(form.username, form.password)


@router.get("/me", response_model=UserOut)
def me(user: dict = Depends(get_current_user)):
    """Return the authenticated user's profile."""
    return user

