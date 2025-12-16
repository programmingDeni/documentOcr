import { useEffect, useState } from "react";
import { API_URL } from "../../../../shared/constants/api";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDocument,
  useUpdateDocument,
  useChangeOcrMethod,
} from "../../../../queries/documentQueries";
import { OcrUploadedDocumentUi } from "./OcrUploadedDocumentUi";
import type { OcrMethod } from "../../../../shared/types/OcrMethod";

/**
 * Container-Komponente für die Dokument-Bearbeitungsseite
 * Lädt das Dokument anhand der URL-Parameter und verwaltet den State
 */
export function OrcUploadedDocumentView() {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();

  // Dokument vom Backend laden
  const { data: document, isLoading, error } = useDocument(docId!);

  // Mutation für Updates
  const updateDocumentQuery = useUpdateDocument();

  // mutation für Änderung der OCR Methode
  const changeOcrMethodQuery = useChangeOcrMethod();

  // Lokaler State für Text-Bearbeitung
  const [text, setText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Synchronisiere Text mit geladenem Dokument
  useEffect(() => {
    if (document?.extracted_text) {
      setText(document.extracted_text);
    }
  }, [document]);

  const handleSave = () => {
    if (!docId) return;

    updateDocumentQuery.mutate(
      { id: docId, extracted_text: text },
      {
        onSuccess: () => {
          setIsSaved(true);
        },
      }
    );
  };

  const handleSaveAs = () => {
    console.log("Save as not implemented");
  };

  // Loading State
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error State
  if (error || !document) {
    return <div>Error loading document</div>;
  }

  /**
   * Handler für Textänderungen - setzt isSaved zurück
   */
  const handleTextChange = (newText: string) => {
    setText(newText);
    setIsSaved(false);
  };

  const handleOcrMethodChange = (method: OcrMethod) => {
    const confirm = window.confirm(
      "Wenn Sie die Methode ändern, werden alle bisherigen Texte verloren gehen. Fortfahren?"
    );
    if (!confirm) return;
    else {
      changeOcrMethodQuery.mutate({ id: document.id, method });
    }
    console.log("handleOcrMethodChange", method);
  };

  // Generiere Preview URL
  const previewUrl = `${API_URL}/${docId}/image`;

  return (
    <OcrUploadedDocumentUi
      previewUrl={previewUrl}
      document={document}
      onTextChange={handleTextChange}
      onOcrMethodChange={handleOcrMethodChange}
      onSave={handleSave}
      saveDocumentAs={handleSaveAs}
      isSaving={updateDocumentQuery.isPending}
      isSaved={isSaved}
    />
  );
}
