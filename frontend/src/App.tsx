import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Homepage } from "./views/Homepage";
import Navbar from "./components/Navbar";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
