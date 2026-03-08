"""features/jobs/service.py"""
import uuid
from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from db import store
from .schemas import JobPost


def list_approved_jobs(category: Optional[str], job_type: Optional[str], city: Optional[str]) -> list:
    result = [j for j in store.jobs_db.values() if j["approved"]]
    if category:
        result = [j for j in result if category.lower() in j["category"].lower()]
    if job_type:
        result = [j for j in result if j["job_type"] == job_type]
    if city:
        result = [j for j in result if city.lower() in j["location"].lower()]
    return result


def get_my_jobs(user_id: str) -> list:
    return [j for j in store.jobs_db.values() if j["posted_by"] == user_id]


def create_job(job: JobPost, user: dict) -> dict:
    if not user["verified"]:
        raise HTTPException(status_code=403, detail="Employer account pending admin verification")
    job_id = str(uuid.uuid4())
    entry = {
        **job.dict(),
        "id": job_id,
        "posted_by": user["id"],
        "employer_name": user["name"],
        "approved": user["role"] == "admin",
        "created_at": datetime.utcnow().isoformat(),
        "applications": 0,
    }
    store.jobs_db[job_id] = entry
    return {"message": "Job submitted for review", "job_id": job_id}


def delete_job_by_id(job_id: str, user: dict) -> dict:
    job = store.jobs_db.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job["posted_by"] != user["id"] and user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not your job post")
    del store.jobs_db[job_id]
    return {"message": "Job deleted"}
