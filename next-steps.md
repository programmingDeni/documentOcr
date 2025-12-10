Plan: Document Upload mit OCR und Preview
Backend

1. Model erweitern (backend/app/models/document.py)
   extracted_text = Column(Text, nullable=True) hinzufügen
2. Schema erweitern (backend/app/schemas/document.py)
   extracted_text: str | None zu DocumentResponse hinzufügen
3. OCR Service implementieren (backend/app/services/ocr.py)
   extract_text(image_bytes: bytes) -> str mit Tesseract
   PDF-Support mit pdf2image
4. Document Service anpassen (backend/app/services/document_service.py)
   OCR beim Upload aufrufen
   extracted_text speichern
5. Neuer Endpoint (backend/app/routers/documents.py)
   GET /documents/{id}/image - Bild/PDF als Response zurückgeben
6. DB Migration
   Alembic Migration für neues Feld
   Frontend
7. Types definieren (frontend/src/types/document.ts)
   Document Interface mit extracted_text
8. View State erweitern (UploadDocumentView.tsx)
   uploadedDocument State nach erfolgreichem Upload
   onSuccess Callback nutzen
9. UI erweitern (UploadDocumentUI.tsx)
   Split-Layout: Links Bild-Preview, rechts Textarea
   Props: document, onTextChange
10. Optional: Text speichern
    PATCH /documents/{id} Endpoint
    useUpdateDocument Mutation
