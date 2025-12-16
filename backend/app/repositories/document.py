from uuid import UUID
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.document import Document

class DocumentRepository:
    """Data Access Layer für Dokumente."""

    def __init__(self, db: Session):
        self.db = db

    def create(self, filename: str, content: bytes, content_type: str,
               content_hash: str = None, extracted_text: str = None, ocrMethod: str = "tessaract") -> Document:
        """Erstellt ein neues Dokument."""
        document = Document(
            filename=filename,
            content=content,
            content_type=content_type,
            content_hash=content_hash,
            extracted_text=extracted_text,
            ocrMethod=ocrMethod
        )
        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)
        return document

    def get_by_id(self, document_id: UUID) -> Optional[Document]:
        """Holt ein Dokument per ID."""
        return self.db.query(Document).filter(Document.id == document_id).first()

    def get_by_content_hash(self, content_hash: str) -> Optional[Document]:
        """Holt ein Dokument per Content-Hash (für Duplikat-Erkennung)."""
        return self.db.query(Document).filter(Document.content_hash == content_hash).first()

    def get_all(self) -> List[Document]:
        """Holt alle Dokumente."""
        return self.db.query(Document).all()

    def update_extracted_text(self, document_id: UUID, extracted_text: str) -> Optional[Document]:
        """Aktualisiert den extrahierten Text eines Dokuments."""
        document = self.get_by_id(document_id)
        if document:
            document.extracted_text = extracted_text
            self.db.commit()
            self.db.refresh(document)
            return document
        return None

    def delete(self, document_id: UUID) -> bool:
        """Löscht ein Dokument."""
        document = self.get_by_id(document_id)
        if document:
            self.db.delete(document)
            self.db.commit()
            return True
        return False
