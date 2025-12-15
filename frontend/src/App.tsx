import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";

//navbar
import Navbar from "./shared/components/Navbar";
//views
import { Homepage } from "./shared/views/Homepage";
import { OcrView } from "./features/ocr/views/OcrView";
//semantic search
import { SemanticSearchLandingPageView } from "./features/semanticSearch/views/SemanticSearchLandingPage";
import { SemanticSearchView as SemanticSearchPage } from "./features/semanticSearch/views/SemanticSearchPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ocr" element={<OcrView />} />
            <Route path="/search" element={<SemanticSearchLandingPageView />} />
            <Route path="/search/:docId" element={<SemanticSearchPage/>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
