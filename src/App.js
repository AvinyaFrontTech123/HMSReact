import React, { useState } from 'react';
import './App.css';
import HospitalFrontOffice from './component/HospitalFrontOffice/HospitalFrontOffice';
import Laboratory from './component/Laboratory/Laboratory';
import Doctor from './component/Doctor/Doctor';
import Nursing from './component/Nursing/Nursing';
import Specialty from './component/Specialty/Specialty';

function App() {
  const [activeModule, setActiveModule] = useState('home');

  const renderModule = () => {
    switch (activeModule) {
      case 'frontoffice':
        return <HospitalFrontOffice />;
      case 'laboratory':
        return <Laboratory />;
      case 'doctor':
        return <Doctor />;
      case 'nursing':
        return <Nursing />;
      case 'specialty':
        return <Specialty />;
      default:
        return (
          <div className="home-container">
            <div className="home-hero">
              <h1>🏥 Hospital Management System</h1>
              <p className="hero-subtitle">Integrated Healthcare Management Platform</p>
            </div>

            <div className="modules-grid">
              <div className="module-card" onClick={() => setActiveModule('frontoffice')}>
                <div className="module-icon">🏢</div>
                <h3>Front Office</h3>
                <p>Patient registration, billing, and appointment management</p>
                <button className="module-btn">Access Module</button>
              </div>

              <div className="module-card" onClick={() => setActiveModule('doctor')}>
                <div className="module-icon">👨‍⚕️</div>
                <h3>Doctor's Module</h3>
                <p>Patient consultations, prescriptions, and medical records</p>
                <button className="module-btn">Access Module</button>
              </div>

              <div className="module-card" onClick={() => setActiveModule('nursing')}>
                <div className="module-icon">👩‍⚕️</div>
                <h3>Nursing Module</h3>
                <p>Vitals monitoring, medication, and patient care</p>
                <button className="module-btn">Access Module</button>
              </div>

              <div className="module-card" onClick={() => setActiveModule('laboratory')}>
                <div className="module-icon">🔬</div>
                <h3>Laboratory</h3>
                <p>Test requests, sample collection, and results management</p>
                <button className="module-btn">Access Module</button>
              </div>

              <div className="module-card" onClick={() => setActiveModule('specialty')}>
                <div className="module-icon">🏥</div>
                <h3>Specialty Departments</h3>
                <p>Department-specific workflows and procedures</p>
                <button className="module-btn">Access Module</button>
              </div>

              <div className="module-card disabled">
                <div className="module-icon">📊</div>
                <h3>Reports & Analytics</h3>
                <p>Coming soon...</p>
                <button className="module-btn" disabled>Coming Soon</button>
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
        );
    }
  };

  return (
    <div className="App">
      {activeModule !== 'home' && (
        <nav className="main-nav">
          <button className="nav-home-btn" onClick={() => setActiveModule('home')}>
            🏠 Home
          </button>
          <div className="nav-modules">
            <button 
              className={activeModule === 'frontoffice' ? 'active' : ''} 
              onClick={() => setActiveModule('frontoffice')}
            >
              🏢 Front Office
            </button>
            <button 
              className={activeModule === 'doctor' ? 'active' : ''} 
              onClick={() => setActiveModule('doctor')}
            >
              👨‍⚕️ Doctor
            </button>
            <button 
              className={activeModule === 'nursing' ? 'active' : ''} 
              onClick={() => setActiveModule('nursing')}
            >
              👩‍⚕️ Nursing
            </button>
            <button 
              className={activeModule === 'laboratory' ? 'active' : ''} 
              onClick={() => setActiveModule('laboratory')}
            >
              🔬 Laboratory
            </button>
            <button 
              className={activeModule === 'specialty' ? 'active' : ''} 
              onClick={() => setActiveModule('specialty')}
            >
              🏥 Specialty
            </button>
          </div>
        </nav>
      )}
      {renderModule()}
    </div>
  );
}

export default App;
