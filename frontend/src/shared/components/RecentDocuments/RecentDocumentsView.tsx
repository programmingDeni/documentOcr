import { RecentDocumentsUi } from "./RecentDocumentsUi";
import {
  useDocuments,
  useDeleteDocument,
} from "../../../queries/documentQueries";

interface RecentDocumentsViewProps {
  typeOfDocument: "ocr" | "search";
  numberOfDocumentsDisplayed: number;
  /** Callback für das Löschen eines Dokuments */
}
export function RecentDocumentsView(props: RecentDocumentsViewProps) {
  const { typeOfDocument, numberOfDocumentsDisplayed = 5 } = props;

  const { data: documents } = useDocuments();
  const deleteDocumentQuery = useDeleteDocument();

  const recentDocuments = documents
    ?.filter((doc) => {
      return typeOfDocument === "ocr" ? doc.extracted_text : doc;
    })
    ?.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    ?.slice(0, numberOfDocumentsDisplayed);

  const onDeleteDocument = (id: string) => {
    deleteDocumentQuery.mutate(id);
  };

  return (
    <RecentDocumentsUi
      documents={recentDocuments}
      onDelete={onDeleteDocument}
    />
  );
}
