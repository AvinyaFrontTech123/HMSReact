import React, { useState } from 'react';
import PatientRegistration from './PatientRegistration';
import OutpatientBilling from './OutpatientBilling';
import './HospitalFrontOffice.css';
import Navbar from '../Navbar/Navbar';

const HospitalFrontOffice = () => {
  const [activeTab, setActiveTab] = useState('registration');
  const [registeredPatient, setRegisteredPatient] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);

  const handleRegistrationComplete = (patientData) => {
    setRegisteredPatient(patientData);
    setRecentPatients(prev => [patientData, ...prev.slice(0, 9)]); // Keep last 10 patients
    // Optionally switch to billing tab after registration
    // setActiveTab('billing');
  };

  const handleSelectPatient = (patient) => {
    setRegisteredPatient(patient);
    setActiveTab('billing');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'registration':
        return <PatientRegistration onRegistrationComplete={handleRegistrationComplete} />;
      case 'billing':
        return <OutpatientBilling patientData={registeredPatient} />;
      case 'dashboard':
        return (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h2>Front Office Dashboard</h2>
              <p>Quick overview and recent activities</p>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Patients</h3>
                  <p className="stat-number">{recentPatients.length}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <h3>Today's Registrations</h3>
                  <p className="stat-number">
                    {recentPatients.filter(p => {
                      const today = new Date().toDateString();
                      const regDate = new Date(p.registrationDate).toDateString();
                      return today === regDate;
                    }).length}
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💳</div>
                <div className="stat-info">
                  <h3>Pending Bills</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>Completed Today</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>
            </div>

            {recentPatients.length > 0 && (
              <div className="recent-patients-section">
                <h3>Recent Patient Registrations</h3>
                <div className="recent-patients-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Registration Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPatients.map((patient, index) => (
                        <tr key={index}>
                          <td>{patient.patientId}</td>
                          <td>{`${patient.firstName} ${patient.lastName}`}</td>
                          <td>{patient.phoneNumber}</td>
                          <td>{new Date(patient.registrationDate).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn-action"
                              onClick={() => handleSelectPatient(patient)}
                            >
                              Create Bill
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {recentPatients.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No Recent Patients</h3>
                <p>Register a new patient to get started</p>
                <button 
                  className="btn-primary"
                  onClick={() => setActiveTab('registration')}
                >
                  Register New Patient
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="hospital-front-office">
      <Navbar/>
      <header className="front-office-header">
        <div className="header-content">
          <h1>🏥 Hospital Front Office</h1>
          <p className="subtitle">Patient Registration & Billing Management System</p>
        </div>
      </header>

      <nav className="navigation-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="tab-icon">📊</span>
          Dashboard
        </button>
        <button
          className={`nav-tab ${activeTab === 'registration' ? 'active' : ''}`}
          onClick={() => setActiveTab('registration')}
        >
          <span className="tab-icon">📝</span>
          Patient Registration
        </button>
        <button
          className={`nav-tab ${activeTab === 'billing' ? 'active' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          <span className="tab-icon">💰</span>
          Outpatient Billing
        </button>
      </nav>

      <main className="content-area">
        {renderTabContent()}
      </main>

      <footer className="front-office-footer">
        <p>&copy; 2025 Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HospitalFrontOffice;
