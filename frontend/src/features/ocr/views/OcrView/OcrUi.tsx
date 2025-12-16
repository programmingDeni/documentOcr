import { RecentDocumentsView } from "../../../../shared/components/RecentDocuments";
import { RecentDocumentsUi } from "../../../../shared/components/RecentDocuments/RecentDocumentsUi";
import { OcrToolView } from "../../components/OcrTool";

/**
 * Präsentationskomponente für die OCR-Seite
 * Wrapper um OcrToolView mit Page-Layout
 */
interface OcrUiProps {}

export function OcrUi(props: OcrUiProps) {
  const {} = props;
  return (
    <div className="pageWrapper">
      <div className="pageContent">
        <div className="pageHeader pageHeader__title">OCR Seite</div>
        <OcrToolView />
        <RecentDocumentsView
          typeOfDocument="ocr"
          numberOfDocumentsDisplayed={5}
        />
      </div>
    </div>
  );
}
