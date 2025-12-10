import { UploadDocumentUI } from "./UploadDocumentUI";
import {
  useUploadDocument,
  useUploadDocumentLLM,
} from "../../queries/documentQueries";
import { useState } from "react";
import type { Document, UploadedDocument } from "../../types/Document";
import type { OcrMethod } from "../../types/OcrMethod";

export function UploadDocumentView() {
  const [ocrMethod, setOcrMethod] = useState<OcrMethod>("tesseract");
  const uploadDocumentQuery = useUploadDocument();
  const uploadDocumentLLMQuery = useUploadDocumentLLM();

  //state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [document, setDocument] = useState<UploadedDocument | Document | null>(
    null
  );
  const [text, setText] = useState("");

  const handleUpload = (file: File) => {
    const mutation =
      ocrMethod === "tesseract" ? uploadDocumentQuery : uploadDocumentLLMQuery;
    setUploadedFile(file);
    mutation.mutate(file, {
      onSuccess: (data) => {
        setDocument(data);
        setText(data.extracted_text ?? "");
      },
    });
  };

  const handleTextChange = (text: string) => {
    setText(text);
  };

  const previewUrl = uploadedFile
    ? URL.createObjectURL(uploadedFile)
    : undefined;

  const handleReset = () => {
    setUploadedFile(null);
    setDocument(null);
    setText("");
  };

  const handleSave = () => {
    console.log("save");
  };

  return (
    <UploadDocumentUI
      onUpload={handleUpload}
      ocrMethod={ocrMethod}
      setOcrMethod={setOcrMethod}
      isLoading={uploadDocumentQuery.isPending}
      error={uploadDocumentQuery.error?.message}
      previewUrl={previewUrl}
      extractedText={text}
      onTextChange={handleTextChange}
      handleReset={handleReset}
      handleSave={handleSave}
    />
  );
}
