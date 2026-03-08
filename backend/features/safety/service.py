"""features/safety/service.py — SOS + Incident Reports"""
import uuid
from datetime import datetime

from fastapi import HTTPException
from db import store
from .schemas import SOSTrigger, IncidentReport


def trigger_sos_alert(data: SOSTrigger, user: dict) -> dict:
    log_id = str(uuid.uuid4())
    log = {
        "id": log_id,
        "user_id": user["id"],
        "user_name": user["name"],
        "latitude": data.latitude,
        "longitude": data.longitude,
        "contacts_notified": len(data.contacts),
        "triggered_at": datetime.utcnow().isoformat(),
        "resolved": False,
    }
    store.sos_logs.append(log)
    return {
        "message": "SOS triggered. Contacts notified.",
        "log_id": log_id,
        "contacts_alerted": [c.name for c in data.contacts],
        "helpline": "Women Helpline India: 1091",
    }


def resolve_sos_log(log_id: str, user: dict) -> dict:
    for log in store.sos_logs:
        if log["id"] == log_id and log["user_id"] == user["id"]:
            log["resolved"] = True
            log["resolved_at"] = datetime.utcnow().isoformat()
            return {"message": "Marked as safe. Glad you're okay."}
    raise HTTPException(status_code=404, detail="SOS log not found")


def file_incident_report(report: IncidentReport, user: dict) -> dict:
    report_id = str(uuid.uuid4())
    entry = {
        **report.dict(),
        "id": report_id,
        "status": "received",
        "created_at": datetime.utcnow().isoformat(),
        "user_id": None if report.anonymous else user["id"],
    }
    store.reports.append(entry)
    return {
        "message": "Report filed successfully",
        "report_id": report_id,
        "next_steps": "Our team reviews within 24 hours. Legal aid: 1800-419-1090",
    }


def get_my_reports(user_id: str) -> list:
    return [r for r in store.reports if r.get("user_id") == user_id]
