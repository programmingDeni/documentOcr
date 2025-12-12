import { FileUploadView } from "../../../../shared/components/FileUpload";
import { OcrUploadedDocumentUi } from "../../../../shared/components/UploadedDocument/OcrUploadedDocumentUi";
import type { OcrMethod } from "../../../../shared/types/OcrMethod";

interface OcrToolUIProps {
  /** Aktuelle OCR-Methode */
  ocrMethod: OcrMethod;
  /** Callback zum Ändern der OCR-Methode */
  onOcrMethodChange: (method: OcrMethod) => void;
  /** Callback wenn Datei ausgewählt wurde */
  onFileSelected: (file: File) => void;
  /** Ladezustand während OCR-Verarbeitung */
  isProcessing: boolean;
  /** Fehlermeldung */
  error?: string;
  /** Preview URL des hochgeladenen Dokuments */
  previewUrl?: string;
  /** Extrahierter Text */
  extractedText: string;
  /** Callback zum Ändern des Texts */
  onTextChange: (text: string) => void;
  /** Callback zum Zurücksetzen */
  onReset: () => void;
  /** Callback zum Speichern */
  onSave: () => void;
}

/**
 * Präsentationskomponente für das OCR Tool
 * Zeigt entweder Upload-Form oder Ergebnis-Ansicht
 */
export function OcrToolUI({
  ocrMethod,
  onOcrMethodChange,
  onFileSelected,
  isProcessing,
  error,
  previewUrl,
  extractedText,
  onTextChange,
  onReset,
  onSave,
}: OcrToolUIProps) {
  // Nach OCR: Ergebnis anzeigen
  if (previewUrl) {
    return (
      <OcrUploadedDocumentUi
        previewUrl={previewUrl}
        extractedText={extractedText}
        onTextChange={onTextChange}
        onReset={onReset}
        saveDocumentAs={onSave}
      />
    );
  }

  // Vor OCR: Upload-Form anzeigen
  return (
    <div className="container container--narrow">
      <div className="row row--between" style={{ marginBottom: "1rem" }}>
        <h1 className="pageHeader__title">OCR Tool</h1>
        <select
          value={ocrMethod}
          onChange={(e) => onOcrMethodChange(e.target.value as OcrMethod)}
          className="form-select"
        >
          <option value="tesseract">Tesseract (schnell, local)</option>
          <option value="llm">LLM (besser, externer Server)</option>
        </select>
      </div>

      <FileUploadView
        onFileSelected={onFileSelected}
        isProcessing={isProcessing}
        error={error}
      />
    </div>
  );
}
