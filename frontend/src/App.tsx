import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";

//navbar
import Navbar from "./shared/components/Navbar";
//views
import { Homepage } from "./shared/views/Homepage";
import { OcrView } from "./features/ocr/views/OcrView";
import { OrcUploadedDocumentView } from "./features/ocr/components/UploadedDocument";
import { SemanticSearchView } from "./features/semanticSearch/views/SemanticSearchView/SemanticSearchView";

function App() {
  const queryClient = new QueryClient();
  document.documentElement.setAttribute("data-theme", "light");
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ocr" element={<OcrView />} />
            <Route path="/ocr/:docId" element={<OrcUploadedDocumentView />} />
            <Route path="/search" element={<SemanticSearchView />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
