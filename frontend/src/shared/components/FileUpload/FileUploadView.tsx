import { FileUploadUI } from "./FileUploadUI";
import type { FileUploadViewProps } from "./types";

/**
 * Container-Komponente für Datei-Upload
 * Leitet Props an FileUploadUI weiter
 */
export function FileUploadView({
  onFileSelected,
  accept,
  isProcessing,
  error,
}: FileUploadViewProps) {
  return (
    <FileUploadUI
      onFileSelect={onFileSelected}
      accept={accept}
      isLoading={isProcessing}
      error={error}
    />
  );
}
