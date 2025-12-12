import { OcrToolView } from "../../components/OcrTool";

/**
 * Präsentationskomponente für die OCR-Seite
 * Wrapper um OcrToolView mit Page-Layout
 */
export function OcrUi() {
  return (
    <div className="pageWrapper">
      <div className="pageContent">
        <OcrToolView />
      </div>
    </div>
  );
}
