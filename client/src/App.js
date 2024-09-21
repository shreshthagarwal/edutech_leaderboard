import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Leaderboard from "./pages/Leaderboard";
import Request from "./pages/Request";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/request" element={<Request />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
