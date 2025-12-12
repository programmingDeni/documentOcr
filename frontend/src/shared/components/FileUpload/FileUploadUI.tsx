import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import type { FileUploadUIProps } from "./types";

/**
 * Präsentationskomponente für Datei-Upload mit Drag & Drop
 * Rein visuell - keine Business-Logik
 */
export function FileUploadUI({
  onFileSelect,
  accept = ".pdf,.png,.jpg,.jpeg",
  isLoading = false,
  error,
  placeholderText = "Drag & drop a file here, or click to select",
  loadingText = "Processing...",
}: FileUploadUIProps) {
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
    if (file) onFileSelect(file);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container container--narrow">
      <div className="pageHeader pageHeader__title">Upload Document</div>
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
          accept={accept}
          style={{ display: "none" }}
        />

        {isLoading ? <p>{loadingText}</p> : <p>{placeholderText}</p>}
      </div>

      {error && (
        <div className="message-container">
          "<p className="alert alert--error">{error}</p>
        </div>
      )}
    </div>
  );
}
