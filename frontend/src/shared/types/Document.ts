interface Document {
  id: string;
  filename: string;
  content_type: string;
  created_at: string;
  updated_at: string;
  extracted_text?: string;
  ocrMethod?: string;
}

interface UploadedDocument {
  id: string;
  filename: string;
}

export type { Document, UploadedDocument };
