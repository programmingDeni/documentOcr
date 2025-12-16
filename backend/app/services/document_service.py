import hashlib
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

    def _calculate_content_hash(self, content: bytes) -> str:
        """Berechnet SHA-256 Hash des Dateiinhalts."""
        return hashlib.sha256(content).hexdigest()

    async def upload_document(self, file: UploadFile, ocr_method: str = "tesseract") -> Document:
        """
        Lädt ein Dokument hoch.
        Prüft zuerst ob das Dokument bereits existiert (via Content-Hash).
        Falls ja, wird das existierende Dokument zurückgegeben.
        """
        content = await file.read()
        content_hash = self._calculate_content_hash(content)

        # Prüfe ob Dokument bereits existiert
        existing_document = self.repository.get_by_content_hash(content_hash)
        if existing_document:
            return existing_document

        # OCR je nach Parameter
        if ocr_method == "llm":
            extracted_text = extract_text_with_llm(content, file.content_type)
        else:
            extracted_text = extract_text(content, file.content_type)

        return self.repository.create(
            filename=file.filename,
            content=content,
            content_type=file.content_type,
            content_hash=content_hash,
            extracted_text=extracted_text,
            ocrMethod=ocr_method
        )

    def get_document(self, document_id: UUID) -> Document:
        """Holt ein Dokument oder wirft 404."""
        document = self.repository.get_by_id(document_id)
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        return document

    def get_document_by_hash(self, content_hash: str) -> Optional[Document]:
        """Holt ein Dokument per Content-Hash."""
        return self.repository.get_by_content_hash(content_hash)

    def list_documents(self) -> List[Document]:
        """Listet alle Dokumente."""
        return self.repository.get_all()

    def update_extracted_text(self, document_id: UUID, extracted_text: str) -> Document:
        """Aktualisiert den extrahierten Text eines Dokuments."""
        document = self.repository.update_extracted_text(document_id, extracted_text)
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        return document
    
    def update_ocr_method(self, document_id: UUID, ocr_method: str) -> Document:
        """Aktualisiert den OCR Method eines Dokuments."""
        document = self.repository.get_by_id(document_id)
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        if(document.ocrMethod == ocr_method):
            return document
        else:
            document.ocrMethod = ocr_method
            if ocr_method == "llm":
                document.extracted_text = extract_text_with_llm(document.content, document.content_type)
            else:
                document.extracted_text = extract_text(document.content, document.content_type)
            return self.repository.update(document)
            

    def delete_document(self, document_id: UUID) -> bool:
        """Löscht ein Dokument."""
        if not self.repository.delete(document_id):
            raise HTTPException(status_code=404, detail="Document not found")
        return True
