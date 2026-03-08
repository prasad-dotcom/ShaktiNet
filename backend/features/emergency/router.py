# router.py for Emergency feature

from fastapi import APIRouter
from .schemas import EmergencyContactCreate, EmergencyContactOut
from .service import create_contact, get_contact_by_id

router = APIRouter(prefix="/emergency", tags=["Emergency"])

@router.post("/contact", response_model=EmergencyContactOut)
async def add_contact(contact: EmergencyContactCreate):
    return await create_contact(contact)

@router.get("/contact/{contact_id}", response_model=EmergencyContactOut)
async def get_contact(contact_id: str):
    return await get_contact_by_id(contact_id)
