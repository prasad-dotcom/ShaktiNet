"""config/settings.py — App-wide configuration."""
import os

SECRET_KEY: str = os.getenv("SECRET_KEY", "shaktinet-secret-2026")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

ALLOWED_ORIGINS: list = [
    "http://localhost:5173",   # Vite default
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]
