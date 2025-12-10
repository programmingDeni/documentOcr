"""
FastAPI Application Entry Point
DocumentOCR Backend Server
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import documents

from app.database import Base, engine

# DB aufsetzen
Base.metadata.create_all(bind=engine)

# FastAPI App initialisieren
app = FastAPI(
    title="DocumentOCR API",
    description="API für OCR-Verarbeitung und Klassifizierung von Versicherungsdokumenten",
    version="1.0.0",
)

# CORS Middleware konfigurieren
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,  # z.B. ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Alle Header erlauben
)

# Router registrieren
app.include_router(
    documents.router,
    prefix="/api/documents",
    tags=["documents"]
)

# Health Check Endpoint
@app.get("/health", tags=["health"])
async def health_check():
    """Health Check für Container/Kubernetes Probes"""
    return {"status": "healthy"}


@app.get("/", tags=["root"])
async def root():
    """Root Endpoint mit API Info"""
    return {
        "message": "DocumentOCR API",
        "docs": "/docs",
        "health": "/health"
    }