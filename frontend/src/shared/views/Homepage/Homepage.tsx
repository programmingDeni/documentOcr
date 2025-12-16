//components
import Button from "../../Buttons/GenericButton";
import { RecentDocumentsView } from "../../components/RecentDocuments";

//views

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
          <div className="row row--md row--start">
            <Button to="/ocr" className="btn btn--secondary">
              Document OCR{" "}
            </Button>
            <Button to="/search" className="btn btn--secondary">
              Semantic Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
