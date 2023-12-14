import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import ClientPage from "./pages/ClientPage";
import GuardPage from "./pages/GuardPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import SpaceZoomPage from "./pages/SpaceZoomPage";
import ErrorPage from "./pages/ErrorPage";
import TestPage from "./pages/TestPage";
import ClientPage2 from "./pages/ClientPage2";
import ClientPage3 from "./pages/ClientPage3";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientpage" element={<ClientPage />} />
        <Route
          path="/clientpage/spacezoompage/:floor/:section"
          element={<SpaceZoomPage />}
        />
        <Route path="/guardpage" element={<GuardPage />} />
        <Route path="/guardpage/historypage" element={<HistoryPage />} />
        <Route path="/errorpage" element={<ErrorPage />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/clientpage/clientpage2" element={<ClientPage2 />} />
        <Route path="/clientpage/clientpage3" element={<ClientPage3 />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
