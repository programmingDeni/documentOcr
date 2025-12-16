import Button from "@/shared/Buttons/GenericButton";
import { RichTextEditor } from "@/shared/components/RichTextEditor/RichTextEditor";
import type { Document } from "@/shared/types/Document";
import type { OcrMethod } from "@/shared/types/OcrMethod";

interface OcrUploadedDocumentUiProps {
  previewUrl: string;
  document: Document;
  onTextChange: (text: string) => void;
  onOcrMethodChange: (method: OcrMethod) => void;
  onSave: () => void;
  saveDocumentAs: () => void;
  /** Zeigt Ladezustand beim Speichern */
  isSaving?: boolean;
  /** Zeigt an ob Änderungen gespeichert wurden */
  isSaved?: boolean;
}

export function OcrUploadedDocumentUi({
  previewUrl,
  document,
  onTextChange,
  onOcrMethodChange,
  onSave,
  saveDocumentAs,
  isSaving = false,
  isSaved = false,
}: OcrUploadedDocumentUiProps) {
  console.log("uploaded document", document);
  return (
    <div className="pageContent">
      {/** Header Buttons */}
      {/* Oben links Speichern */}
      <div className="row row--between">
        <div className="row row--left row--md">
          <Button onClick={onSave} disabled={isSaving || isSaved}>
            {isSaving
              ? "Speichern..."
              : isSaved
              ? "Gespeichert ✓"
              : "Speichern"}
          </Button>
          <Button onClick={saveDocumentAs}>Save as</Button>
        </div>
        {/* Oben rechts Ocr Method auswahl */}
        <select
          value={document.ocrMethod}
          onChange={(e) => onOcrMethodChange(e.target.value as OcrMethod)}
          className="form-select"
        >
          <option value="tesseract">Tesseract (schnell, local)</option>
          <option value="llm">LLM (besser, externer Server)</option>
        </select>
      </div>

      <div className="twoColumn twoColumn--withDivider twoColumn--equal">
        <div className="twoColumn__left">
          <div className="scroll-container">
            <div className="flex-scroll">
              <img src={previewUrl} alt="Preview" />
            </div>
          </div>
        </div>
        <div className="twoColumn__right">
          <div className="scroll-container">
            <div className="flex-scroll">
              <RichTextEditor
                content={document.extracted_text!}
                onChange={onTextChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
