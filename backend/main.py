"""
ShaktiNet — FastAPI Entry Point
Registers all feature routers and global middleware.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.settings import ALLOWED_ORIGINS
from features.authentication.router import router as auth_router
from features.jobs.router           import router as jobs_router
from features.safety.router         import router as safety_router
from features.adminpanel.router     import router as admin_router
from features.achievers.router      import router as achievers_router
from features.business.router       import router as business_router
from features.mentorship.router     import router as mentorship_router
from features.health.router         import router as health_router
from features.resources.router      import router as resources_router

app = FastAPI(
    title="ShaktiNet API",
    version="1.0.0",
    description="Women Empowerment Platform — Happy Women's Day 2026 🌸",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register routers ──────────────────────────────────────────
app.include_router(auth_router)
app.include_router(jobs_router)
app.include_router(safety_router)
app.include_router(admin_router)
app.include_router(achievers_router)
app.include_router(business_router)
app.include_router(mentorship_router)
app.include_router(health_router)
app.include_router(resources_router)


@app.get("/", tags=["Health Check"])
def root():
    return {"status": "ShaktiNet API is live 🌸", "version": "1.0.0", "docs": "/docs"}

