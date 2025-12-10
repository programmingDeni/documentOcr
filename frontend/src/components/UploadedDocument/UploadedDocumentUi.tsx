import { Button } from "../../shared/GenericButton";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";

interface UploadedDocumentUiProps {
  previewUrl: string;
  extractedText: string;
  onTextChange: (text: string) => void;
  onReset: () => void;
  saveDocumentAs: () => void;
}

export function UploadedDocumentUi(props: UploadedDocumentUiProps) {
  const { previewUrl, extractedText, onTextChange, onReset, saveDocumentAs } =
    props;

  return (
    <div className="stack stack--md" style={{ width: "100%" }}>
      <div className="row row--left">
        <Button onClick={onReset}>Reset Document</Button>
        <Button onClick={saveDocumentAs}> Save as</Button>
      </div>

      <div className="twoColumn twoColumn--withDivider twoColumn--reversed">
        <div className="twoColumn__left">
          <div className="scroll-container">
            <div className="flex-scroll">
              <img src={previewUrl} alt="Preview" />
            </div>
          </div>
        </div>
        <div className="twoColumn__right">
          <RichTextEditor content={extractedText} onChange={onTextChange} />
        </div>
      </div>
    </div>
  );
}
