import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { OcrUploadedDocumentUi } from "../UploadedDocument/OcrUploadedDocumentUi";
import type { OcrMethod } from "../../types/OcrMethod";

interface UploadDocumentUIProps {
  onUpload: (file: File) => void;
  ocrMethod: string;
  setOcrMethod: (ocrMethod: OcrMethod) => void;
  isLoading?: boolean;
  error?: string;
  previewUrl?: string;
  extractedText?: string;
  onTextChange?: (text: string) => void;
  handleReset: () => void;
  handleSave: () => void;
}

export function UploadDocumentUI({
  onUpload,
  ocrMethod,
  setOcrMethod,
  isLoading,
  error,
  previewUrl,
  extractedText,
  onTextChange,
  handleReset,
  handleSave,
}: UploadDocumentUIProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pageContent">
      {previewUrl ? (
        <OcrUploadedDocumentUi
          previewUrl={previewUrl}
          extractedText={extractedText!}
          onTextChange={onTextChange!}
          onReset={handleReset}
          saveDocumentAs={handleSave}
        />
      ) : (
        <div className="container container--narrow">
          <div className="row row--between">
            <h1 className="pageHeader pageHeader__title">Upload Document</h1>
            <select
              value={ocrMethod}
              onChange={(e) =>
                setOcrMethod(e.target.value as "tesseract" | "llm")
              }
              className="form-select"
            >
              <option value="tesseract">Tesseract (schnell, local)</option>
              <option value="llm">LLM (besser, externer Server)</option>
            </select>
          </div>

          <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${isDragging ? "#007bff" : "#ccc"}`,
              borderRadius: "8px",
              padding: "40px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: isDragging ? "#f0f8ff" : "transparent",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.png,.jpg,.jpeg"
              style={{ display: "none" }}
            />

            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <p>Drag & drop a file here, or click to select</p>
            )}
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
