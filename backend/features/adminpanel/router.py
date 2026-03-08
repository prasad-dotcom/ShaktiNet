"""features/adminpanel/router.py"""
from fastapi import APIRouter, Depends

from core.auth import require_role
from .service import (
    list_all_users, verify_user_by_id, change_user_role,
    list_pending_jobs, approve_job_by_id, delete_job_by_id,
    list_all_reports, list_all_nominations, approve_nomination_by_id,
    list_sos_history, platform_stats, verify_business_by_id,
)

router = APIRouter(prefix="/admin", tags=["Admin"])


# ── Users ──
@router.get("/users")
def users(admin=Depends(require_role("admin"))):
    return list_all_users()


@router.patch("/users/{user_id}/verify")
def verify_user(user_id: str, admin=Depends(require_role("admin"))):
    return verify_user_by_id(user_id)


@router.patch("/users/{user_id}/role")
def change_role(user_id: str, new_role: str, admin=Depends(require_role("admin"))):
    return change_user_role(user_id, new_role)


# ── Jobs ──
@router.get("/jobs/pending")
def pending_jobs(admin=Depends(require_role("admin"))):
    return list_pending_jobs()


@router.patch("/jobs/{job_id}/approve")
def approve_job(job_id: str, admin=Depends(require_role("admin"))):
    return approve_job_by_id(job_id)


@router.delete("/jobs/{job_id}")
def delete_job(job_id: str, admin=Depends(require_role("admin"))):
    return delete_job_by_id(job_id)


# ── Reports / Nominations ──
@router.get("/reports")
def reports(admin=Depends(require_role("admin"))):
    return list_all_reports()


@router.get("/nominations")
def nominations(admin=Depends(require_role("admin"))):
    return list_all_nominations()


@router.patch("/nominations/{nom_id}/approve")
def approve_nomination(nom_id: str, admin=Depends(require_role("admin"))):
    return approve_nomination_by_id(nom_id)


# ── SOS / Stats ──
@router.get("/sos-logs")
def sos_logs(admin=Depends(require_role("admin"))):
    return list_sos_history()


@router.get("/stats")
def stats(admin=Depends(require_role("admin"))):
    return platform_stats()


@router.patch("/businesses/{biz_id}/verify")
def verify_business(biz_id: str, admin=Depends(require_role("admin"))):
    return verify_business_by_id(biz_id)
