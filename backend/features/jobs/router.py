"""features/jobs/router.py"""
from typing import Optional
from fastapi import APIRouter, Depends

from core.auth import get_current_user, require_role
from .schemas import JobPost
from .service import (
    list_approved_jobs, get_my_jobs,
    create_job, delete_job_by_id,
)

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/")
def get_jobs(
    category: Optional[str] = None,
    job_type: Optional[str] = None,
    city: Optional[str] = None,
):
    """[Public] Browse approved women-friendly jobs."""
    return list_approved_jobs(category, job_type, city)


@router.get("/my")
def my_jobs(user: dict = Depends(require_role("employer", "admin"))):
    """[Employer] View your own job postings."""
    return get_my_jobs(user["id"])


@router.post("/")
def post_job(job: JobPost, user: dict = Depends(require_role("employer", "admin"))):
    """[Employer/Admin] Post a women-friendly job."""
    return create_job(job, user)


@router.delete("/{job_id}")
def remove_job(job_id: str, user: dict = Depends(require_role("employer", "admin"))):
    """[Employer] Remove your own job posting."""
    return delete_job_by_id(job_id, user)
