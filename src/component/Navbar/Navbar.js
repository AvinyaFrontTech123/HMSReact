import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      
      <button className="nav-home-btn" onClick={() => navigate("/")}>
        🏠 Home
      </button>

      <div className="nav-modules">
        <button onClick={() => navigate("/frontoffice")}>🏢 Front Office</button>
        <button onClick={() => navigate("/doctor")}>👨‍⚕️ Doctor</button>
        <button onClick={() => navigate("/nursing")}>👩‍⚕️ Nursing</button>
        <button onClick={() => navigate("/laboratory")}>🔬 Laboratory</button>
        <button onClick={() => navigate("/specialty")}>🏥 Specialty</button>
        {/* Module links moved under Organization module */}
        <button onClick={() => navigate("/organization")}>🏢 Organization</button>
      </div>

      <button
        className="nav-logout-btn"
        
        onClick={handleLogout}
      >
        Log Out
      </button>
    </nav>
  );
}
