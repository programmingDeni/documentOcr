import { useState } from "react";
import { OcrToolUI } from "./OcrToolUI";
import {
  useUploadDocument,
  useUploadDocumentLLM,
} from "../../../../queries/documentQueries";
import type { Document, UploadedDocument } from "../../../../shared/types/Document";
import type { OcrMethod } from "../../../../shared/types/OcrMethod";

/**
 * Container-Komponente für das OCR Tool
 * Verwaltet State und API-Calls für OCR-Verarbeitung
 */
export function OcrToolView() {
  // OCR Method State
  const [ocrMethod, setOcrMethod] = useState<OcrMethod>("tesseract");

  // Document State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [document, setDocument] = useState<UploadedDocument | Document | null>(null);
  const [text, setText] = useState("");

  // API Hooks
  const uploadDocumentQuery = useUploadDocument();
  const uploadDocumentLLMQuery = useUploadDocumentLLM();

  const isProcessing = uploadDocumentQuery.isPending || uploadDocumentLLMQuery.isPending;
  const error = uploadDocumentQuery.error?.message || uploadDocumentLLMQuery.error?.message;

  /**
   * Verarbeitet die ausgewählte Datei mit der gewählten OCR-Methode
   */
  const handleFileSelected = (file: File) => {
    const mutation = ocrMethod === "tesseract" ? uploadDocumentQuery : uploadDocumentLLMQuery;
    setUploadedFile(file);
    mutation.mutate(file, {
      onSuccess: (data) => {
        setDocument(data);
        setText(data.extracted_text ?? "");
      },
    });
  };

  /**
   * Setzt alle States zurück für neuen Upload
   */
  const handleReset = () => {
    setUploadedFile(null);
    setDocument(null);
    setText("");
  };

  /**
   * Speichert das Dokument (TODO: implementieren)
   */
  const handleSave = () => {
    console.log("save", document);
  };

  const previewUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : undefined;

  return (
    <OcrToolUI
      ocrMethod={ocrMethod}
      onOcrMethodChange={setOcrMethod}
      onFileSelected={handleFileSelected}
      isProcessing={isProcessing}
      error={error}
      previewUrl={previewUrl}
      extractedText={text}
      onTextChange={setText}
      onReset={handleReset}
      onSave={handleSave}
    />
  );
}
