# models.py for Jobs feature

from pydantic import BaseModel
from typing import Optional

class Job(BaseModel):
    id: Optional[str]
    title: str
    description: str
    company: str
    location: str
    posted_by: Optional[str]
