"""features/jobs/schemas.py"""
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class JobType(str, Enum):
    full_time  = "Full-Time"
    part_time  = "Part-Time"
    remote     = "Remote"
    freelance  = "Freelance"
    internship = "Internship"


class JobPost(BaseModel):
    title: str
    company: str
    description: str
    requirements: str
    salary_range: Optional[str] = None
    job_type: JobType
    location: str
    category: str
    women_friendly_perks: Optional[List[str]] = []
    application_link: Optional[str] = None
    deadline: Optional[str] = None


class JobOut(JobPost):
    id: str
    posted_by: str
    employer_name: str
    approved: bool
    created_at: str
    applications: int = 0
