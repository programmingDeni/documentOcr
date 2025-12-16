import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OcrToolUI } from "./OcrToolUI";
import {
  useUploadDocument,
  useUploadDocumentLLM,
  useUpdateDocument,
} from "../../../../queries/documentQueries";

import type { OcrMethod } from "../../../../shared/types/OcrMethod";

/**
 * Container-Komponente für das OCR Tool
 * Verwaltet State und API-Calls für OCR-Verarbeitung
 */

export function OcrToolView() {
  // OCR Method State
  const [ocrMethod, setOcrMethod] = useState<OcrMethod>("tesseract");

  // API Hooks
  const uploadDocumentQuery = useUploadDocument();
  const uploadDocumentLLMQuery = useUploadDocumentLLM();
  const updateDocumentQuery = useUpdateDocument();

  const isProcessing =
    uploadDocumentQuery.isPending || uploadDocumentLLMQuery.isPending;
  const error =
    uploadDocumentQuery.error?.message ||
    uploadDocumentLLMQuery.error?.message ||
    updateDocumentQuery.error?.message;

  //navigte
  const navigate = useNavigate();

  /**
   * Verarbeitet die ausgewählte Datei mit der gewählten OCR-Methode
   */
  const handleFileSelected = (file: File) => {
    const mutation =
      ocrMethod === "tesseract" ? uploadDocumentQuery : uploadDocumentLLMQuery;
    mutation.mutate(file, {
      onSuccess: (data) => {
        navigate(`/ocr/${data.id}`);
      },
    });
  };

  return (
    <OcrToolUI
      ocrMethod={ocrMethod}
      onOcrMethodChange={setOcrMethod}
      onFileSelected={handleFileSelected}
      isProcessing={isProcessing}
      error={error}
    />
  );
}
