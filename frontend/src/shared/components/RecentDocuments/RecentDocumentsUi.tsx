import { DocumentCard } from "../DocumentCard";
import type { Document } from "../../types/Document";

interface RecentDocumentsUiProps {
  documents?: Document[];
  onDelete: (id: string) => void;
}

export function RecentDocumentsUi(props: RecentDocumentsUiProps) {
  const { documents, onDelete } = props;
  if (!documents || documents.length === 0) {
    return null; // Oder eine "Keine Dokumente" Nachricht
  }
  return (
    <div className="container" style={{ marginTop: "1rem" }}>
      {/* Header */}
      <h3>Zuletzt verwendet</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 150px 100px",
          gap: "1rem",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid var(--color-border)",
          fontWeight: 600,
          fontSize: "0.875rem",
        }}
      >
        <div>NAME</div>
        <div>GEÖFFNET</div>
        <div>AKTIONEN</div>
      </div>

      {/* Rows */}
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} onDelete={onDelete} />
      ))}
    </div>
  );
}
