/**
 * Props für FileUploadUI - die Präsentationskomponente
 */
export interface FileUploadUIProps {
  /** Callback wenn eine Datei ausgewählt wird (drag & drop oder click) */
  onFileSelect: (file: File) => void;
  /** Akzeptierte Dateitypen (default: ".pdf,.png,.jpg,.jpeg") */
  accept?: string;
  /** Zeigt Ladezustand */
  isLoading?: boolean;
  /** Fehlermeldung */
  error?: string;
  /** Platzhaltertext */
  placeholderText?: string;
  /** Text während des Ladens */
  loadingText?: string;
}

/**
 * Props für FileUploadView - die Container-Komponente
 */
export interface FileUploadViewProps {
  /** Callback wenn eine Datei erfolgreich ausgewählt wurde */
  onFileSelected: (file: File) => void;
  /** Akzeptierte Dateitypen */
  accept?: string;
  /** Externer Ladezustand (z.B. wenn Parent verarbeitet) */
  isProcessing?: boolean;
  /** Externe Fehlermeldung */
  error?: string;
}
