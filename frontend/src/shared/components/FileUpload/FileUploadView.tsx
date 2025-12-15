import { FileUploadUI } from "./FileUploadUI";
import { useState } from "react";
import {
  useUploadDocument,
  useUploadDocumentLLM,
  useUploadDigitalDocument,
} from "../../../queries/documentQueries";
import type { OcrMethod } from "../../types/OcrMethod";

import type { Document } from "../../../shared/types/Document";

/**
 * Container-Komponente für Datei-Upload
 * Leitet Props an FileUploadUI weiter
 */
interface FileUploadViewProps {
  /** Callback wenn Datei ausgewählt wurde */
  onFileSelected?: (document: Document) => void;
  /** Akzeptierte Dateitypen */
  accept?: string;
  /** Aktuelle OCR-Methode */
  ocrMethod?: OcrMethod;
}

export function FileUploadView(props: FileUploadViewProps) {
  const {
    onFileSelected,
    accept,
    ocrMethod,
  } = props;

  const [internalError, setInternalError] = useState<string>("");

  const uploadDocumentQuery = useUploadDocument();
  const uploadDocumentLLMQuery = useUploadDocumentLLM();
  const uploadDigitalDocumentQuery = useUploadDigitalDocument();

  const isLoading =
    uploadDocumentQuery.isPending ||
    uploadDocumentLLMQuery.isPending ||
    uploadDigitalDocumentQuery.isPending;

  /**
   * Upload eines Dokuments
   */
  const handleFileSelected = (file: File) => {
    //erst checken ob das format erlaubt ist
    console.log("Selected file:", file.type);
    if (!accept?.includes(file.type)) {
     setInternalError("Dateityp nicht erlaubt");
     return;
    }
    // dann entweder upload fuer ocr, wenn noch nicht digital
    // oder direkter upload
    let mutation;
    if (ocrMethod === "tesseract") {
      mutation = uploadDocumentQuery;
    } else if (ocrMethod === "llm") {
      mutation = uploadDocumentLLMQuery;
    } else {
      mutation = uploadDigitalDocumentQuery;
    }
    // Upload mit onSuccess für ALLE
    mutation.mutate(file, {
      onSuccess: (data) => {
        onFileSelected?.(data); 
      },
      onError: (err) => {
        // Optional: Error handling
        console.error("Upload failed:", err);
      },
    });
  };

  return (
    <FileUploadUI
      onFileSelect={handleFileSelected}
      accept={accept}
      isLoading={isLoading}
      error={internalError}
    />
  );
}
