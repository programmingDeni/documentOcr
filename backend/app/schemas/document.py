from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class DocumentBase(BaseModel):
    """Basis-Schema mit gemeinsamen Feldern."""
    filename: str
    content_type: str

class DocumentCreate(DocumentBase):
    """Schema für Upload - content kommt als UploadFile, nicht hier."""
    pass

class DocumentResponse(DocumentBase):
    """Schema für API Response."""
    id: UUID
    extracted_text: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Erlaubt Konvertierung von SQLAlchemy Model
