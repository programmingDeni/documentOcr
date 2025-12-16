import { EditButton } from "@/shared/Buttons/EditButton";
import type { Document } from "../../types/Document";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "@/shared/Buttons/DeleteButton";

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
}

export function DocumentCard(props: DocumentCardProps) {
  const { document, onDelete } = props;
  const navigate = useNavigate();

  return (
    <div
      className="card__item"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 150px 100px",
        gap: "1rem",
        alignItems: "center",
        padding: "0.75rem 1rem",
      }}
    >
      <div style={{ fontWeight: 500 }}>{document.filename}</div>

      <div
        style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}
      >
        {new Date(document.updated_at).toLocaleString("de-DE", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <div className="card__actions">
        <EditButton onClick={() => navigate(`/ocr/${document.id}`)} />
        <DeleteButton
          onDelete={onDelete}
          id={document.id}
          confirmMessage="Sind Sie sicher, dass Sie dieses Dokument löschen möchten? "
        />
      </div>
    </div>
  );
}
