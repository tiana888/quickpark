import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ClientPageNEW from "./pages/ClientPage_NEW";
import ErrorPage from "./pages/ErrorPage";
import GuardPage from "./pages/GuardPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import SpaceZoomPage from "./pages/SpaceZoomPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientpage" element={<ClientPageNEW />} />

        <Route
          path="/clientpage/spacezoompage/:floor/:section"
          element={<SpaceZoomPage />}
        />
        <Route path="/guardpage" element={<GuardPage />} />
        <Route path="/guardpage/historypage" element={<HistoryPage />} />
        <Route path="/errorpage" element={<ErrorPage />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route
          path="/guardpage/historypage/location"
          element={<HistoryPage />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
