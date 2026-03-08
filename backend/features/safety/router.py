"""features/safety/router.py — SOS + Incident Reports"""
from fastapi import APIRouter, BackgroundTasks, Depends

from core.auth import get_current_user
from .schemas import SOSTrigger, IncidentReport
from .service import (
    trigger_sos_alert, resolve_sos_log,
    file_incident_report, get_my_reports,
)

router = APIRouter(tags=["Safety"])


@router.post("/sos/trigger")
def trigger_sos(
    data: SOSTrigger,
    background_tasks: BackgroundTasks,
    user: dict = Depends(get_current_user),
):
    """[User] Trigger emergency SOS."""
    return trigger_sos_alert(data, user)


@router.patch("/sos/{log_id}/resolve")
def resolve_sos(log_id: str, user: dict = Depends(get_current_user)):
    """[User] Mark SOS as resolved."""
    return resolve_sos_log(log_id, user)


@router.post("/report")
def report_incident(report: IncidentReport, user: dict = Depends(get_current_user)):
    """[User] Anonymously file a GBV / harassment report."""
    return file_incident_report(report, user)


@router.get("/report/my")
def my_reports(user: dict = Depends(get_current_user)):
    """[User] View your non-anonymous reports."""
    return get_my_reports(user["id"])
