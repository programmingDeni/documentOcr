//components
import { Button } from "../../GenericButton";
import { FileUploadView } from "../../components/FileUpload";
import { RecentDocumentsView } from "../../components/RecentDocuments";

//views
import { UploadDocumentView } from "../../components/UploadDocument";

export function Homepage() {

  return (
    <div className="pageWrapper">
      <div className="pageHeader">
        <h1>Denis Adobe</h1>
      </div>
      <div className="pageSubheader">
        <h2>Tools</h2>
      </div>
      <div className="pageContent">
        <div className="pageSection">
          <div className="stack stack--md">
            <Button to="/ocr" className="btn btn--primary">
              Document OCR{" "}
            </Button>
            <Button to="/search" className="btn btn--primary">
              Semantic Search
            </Button>
          </div>
        </div>
        <div className="pageSection">
          <div className="stack stack--md">
            <RecentDocumentsView />
            <FileUploadView />
          </div>
        </div>
      </div>
    </div>
  );
}
