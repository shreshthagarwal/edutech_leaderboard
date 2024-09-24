// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Leaderboard from "./pages/Leaderboard";
import Request from "./pages/Request";
import AdminRequests from "./pages/AdminRequests";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Check if token is present
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protect routes */}
        <Route
          path="/request"
          element={isAuthenticated() ? <Request /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-requests"
          element={isAuthenticated() ? <AdminRequests /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
