from uuid import UUID
from typing import List, Optional
from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from app.repositories.document import DocumentRepository
from app.models.document import Document
from app.services.ocr import extract_text
from app.services.ocr_llm import extract_text_with_llm

class DocumentService:
    """Business Logic für Dokumente."""

    def __init__(self, db: Session):
        self.repository = DocumentRepository(db)

    async def upload_document(self, file: UploadFile, ocr_method: str = "tesseract") -> Document:
        """Lädt ein Dokument hoch."""
        content = await file.read()
        
        # OCR je nach Parameter
        if ocr_method == "llm":
            extracted_text = extract_text_with_llm(content, file.content_type)
        else:
            extracted_text = extract_text(content, file.content_type)
        
        return self.repository.create(
            filename=file.filename,
            content=content,
            content_type=file.content_type,
            extracted_text=extracted_text
        )

    def get_document(self, document_id: UUID) -> Document:
        """Holt ein Dokument oder wirft 404."""
        document = self.repository.get_by_id(document_id)
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        return document

    def list_documents(self) -> List[Document]:
        """Listet alle Dokumente."""
        return self.repository.get_all()

    def delete_document(self, document_id: UUID) -> bool:
        """Löscht ein Dokument."""
        if not self.repository.delete(document_id):
            raise HTTPException(status_code=404, detail="Document not found")
        return True