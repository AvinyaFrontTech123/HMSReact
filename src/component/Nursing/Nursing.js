import React, { useState } from 'react';
import './Nursing.css';
import Navbar from '../Navbar/Navbar';

const Nursing = () => {
  const [activeTab, setActiveTab] = useState('worklist');
  const [patients, setPatients] = useState([
    { 
      id: 'PAT001', 
      name: 'John Doe', 
      age: 45, 
      bed: 'ICU-101', 
      department: 'ICU',
      status: 'critical',
      tasks: ['Vitals check', 'Medication due', 'IV line check'],
      lastVitals: '2 hours ago',
      medications: [
        { name: 'Paracetamol', time: '10:00 AM', status: 'pending' },
        { name: 'Antibiotic IV', time: '12:00 PM', status: 'pending' }
      ]
    },
    { 
      id: 'PAT002', 
      name: 'Jane Smith', 
      age: 32, 
      bed: 'Ward-205', 
      department: 'General Ward',
      status: 'stable',
      tasks: ['Vitals check', 'Wound dressing'],
      lastVitals: '4 hours ago',
      medications: [
        { name: 'Ibuprofen', time: '09:00 AM', status: 'completed' },
        { name: 'Amoxicillin', time: '02:00 PM', status: 'pending' }
      ]
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vitals, setVitals] = useState({
    bloodPressure: '',
    temperature: '',
    pulse: '',
    respiration: '',
    oxygenSaturation: '',
    bloodSugar: '',
    weight: '',
    notes: ''
  });

  const [medicationRecord, setMedicationRecord] = useState({
    medication: '',
    dose: '',
    route: '',
    administeredBy: '',
    notes: ''
  });

  const [nursingNote, setNursingNote] = useState({
    category: 'general',
    note: '',
    priority: 'routine'
  });

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitals(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (e) => {
    const { name, value } = e.target;
    setMedicationRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setNursingNote(prev => ({ ...prev, [name]: value }));
  };

  const submitVitals = () => {
    if (!vitals.bloodPressure || !vitals.temperature || !vitals.pulse) {
      alert('Please fill in at least BP, Temperature, and Pulse');
      return;
    }

    alert('Vitals recorded successfully!');
    setVitals({
      bloodPressure: '',
      temperature: '',
      pulse: '',
      respiration: '',
      oxygenSaturation: '',
      bloodSugar: '',
      weight: '',
      notes: ''
    });
    setActiveTab('worklist');
  };

  const administerMedication = () => {
    if (!medicationRecord.medication || !medicationRecord.administeredBy) {
      alert('Please fill in medication details and your name');
      return;
    }

    alert('Medication administered successfully!');
    setMedicationRecord({
      medication: '',
      dose: '',
      route: '',
      administeredBy: '',
      notes: ''
    });
  };

  const submitNursingNote = () => {
    if (!nursingNote.note) {
      alert('Please enter a note');
      return;
    }

    alert('Nursing note added successfully!');
    setNursingNote({
      category: 'general',
      note: '',
      priority: 'routine'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      critical: '#dc3545',
      stable: '#28a745',
      monitoring: '#ffc107'
    };
    return colors[status] || '#6c757d';
  };

  const renderWorklist = () => (
    <div className="nursing-worklist">
      <div className="worklist-header">
        <h3>Patient Care Worklist</h3>
        <div className="shift-info">
          <span>Current Shift: Day (7 AM - 3 PM)</span>
          <span>Nurse: Sarah Johnson</span>
        </div>
      </div>

      <div className="worklist-summary">
        <div className="summary-card">
          <span className="summary-label">Total Patients</span>
          <span className="summary-value">{patients.length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Critical</span>
          <span className="summary-value critical">{patients.filter(p => p.status === 'critical').length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Pending Tasks</span>
          <span className="summary-value">{patients.reduce((sum, p) => sum + p.tasks.length, 0)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Medications Due</span>
          <span className="summary-value">{patients.reduce((sum, p) => sum + p.medications.filter(m => m.status === 'pending').length, 0)}</span>
        </div>
      </div>

      <div className="patient-cards-grid">
        {patients.map(patient => (
          <div key={patient.id} className="nursing-patient-card">
            <div className="card-header">
              <div className="patient-name-info">
                <h4>{patient.name}</h4>
                <span className="bed-info">🛏️ {patient.bed}</span>
              </div>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(patient.status) }}
              >
                {patient.status.toUpperCase()}
              </span>
            </div>

            <div className="card-body">
              <div className="info-row">
                <span>ID: {patient.id}</span>
                <span>Age: {patient.age}</span>
                <span>Dept: {patient.department}</span>
              </div>
              
              <div className="tasks-section">
                <strong>Pending Tasks:</strong>
                <ul className="task-list">
                  {patient.tasks.map((task, idx) => (
                    <li key={idx}>• {task}</li>
                  ))}
                </ul>
              </div>

              <div className="medications-section">
                <strong>Medications:</strong>
                {patient.medications.filter(m => m.status === 'pending').map((med, idx) => (
                  <div key={idx} className="medication-item pending">
                    {med.name} - {med.time}
                  </div>
                ))}
              </div>

              <div className="last-vitals">
                Last vitals recorded: {patient.lastVitals}
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="btn-action-card"
                onClick={() => {
                  setSelectedPatient(patient);
                  setActiveTab('vitals');
                }}
              >
                Record Vitals
              </button>
              <button 
                className="btn-action-card"
                onClick={() => {
                  setSelectedPatient(patient);
                  setActiveTab('medication');
                }}
              >
                Medications
              </button>
              <button 
                className="btn-action-card"
                onClick={() => {
                  setSelectedPatient(patient);
                  setActiveTab('notes');
                }}
              >
                Add Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVitals = () => (
    <div className="vitals-recording">
      {selectedPatient ? (
        <>
          <div className="section-header">
            <h3>Record Vitals - {selectedPatient.name}</h3>
            <p>Bed: {selectedPatient.bed} | ID: {selectedPatient.id}</p>
          </div>

          <div className="vitals-form">
            <div className="vitals-grid">
              <div className="vital-input">
                <label>Blood Pressure *</label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={vitals.bloodPressure}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 120/80"
                />
                <span className="unit">mmHg</span>
              </div>

              <div className="vital-input">
                <label>Temperature *</label>
                <input
                  type="text"
                  name="temperature"
                  value={vitals.temperature}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 98.6"
                />
                <span className="unit">°F</span>
              </div>

              <div className="vital-input">
                <label>Pulse Rate *</label>
                <input
                  type="text"
                  name="pulse"
                  value={vitals.pulse}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 80"
                />
                <span className="unit">bpm</span>
              </div>

              <div className="vital-input">
                <label>Respiration Rate</label>
                <input
                  type="text"
                  name="respiration"
                  value={vitals.respiration}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 16"
                />
                <span className="unit">per min</span>
              </div>

              <div className="vital-input">
                <label>Oxygen Saturation</label>
                <input
                  type="text"
                  name="oxygenSaturation"
                  value={vitals.oxygenSaturation}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 98"
                />
                <span className="unit">%</span>
              </div>

              <div className="vital-input">
                <label>Blood Sugar</label>
                <input
                  type="text"
                  name="bloodSugar"
                  value={vitals.bloodSugar}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 110"
                />
                <span className="unit">mg/dL</span>
              </div>

              <div className="vital-input">
                <label>Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={vitals.weight}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 70"
                />
                <span className="unit">kg</span>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={vitals.notes}
                onChange={handleVitalsChange}
                rows="3"
                placeholder="Any observations or notes..."
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setActiveTab('worklist')}>
                Cancel
              </button>
              <button className="btn-primary" onClick={submitVitals}>
                Save Vitals
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>Please select a patient from the worklist</p>
        </div>
      )}
    </div>
  );

  const renderMedication = () => (
    <div className="medication-admin">
      {selectedPatient ? (
        <>
          <div className="section-header">
            <h3>Medication Administration - {selectedPatient.name}</h3>
            <p>Bed: {selectedPatient.bed} | ID: {selectedPatient.id}</p>
          </div>

          <div className="scheduled-medications">
            <h4>Scheduled Medications</h4>
            <div className="med-schedule-list">
              {selectedPatient.medications.map((med, idx) => (
                <div key={idx} className={`med-schedule-item ${med.status}`}>
                  <div className="med-info">
                    <strong>{med.name}</strong>
                    <span>Scheduled: {med.time}</span>
                  </div>
                  <span className={`med-status ${med.status}`}>
                    {med.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="medication-form">
            <h4>Administer Medication</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Medication *</label>
                <input
                  type="text"
                  name="medication"
                  value={medicationRecord.medication}
                  onChange={handleMedicationChange}
                  placeholder="Medication name"
                />
              </div>
              <div className="form-group">
                <label>Dose *</label>
                <input
                  type="text"
                  name="dose"
                  value={medicationRecord.dose}
                  onChange={handleMedicationChange}
                  placeholder="e.g., 500mg"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Route</label>
                <select
                  name="route"
                  value={medicationRecord.route}
                  onChange={handleMedicationChange}
                >
                  <option value="">Select Route</option>
                  <option value="oral">Oral</option>
                  <option value="iv">IV</option>
                  <option value="im">IM</option>
                  <option value="sc">Subcutaneous</option>
                  <option value="topical">Topical</option>
                </select>
              </div>
              <div className="form-group">
                <label>Administered By *</label>
                <input
                  type="text"
                  name="administeredBy"
                  value={medicationRecord.administeredBy}
                  onChange={handleMedicationChange}
                  placeholder="Nurse name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={medicationRecord.notes}
                onChange={handleMedicationChange}
                rows="2"
                placeholder="Any special notes..."
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setActiveTab('worklist')}>
                Cancel
              </button>
              <button className="btn-primary" onClick={administerMedication}>
                Record Administration
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>Please select a patient from the worklist</p>
        </div>
      )}
    </div>
  );

  const renderNotes = () => (
    <div className="nursing-notes">
      {selectedPatient ? (
        <>
          <div className="section-header">
            <h3>Nursing Notes - {selectedPatient.name}</h3>
            <p>Bed: {selectedPatient.bed} | ID: {selectedPatient.id}</p>
          </div>

          <div className="notes-form">
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={nursingNote.category}
                  onChange={handleNoteChange}
                >
                  <option value="general">General Observation</option>
                  <option value="assessment">Assessment</option>
                  <option value="intervention">Intervention</option>
                  <option value="response">Patient Response</option>
                  <option value="incident">Incident Report</option>
                  <option value="discharge">Discharge Planning</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={nursingNote.priority}
                  onChange={handleNoteChange}
                >
                  <option value="routine">Routine</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Note *</label>
              <textarea
                name="note"
                value={nursingNote.note}
                onChange={handleNoteChange}
                rows="6"
                placeholder="Enter detailed nursing note..."
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setActiveTab('worklist')}>
                Cancel
              </button>
              <button className="btn-primary" onClick={submitNursingNote}>
                Save Note
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>Please select a patient from the worklist</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="nursing-module">
      <Navbar/>
      <header className="nursing-header">
        <h1>👩‍⚕️ Nursing Module</h1>
        <p>Patient care, vitals monitoring, and medication administration</p>
      </header>

      <nav className="nursing-tabs">
        <button
          className={`nursing-tab ${activeTab === 'worklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('worklist')}
        >
          📋 Worklist
        </button>
        <button
          className={`nursing-tab ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          🩺 Record Vitals
        </button>
        <button
          className={`nursing-tab ${activeTab === 'medication' ? 'active' : ''}`}
          onClick={() => setActiveTab('medication')}
        >
          💊 Medications
        </button>
        <button
          className={`nursing-tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          📝 Nursing Notes
        </button>
      </nav>

      <main className="nursing-content">
        {activeTab === 'worklist' && renderWorklist()}
        {activeTab === 'vitals' && renderVitals()}
        {activeTab === 'medication' && renderMedication()}
        {activeTab === 'notes' && renderNotes()}
      </main>
    </div>
  );
};

export default Nursing;
