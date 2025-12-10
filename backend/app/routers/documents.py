from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.document_service import DocumentService
from app.schemas.document import DocumentResponse

router = APIRouter()

def get_document_service(db: Session = Depends(get_db)) -> DocumentService:
    """Dependency Injection für DocumentService."""
    return DocumentService(db)

@router.get("/", response_model=List[DocumentResponse])
def list_documents(service: DocumentService = Depends(get_document_service)):
    """Listet alle Dokumente."""
    return service.list_documents()

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    service: DocumentService = Depends(get_document_service)
):
    """Lädt ein Dokument hoch."""
    return await service.upload_document(file, ocr_method="tesseract")

@router.post("/upload/llm", response_model=DocumentResponse)
async def upload_document_llm(
    file: UploadFile = File(...),
    service: DocumentService = Depends(get_document_service)
):
    """Lädt ein Dokument hoch (LLM OCR)."""
    return await service.upload_document(file, ocr_method="llm")

@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(
    document_id: UUID,
    service: DocumentService = Depends(get_document_service)
):
    """Holt ein einzelnes Dokument."""
    return service.get_document(document_id)

@router.delete("/{document_id}")
def delete_document(
    document_id: UUID,
    service: DocumentService = Depends(get_document_service)
):
    """Löscht ein Dokument."""
    service.delete_document(document_id)
    return {"message": "Document deleted"}