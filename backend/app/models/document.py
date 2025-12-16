import uuid
from datetime import datetime
from sqlalchemy import Column, String, LargeBinary, DateTime, Text, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base



class Document(Base):
    """SQLAlchemy Model für Dokumente."""
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    filename = Column(String(255), nullable=False)
    content = Column(LargeBinary, nullable=False)  # Das Dokument als Bytes
    content_type = Column(String(100), nullable=False)  # z.B. "application/pdf"
    content_hash = Column(String(64), nullable=True, index=True)  # SHA-256 Hash für Duplikat-Erkennung
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    extracted_text = Column(Text, nullable=True) 
    ocrMethod = Column(Enum("tesseract", "llm", name="ocr_method_enum"), nullable=True)
