import { RecentDocumentsView } from "../../../../shared/components/RecentDocuments";

export const SemantivSearchUI = () => {
  return (
    <div className="pageWrapper">
      <div className="pageContent">
        <div className="pageHeader pageHeader__title">
          Semantic Search Seite
        </div>
        <RecentDocumentsView
          typeOfDocument="search"
          numberOfDocumentsDisplayed={5}
        />
      </div>
    </div>
  );
};
