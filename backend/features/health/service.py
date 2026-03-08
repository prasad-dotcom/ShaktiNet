"""features/health/service.py"""
from datetime import datetime

from db import store
from .schemas import HealthCheckin


def log_checkin(data: HealthCheckin, user: dict) -> dict:
    uid = user["id"]
    if uid not in store.health_logs:
        store.health_logs[uid] = []
    entry = {
        **data.dict(),
        "date": datetime.utcnow().date().isoformat(),
        "logged_at": datetime.utcnow().isoformat(),
    }
    store.health_logs[uid].append(entry)

    if data.stress_level >= 4:
        tip = "Your stress seems high today. Try 5 minutes of deep breathing. iCall: 9152987821"
    elif data.mood <= 2:
        tip = "It's okay to not be okay. Consider talking to someone you trust today."
    else:
        tip = "You're doing great! Keep going 💪"

    return {"message": "Check-in logged", "tip": tip}


def get_history(user_id: str) -> list:
    return store.health_logs.get(user_id, [])
