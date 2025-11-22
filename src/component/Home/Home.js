import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">

      {/* ⭐ LOGOUT BUTTON TOP RIGHT ⭐ */}
      <button 
        className="home-logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Log Out
      </button>

      <div className="home-container">

        {/* HERO SECTION */}
        <div className="home-hero">
          <h1>🏥 Hospital Management System</h1>
          <p className="hero-subtitle">Integrated Healthcare Management Platform</p>
        </div>

        {/* MODULE CARDS */}
        <div className="modules-grid">

          <div className="module-card" onClick={() => navigate('/frontoffice')}>
            <div className="module-icon">🏢</div>
            <h3>Front Office</h3>
            <p>Patient registration, billing & appointment management</p>
            <button className="module-btn">Access Module</button>
          </div>

          <div className="module-card" onClick={() => navigate('/doctor')}>
            <div className="module-icon">👨‍⚕️</div>
            <h3>Doctor's Module</h3>
            <p>Patient consultations, prescriptions & medical records</p>
            <button className="module-btn">Access Module</button>
          </div>

          <div className="module-card" onClick={() => navigate('/nursing')}>
            <div className="module-icon">👩‍⚕️</div>
            <h3>Nursing Module</h3>
            <p>Vitals monitoring, medication & patient care</p>
            <button className="module-btn">Access Module</button>
          </div>

          <div className="module-card" onClick={() => navigate('/laboratory')}>
            <div className="module-icon">🔬</div>
            <h3>Laboratory</h3>
            <p>Test requests, sample collection & results management</p>
            <button className="module-btn">Access Module</button>
          </div>

          <div className="module-card" onClick={() => navigate('/specialty')}>
            <div className="module-icon">🏥</div>
            <h3>Specialty Departments</h3>
            <p>Department-specific workflows and procedures</p>
            <button className="module-btn">Access Module</button>
          </div>

          <div className="module-card" disabled>
            <div className="module-icon">📊</div>
            <h3>Reports & Analytics</h3>
            <p>Coming soon...</p>
            <button className="module-btn" disabled>Coming Soon</button>
          </div>

          <div className="module-card" onClick={()=> navigate('/change-login-role')}>
            <div className="module-icon">🔄</div>
            <h3>Change Login Role / Location</h3>
            <p>Changing the User Role or Location</p>
            <button className="module-btn">Access Module</button>
          </div>

          <div className="module-card" onClick={()=> navigate('/role-master')}>
            <div className="module-icon">👥</div>
            <h3>Role Master</h3>
            <p>Creating new roles</p>
            <button className="module-btn" style={{ marginTop: "30px" }}>Access Module</button>
          </div>

        </div>

        <div className="quick-stats">
          <div className="stat-box">
            <h4>Total Patients Today</h4>
            <p className="stat-number">48</p>
          </div>
          <div className="stat-box">
            <h4>Active Consultations</h4>
            <p className="stat-number">12</p>
          </div>
          <div className="stat-box">
            <h4>Pending Lab Tests</h4>
            <p className="stat-number">27</p>
          </div>
          <div className="stat-box">
            <h4>Occupied Beds</h4>
            <p className="stat-number">85%</p>
          </div>
        </div>

      </div>
    </div>
  );
}
