# DocumentOCR - Requirements

## Projektziel
Digitalisierung von Versicherungsdokumenten (Briefe, Emails als Bilder) mittels OCR mit automatischer Klassifizierung nach Fachabteilungen.

---

## Funktionale Anforderungen

### Input
- Bilddateien: JPG, PNG, TIFF, BMP, WebP
- Max. 10 MB pro Datei
- Drag & Drop + Batch-Upload

### Verarbeitung
- OCR via Tesseract (Deutsch/Englisch)
- Bildvorverarbeitung (Kontrast, Deskew)
- Klassifizierung: Phase 1 Keyword-basiert, Phase 2 LLM (OpenRouter)

### Kategorien
| Kategorie | Beschreibung |
|-----------|--------------|
| `ANTRAG` | Neuanträge, Vertragsabschlüsse |
| `SCHADEN` | Schadensmeldungen, Unfallberichte |
| `KUENDIGUNG` | Kündigungen, Widerrufe |
| `LEISTUNG` | Leistungsanfragen, Erstattungen |
| `BESCHWERDE` | Beschwerden, Reklamationen |
| `AUSKUNFT` | Allgemeine Anfragen |
| `AENDERUNG` | Vertragsänderungen, Adressänderungen |
| `SONSTIGES` | Nicht zuordenbar |

### Output
- Extrahierter Text mit Confidence-Score
- Zugewiesene Kategorie mit Begründung
- Manuelle Korrekturmöglichkeit
- Export als JSON

### Speicherung
- PostgreSQL Datenbank
- Original-Bilder werden persistiert

---

## Technische Architektur

```
Frontend (Vite + React + TS)  ◄──REST──►  Backend (Python/FastAPI)
                                                    │
                                         ┌──────────┴──────────┐
                                         │                     │
                                    Tesseract            OpenRouter
                                      OCR               (Phase 2)
                                         │                     │
                                         └──────────┬──────────┘
                                                    │
                                              PostgreSQL
```

### Backend
- **Framework**: FastAPI
- **OCR**: pytesseract + Pillow
- **DB**: PostgreSQL + SQLAlchemy
- **LLM**: httpx → OpenRouter (Phase 2)

### Frontend
- **Build**: Vite
- **Framework**: React + TypeScript
- **Styling**: TailwindCSS

### API Endpoints
| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `POST` | `/api/documents/upload` | Upload & Verarbeitung |
| `GET` | `/api/documents` | Liste aller Dokumente |
| `GET` | `/api/documents/{id}` | Einzelnes Dokument |
| `PATCH` | `/api/documents/{id}/category` | Kategorie ändern |
| `GET` | `/api/categories` | Verfügbare Kategorien |

---

## Implementierungs-Phasen

**Phase 1 - MVP**
1. Backend: FastAPI + Tesseract + PostgreSQL
2. Keyword-Klassifizierung
3. Frontend: Upload + Ergebnis-Anzeige

**Phase 2 - LLM**
4. OpenRouter Integration
5. Fallback-Logik (Keyword → LLM bei niedriger Confidence)

**Phase 3 - Polish**
6. Batch-Upload
7. Export-Funktion
8. UI-Verbesserungen

---

## Datenmodell

```json
{
  "id": "uuid",
  "filename": "dokument.jpg",
  "image_path": "/uploads/uuid.jpg",
  "uploaded_at": "2024-01-15T10:30:00Z",
  "ocr_text": "Sehr geehrte...",
  "ocr_confidence": 0.92,
  "category": "SCHADEN",
  "category_confidence": 0.85,
  "classification_method": "keyword",
  "matched_keywords": ["Schaden", "Unfall"]
}
```
