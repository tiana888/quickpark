import { Route, Routes } from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import GuardPage from "./pages/GuardPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import SpaceZoomPage from "./pages/SpaceZoomPage";
import TestPage from "./pages/TestPage";
import ClientPage2 from "./pages/ClientPage2";
import ClientPage3 from "./pages/ClientPage3";

// import HeaderBar from "./components/HeaderBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientpage" element={<ClientPage />} />
        <Route path="/clientpage/spacezoompage/:floor/:section" element={<SpaceZoomPage />} />
        <Route path="/guardpage" element={<GuardPage />} />
        <Route path="/guardpage/historypage" element={<HistoryPage />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/clientpage/clientpage2" element={<ClientPage2 />} />
        <Route path="/clientpage/clientpage3" element={<ClientPage3 />} />
      </Routes>
    </>
  );
}

export default App;
