import React, { useState } from 'react';
import './Specialty.css';
import Navbar from '../Navbar/Navbar';

const Specialty = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('cardiology');
  
  const specialties = {
    cardiology: {
      name: 'Cardiology',
      icon: '❤️',
      color: '#e74c3c',
      procedures: ['ECG', 'Echo', 'Stress Test', 'Angiography', 'Holter Monitor'],
      worklist: [
        { id: 'CARD001', patient: 'John Doe', procedure: 'ECG', status: 'scheduled', time: '09:00 AM', priority: 'routine' },
        { id: 'CARD002', patient: 'Jane Smith', procedure: 'Echo', status: 'in-progress', time: '10:00 AM', priority: 'urgent' },
        { id: 'CARD003', patient: 'Bob Wilson', procedure: 'Stress Test', status: 'pending', time: '11:00 AM', priority: 'routine' }
      ]
    },
    orthopedics: {
      name: 'Orthopedics',
      icon: '🦴',
      color: '#3498db',
      procedures: ['X-Ray', 'MRI', 'CT Scan', 'Bone Scan', 'Arthroscopy'],
      worklist: [
        { id: 'ORTH001', patient: 'Alice Brown', procedure: 'X-Ray', status: 'completed', time: '09:30 AM', priority: 'urgent' },
        { id: 'ORTH002', patient: 'Charlie Davis', procedure: 'MRI', status: 'scheduled', time: '11:00 AM', priority: 'routine' }
      ]
    },
    pediatrics: {
      name: 'Pediatrics',
      icon: '👶',
      color: '#f39c12',
      procedures: ['Vaccination', 'Growth Assessment', 'Developmental Screening', 'Newborn Screening'],
      worklist: [
        { id: 'PED001', patient: 'Emma Johnson', procedure: 'Vaccination', status: 'scheduled', time: '08:00 AM', priority: 'routine' },
        { id: 'PED002', patient: 'Oliver Miller', procedure: 'Growth Assessment', status: 'pending', time: '09:00 AM', priority: 'routine' }
      ]
    },
    neurology: {
      name: 'Neurology',
      icon: '🧠',
      color: '#9b59b6',
      procedures: ['EEG', 'EMG', 'Brain MRI', 'Nerve Conduction Study', 'Lumbar Puncture'],
      worklist: [
        { id: 'NEUR001', patient: 'Sarah Wilson', procedure: 'EEG', status: 'in-progress', time: '10:00 AM', priority: 'urgent' },
        { id: 'NEUR002', patient: 'Michael Brown', procedure: 'Brain MRI', status: 'scheduled', time: '02:00 PM', priority: 'routine' }
      ]
    },
    radiology: {
      name: 'Radiology',
      icon: '📡',
      color: '#16a085',
      procedures: ['X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'Mammography', 'Fluoroscopy'],
      worklist: [
        { id: 'RAD001', patient: 'Lisa Anderson', procedure: 'CT Scan', status: 'scheduled', time: '09:00 AM', priority: 'stat' },
        { id: 'RAD002', patient: 'David Taylor', procedure: 'MRI', status: 'pending', time: '11:00 AM', priority: 'routine' },
        { id: 'RAD003', patient: 'Emily White', procedure: 'Ultrasound', status: 'in-progress', time: '10:30 AM', priority: 'urgent' }
      ]
    },
    dermatology: {
      name: 'Dermatology',
      icon: '🩹',
      color: '#e67e22',
      procedures: ['Skin Biopsy', 'Patch Test', 'Cryotherapy', 'Phototherapy', 'Dermoscopy'],
      worklist: [
        { id: 'DERM001', patient: 'Rachel Green', procedure: 'Skin Biopsy', status: 'scheduled', time: '10:00 AM', priority: 'routine' }
      ]
    },
    ophthalmology: {
      name: 'Ophthalmology',
      icon: '👁️',
      color: '#2ecc71',
      procedures: ['Vision Test', 'Tonometry', 'Fundoscopy', 'OCT', 'Visual Field Test'],
      worklist: [
        { id: 'OPH001', patient: 'Monica Geller', procedure: 'Vision Test', status: 'completed', time: '08:30 AM', priority: 'routine' },
        { id: 'OPH002', patient: 'Ross Geller', procedure: 'OCT', status: 'scheduled', time: '11:00 AM', priority: 'routine' }
      ]
    },
    ent: {
      name: 'ENT (Ear, Nose & Throat)',
      icon: '👂',
      color: '#34495e',
      procedures: ['Audiometry', 'Endoscopy', 'Tympanometry', 'Laryngoscopy', 'Rhinoscopy'],
      worklist: [
        { id: 'ENT001', patient: 'Phoebe Buffay', procedure: 'Audiometry', status: 'in-progress', time: '09:00 AM', priority: 'routine' },
        { id: 'ENT002', patient: 'Joey Tribbiani', procedure: 'Endoscopy', status: 'pending', time: '10:00 AM', priority: 'urgent' }
      ]
    }
  };

  const [procedureForm, setProcedureForm] = useState({
    patientId: '',
    patientName: '',
    procedure: '',
    scheduledTime: '',
    priority: 'routine',
    notes: ''
  });

  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [procedureResults, setProcedureResults] = useState({
    findings: '',
    interpretation: '',
    recommendations: '',
    performedBy: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProcedureForm(prev => ({ ...prev, [name]: value }));
  };

  const handleResultsChange = (e) => {
    const { name, value } = e.target;
    setProcedureResults(prev => ({ ...prev, [name]: value }));
  };

  const scheduleProcedure = (e) => {
    e.preventDefault();
    alert(`Procedure scheduled successfully in ${specialties[selectedSpecialty].name}`);
    setProcedureForm({
      patientId: '',
      patientName: '',
      procedure: '',
      scheduledTime: '',
      priority: 'routine',
      notes: ''
    });
  };

  const startProcedure = (procedure) => {
    setSelectedProcedure(procedure);
  };

  const completeProcedure = () => {
    if (!procedureResults.findings || !procedureResults.performedBy) {
      alert('Please fill in findings and performed by fields');
      return;
    }
    alert('Procedure completed successfully!');
    setSelectedProcedure(null);
    setProcedureResults({
      findings: '',
      interpretation: '',
      recommendations: '',
      performedBy: ''
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      scheduled: '#17a2b8',
      'in-progress': '#007bff',
      completed: '#28a745'
    };
    return colors[status] || '#6c757d';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      stat: '#dc3545',
      urgent: '#ff6b6b',
      routine: '#28a745'
    };
    return colors[priority] || '#6c757d';
  };

  const currentSpecialty = specialties[selectedSpecialty];

  return (
    <div className="specialty-module">
      <Navbar/>
      <header className="specialty-header">
        <h1>🏥 Specialty Departments</h1>
        <p>Department-specific workflows and procedures</p>
      </header>

      <div className="specialty-container">
        {/* Sidebar with specialties */}
        <aside className="specialty-sidebar">
          <h3>Departments</h3>
          {Object.entries(specialties).map(([key, spec]) => (
            <button
              key={key}
              className={`specialty-btn ${selectedSpecialty === key ? 'active' : ''}`}
              onClick={() => setSelectedSpecialty(key)}
              style={{
                borderLeftColor: selectedSpecialty === key ? spec.color : 'transparent'
              }}
            >
              <span className="specialty-icon">{spec.icon}</span>
              <span className="specialty-name">{spec.name}</span>
              <span className="specialty-count">
                {spec.worklist.length}
              </span>
            </button>
          ))}
        </aside>

        {/* Main content area */}
        <main className="specialty-main">
          <div className="specialty-title" style={{ borderLeftColor: currentSpecialty.color }}>
            <span className="title-icon">{currentSpecialty.icon}</span>
            <h2>{currentSpecialty.name} Department</h2>
          </div>

          {/* Worklist Section */}
          <section className="worklist-section">
            <div className="section-header">
              <h3>Department Worklist</h3>
              <div className="worklist-summary">
                <span className="summary-item">
                  Pending: {currentSpecialty.worklist.filter(w => w.status === 'pending' || w.status === 'scheduled').length}
                </span>
                <span className="summary-item">
                  In Progress: {currentSpecialty.worklist.filter(w => w.status === 'in-progress').length}
                </span>
                <span className="summary-item">
                  Completed: {currentSpecialty.worklist.filter(w => w.status === 'completed').length}
                </span>
              </div>
            </div>

            <div className="worklist-grid">
              {currentSpecialty.worklist.map(item => (
                <div key={item.id} className="worklist-card">
                  <div className="card-header-row">
                    <span className="procedure-id">{item.id}</span>
                    <span 
                      className="priority-tag"
                      style={{ backgroundColor: getPriorityColor(item.priority) }}
                    >
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="card-content">
                    <h4>{item.patient}</h4>
                    <div className="procedure-info">
                      <span className="info-label">Procedure:</span>
                      <span className="info-value">{item.procedure}</span>
                    </div>
                    <div className="procedure-info">
                      <span className="info-label">Time:</span>
                      <span className="info-value">{item.time}</span>
                    </div>
                    <div className="procedure-info">
                      <span className="info-label">Status:</span>
                      <span 
                        className="status-tag"
                        style={{ backgroundColor: getStatusColor(item.status) }}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions">
                    {(item.status === 'pending' || item.status === 'scheduled') && (
                      <button 
                        className="btn-start"
                        onClick={() => startProcedure(item)}
                      >
                        Start Procedure
                      </button>
                    )}
                    {item.status === 'in-progress' && (
                      <button 
                        className="btn-complete"
                        onClick={() => startProcedure(item)}
                      >
                        Complete
                      </button>
                    )}
                    {item.status === 'completed' && (
                      <button className="btn-view">
                        View Results
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule New Procedure */}
          <section className="schedule-section">
            <h3>Schedule New Procedure</h3>
            <form onSubmit={scheduleProcedure} className="schedule-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Patient ID *</label>
                  <input
                    type="text"
                    name="patientId"
                    value={procedureForm.patientId}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter Patient ID"
                  />
                </div>
                <div className="form-group">
                  <label>Patient Name *</label>
                  <input
                    type="text"
                    name="patientName"
                    value={procedureForm.patientName}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter Patient Name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Procedure *</label>
                  <select
                    name="procedure"
                    value={procedureForm.procedure}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Procedure</option>
                    {currentSpecialty.procedures.map((proc, idx) => (
                      <option key={idx} value={proc}>{proc}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Scheduled Time *</label>
                  <input
                    type="time"
                    name="scheduledTime"
                    value={procedureForm.scheduledTime}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Priority *</label>
                  <select
                    name="priority"
                    value={procedureForm.priority}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="stat">STAT</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={procedureForm.notes}
                  onChange={handleFormChange}
                  rows="3"
                  placeholder="Additional notes or special instructions"
                />
              </div>

              <button type="submit" className="btn-schedule">
                Schedule Procedure
              </button>
            </form>
          </section>
        </main>
      </div>

      {/* Procedure Results Modal */}
      {selectedProcedure && (
        <div className="modal-overlay" onClick={() => setSelectedProcedure(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Procedure Results - {selectedProcedure.procedure}</h3>
              <button className="modal-close" onClick={() => setSelectedProcedure(null)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="procedure-details">
                <p><strong>Patient:</strong> {selectedProcedure.patient}</p>
                <p><strong>Procedure ID:</strong> {selectedProcedure.id}</p>
                <p><strong>Department:</strong> {currentSpecialty.name}</p>
              </div>

              <div className="results-form">
                <div className="form-group">
                  <label>Findings *</label>
                  <textarea
                    name="findings"
                    value={procedureResults.findings}
                    onChange={handleResultsChange}
                    rows="4"
                    placeholder="Enter detailed findings..."
                  />
                </div>

                <div className="form-group">
                  <label>Interpretation</label>
                  <textarea
                    name="interpretation"
                    value={procedureResults.interpretation}
                    onChange={handleResultsChange}
                    rows="3"
                    placeholder="Clinical interpretation..."
                  />
                </div>

                <div className="form-group">
                  <label>Recommendations</label>
                  <textarea
                    name="recommendations"
                    value={procedureResults.recommendations}
                    onChange={handleResultsChange}
                    rows="3"
                    placeholder="Recommendations for further action..."
                  />
                </div>

                <div className="form-group">
                  <label>Performed By *</label>
                  <input
                    type="text"
                    name="performedBy"
                    value={procedureResults.performedBy}
                    onChange={handleResultsChange}
                    placeholder="Specialist name"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedProcedure(null)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={completeProcedure}>
                Complete Procedure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Specialty;
