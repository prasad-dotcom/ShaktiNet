"""features/safety/schemas.py — SOS + Incident Reports"""
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class SOSContact(BaseModel):
    name: str
    phone: str
    relation: str


class SOSTrigger(BaseModel):
    latitude: float
    longitude: float
    contacts: List[SOSContact]
    message: Optional[str] = "I need help. This is an emergency SOS from ShaktiNet."


class ReportCategory(str, Enum):
    workplace_harassment = "Workplace Harassment"
    domestic_violence    = "Domestic Violence"
    cyber_harassment     = "Cyber Harassment"
    discrimination       = "Discrimination"
    other                = "Other"


class IncidentReport(BaseModel):
    category: ReportCategory
    description: str
    location: Optional[str] = None
    date_of_incident: Optional[str] = None
    anonymous: bool = True
    need_legal_help: bool = False
    need_counseling: bool = False
