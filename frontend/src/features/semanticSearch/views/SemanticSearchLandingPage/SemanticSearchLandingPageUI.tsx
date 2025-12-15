import { useNavigate } from "react-router-dom";
import { FileUploadView } from "../../../../shared/components/FileUpload";
import { RecentDocumentsView } from "../../../../shared/components/RecentDocuments";

export function SemanticSearchLandingPageUI() {
    const navigate = useNavigate();
    return(
        <div className="pageWrapper">
            <h1>Semantic Search Landing Page</h1>
            <FileUploadView 
                onFileSelected={() => navigate("/search/:docId")}
                accept=".pdf,.png, /png, image/png,"
            />
            <RecentDocumentsView />
        </div>
    )
}