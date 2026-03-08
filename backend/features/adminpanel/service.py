"""features/adminpanel/service.py"""
from fastapi import HTTPException
from db import store


def list_all_users() -> list:
    return [
        {"id": u["id"], "name": u["name"], "email": u["email"],
         "role": u["role"], "verified": u["verified"]}
        for u in store.users_db.values()
    ]


def verify_user_by_id(user_id: str) -> dict:
    for email, user in store.users_db.items():
        if user["id"] == user_id:
            store.users_db[email]["verified"] = True
            return {"message": f"{user['name']} verified successfully"}
    raise HTTPException(status_code=404, detail="User not found")


def change_user_role(user_id: str, new_role: str) -> dict:
    for email, user in store.users_db.items():
        if user["id"] == user_id:
            store.users_db[email]["role"] = new_role
            return {"message": f"Role updated to {new_role}"}
    raise HTTPException(status_code=404, detail="User not found")


def list_pending_jobs() -> list:
    return [j for j in store.jobs_db.values() if not j["approved"]]


def approve_job_by_id(job_id: str) -> dict:
    if job_id not in store.jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    store.jobs_db[job_id]["approved"] = True
    return {"message": "Job approved and now live"}


def delete_job_by_id(job_id: str) -> dict:
    if job_id not in store.jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    del store.jobs_db[job_id]
    return {"message": "Job removed"}


def list_all_reports() -> list:
    return store.reports


def list_all_nominations() -> list:
    return store.nominations


def approve_nomination_by_id(nom_id: str) -> dict:
    for n in store.nominations:
        if n["id"] == nom_id:
            n["status"] = "approved"
            return {"message": "Nomination approved"}
    raise HTTPException(status_code=404, detail="Nomination not found")


def list_sos_history() -> list:
    return store.sos_logs


def platform_stats() -> dict:
    return {
        "total_users": len(store.users_db),
        "employers": sum(1 for u in store.users_db.values() if u["role"] == "employer"),
        "total_jobs": len(store.jobs_db),
        "approved_jobs": sum(1 for j in store.jobs_db.values() if j["approved"]),
        "total_sos_triggers": len(store.sos_logs),
        "total_reports": len(store.reports),
        "total_businesses": len(store.businesses),
        "nominations_pending": sum(1 for n in store.nominations if n.get("status") == "pending"),
        "active_mentors": len(store.mentors_db),
    }


def verify_business_by_id(biz_id: str) -> dict:
    for b in store.businesses:
        if b["id"] == biz_id:
            b["verified"] = True
            return {"message": "Business verified"}
    raise HTTPException(status_code=404, detail="Business not found")
