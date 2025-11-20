import React, { useState } from 'react';
import './Doctor.css';

const Doctor = () => {
  const [activeTab, setActiveTab] = useState('worklist');
  const [patients, setPatients] = useState([
    { id: 'PAT001', name: 'John Doe', age: 45, gender: 'Male', chiefComplaint: 'Fever and cough', status: 'waiting', priority: 'routine', appointmentTime: '09:00 AM', vitals: { bp: '120/80', temp: '101°F', pulse: '85' } },
    { id: 'PAT002', name: 'Jane Smith', age: 32, gender: 'Female', chiefComplaint: 'Chest pain', status: 'waiting', priority: 'urgent', appointmentTime: '09:15 AM', vitals: { bp: '140/90', temp: '98.6°F', pulse: '95' } },
    { id: 'PAT003', name: 'Bob Wilson', age: 60, gender: 'Male', chiefComplaint: 'Diabetes follow-up', status: 'waiting', priority: 'routine', appointmentTime: '09:30 AM', vitals: { bp: '130/85', temp: '98.4°F', pulse: '78' } }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [consultation, setConsultation] = useState({
    symptoms: '',
    diagnosis: '',
    treatment: '',
    prescriptions: [],
    investigations: [],
    followUp: '',
    notes: ''
  });

  const [prescription, setPrescription] = useState({
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  const commonMedicines = [
    'Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Omeprazole', 'Metformin',
    'Aspirin', 'Atorvastatin', 'Ciprofloxacin', 'Azithromycin', 'Cetirizine'
  ];

  const investigations = [
    'Blood Test - CBC', 'Blood Sugar', 'Lipid Profile', 'Liver Function Test',
    'Kidney Function Test', 'X-Ray Chest', 'ECG', 'Ultrasound', 'CT Scan', 'MRI'
  ];

  const handleConsultationChange = (e) => {
    const { name, value } = e.target;
    setConsultation(prev => ({ ...prev, [name]: value }));
  };

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescription(prev => ({ ...prev, [name]: value }));
  };

  const addPrescription = () => {
    if (prescription.medicine && prescription.dosage) {
      setConsultation(prev => ({
        ...prev,
        prescriptions: [...prev.prescriptions, { ...prescription, id: Date.now() }]
      }));
      setPrescription({
        medicine: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
    }
  };

  const removePrescription = (id) => {
    setConsultation(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.filter(p => p.id !== id)
    }));
  };

  const toggleInvestigation = (inv) => {
    setConsultation(prev => ({
      ...prev,
      investigations: prev.investigations.includes(inv)
        ? prev.investigations.filter(i => i !== inv)
        : [...prev.investigations, inv]
    }));
  };

  const startConsultation = (patient) => {
    setSelectedPatient(patient);
    setPatients(patients.map(p => 
      p.id === patient.id ? { ...p, status: 'in-consultation' } : p
    ));
    setActiveTab('consultation');
  };

  const completeConsultation = () => {
    if (!consultation.diagnosis) {
      alert('Please enter a diagnosis before completing consultation');
      return;
    }

    setPatients(patients.map(p => 
      p.id === selectedPatient.id ? { ...p, status: 'completed', consultation } : p
    ));

    alert('Consultation completed successfully!');
    setSelectedPatient(null);
    setConsultation({
      symptoms: '',
      diagnosis: '',
      treatment: '',
      prescriptions: [],
      investigations: [],
      followUp: '',
      notes: ''
    });
    setActiveTab('worklist');
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: '#dc3545',
      routine: '#28a745',
      emergency: '#ff0000'
    };
    return colors[priority] || '#6c757d';
  };

  const renderWorklist = () => (
    <div className="worklist-container">
      <div className="worklist-header">
        <h3>Patient Queue</h3>
        <div className="worklist-stats">
          <div className="stat-card-small">
            <span className="stat-label">Waiting</span>
            <span className="stat-value">{patients.filter(p => p.status === 'waiting').length}</span>
          </div>
          <div className="stat-card-small">
            <span className="stat-label">In Consultation</span>
            <span className="stat-value">{patients.filter(p => p.status === 'in-consultation').length}</span>
          </div>
          <div className="stat-card-small">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{patients.filter(p => p.status === 'completed').length}</span>
          </div>
        </div>
      </div>

      <div className="patient-queue">
        {patients.filter(p => p.status !== 'completed').map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="patient-card-header">
              <div className="patient-info">
                <h4>{patient.name}</h4>
                <span className="patient-id">ID: {patient.id}</span>
              </div>
              <span 
                className="priority-badge" 
                style={{ backgroundColor: getPriorityColor(patient.priority) }}
              >
                {patient.priority.toUpperCase()}
              </span>
            </div>

            <div className="patient-card-body">
              <div className="patient-detail">
                <span className="detail-label">Age/Gender:</span>
                <span className="detail-value">{patient.age} years / {patient.gender}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{patient.appointmentTime}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">Chief Complaint:</span>
                <span className="detail-value">{patient.chiefComplaint}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">Vitals:</span>
                <span className="detail-value">
                  BP: {patient.vitals.bp} | Temp: {patient.vitals.temp} | Pulse: {patient.vitals.pulse}
                </span>
              </div>
            </div>

            <div className="patient-card-footer">
              {patient.status === 'waiting' && (
                <button 
                  className="btn-start-consultation"
                  onClick={() => startConsultation(patient)}
                >
                  Start Consultation
                </button>
              )}
              {patient.status === 'in-consultation' && (
                <span className="consultation-badge">In Consultation</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConsultation = () => (
    <div className="consultation-container">
      {selectedPatient ? (
        <>
          <div className="patient-header-card">
            <div className="patient-header-info">
              <h3>{selectedPatient.name}</h3>
              <p>ID: {selectedPatient.id} | Age: {selectedPatient.age} | Gender: {selectedPatient.gender}</p>
              <p><strong>Chief Complaint:</strong> {selectedPatient.chiefComplaint}</p>
              <p><strong>Vitals:</strong> BP: {selectedPatient.vitals.bp} | Temp: {selectedPatient.vitals.temp} | Pulse: {selectedPatient.vitals.pulse}</p>
            </div>
          </div>

          <div className="consultation-form">
            <div className="form-section">
              <h4>Symptoms & History</h4>
              <textarea
                name="symptoms"
                value={consultation.symptoms}
                onChange={handleConsultationChange}
                rows="4"
                placeholder="Enter detailed symptoms and patient history..."
              />
            </div>

            <div className="form-section">
              <h4>Diagnosis *</h4>
              <textarea
                name="diagnosis"
                value={consultation.diagnosis}
                onChange={handleConsultationChange}
                rows="3"
                placeholder="Enter diagnosis..."
                required
              />
            </div>

            <div className="form-section">
              <h4>Treatment Plan</h4>
              <textarea
                name="treatment"
                value={consultation.treatment}
                onChange={handleConsultationChange}
                rows="3"
                placeholder="Enter treatment plan..."
              />
            </div>

            <div className="form-section">
              <h4>Prescriptions</h4>
              <div className="prescription-form">
                <div className="prescription-inputs">
                  <select
                    name="medicine"
                    value={prescription.medicine}
                    onChange={handlePrescriptionChange}
                  >
                    <option value="">Select Medicine</option>
                    {commonMedicines.map((med, idx) => (
                      <option key={idx} value={med}>{med}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="dosage"
                    value={prescription.dosage}
                    onChange={handlePrescriptionChange}
                    placeholder="Dosage (e.g., 500mg)"
                  />
                  <input
                    type="text"
                    name="frequency"
                    value={prescription.frequency}
                    onChange={handlePrescriptionChange}
                    placeholder="Frequency (e.g., 3x daily)"
                  />
                  <input
                    type="text"
                    name="duration"
                    value={prescription.duration}
                    onChange={handlePrescriptionChange}
                    placeholder="Duration (e.g., 7 days)"
                  />
                  <button type="button" onClick={addPrescription} className="btn-add">
                    Add
                  </button>
                </div>
                <input
                  type="text"
                  name="instructions"
                  value={prescription.instructions}
                  onChange={handlePrescriptionChange}
                  placeholder="Special instructions (e.g., after meals)"
                />
              </div>

              {consultation.prescriptions.length > 0 && (
                <div className="prescription-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                        <th>Instructions</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultation.prescriptions.map(presc => (
                        <tr key={presc.id}>
                          <td>{presc.medicine}</td>
                          <td>{presc.dosage}</td>
                          <td>{presc.frequency}</td>
                          <td>{presc.duration}</td>
                          <td>{presc.instructions}</td>
                          <td>
                            <button 
                              className="btn-remove-small"
                              onClick={() => removePrescription(presc.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="form-section">
              <h4>Investigations Required</h4>
              <div className="investigations-grid">
                {investigations.map((inv, idx) => (
                  <label key={idx} className="investigation-checkbox">
                    <input
                      type="checkbox"
                      checked={consultation.investigations.includes(inv)}
                      onChange={() => toggleInvestigation(inv)}
                    />
                    <span>{inv}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h4>Follow-up</h4>
              <input
                type="text"
                name="followUp"
                value={consultation.followUp}
                onChange={handleConsultationChange}
                placeholder="Follow-up schedule (e.g., After 1 week)"
              />
            </div>

            <div className="form-section">
              <h4>Additional Notes</h4>
              <textarea
                name="notes"
                value={consultation.notes}
                onChange={handleConsultationChange}
                rows="3"
                placeholder="Any additional notes..."
              />
            </div>

            <div className="consultation-actions">
              <button className="btn-secondary" onClick={() => {
                setActiveTab('worklist');
                setSelectedPatient(null);
              }}>
                Cancel
              </button>
              <button className="btn-primary" onClick={completeConsultation}>
                Complete Consultation
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>Please select a patient from the worklist to start consultation</p>
          <button className="btn-primary" onClick={() => setActiveTab('worklist')}>
            Go to Worklist
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="doctor-module">
      <header className="doctor-header">
        <h1>👨‍⚕️ Doctor's Module</h1>
        <p>Patient consultation and prescription management</p>
      </header>

      <nav className="doctor-tabs">
        <button
          className={`doctor-tab ${activeTab === 'worklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('worklist')}
        >
          📋 Patient Queue
        </button>
        <button
          className={`doctor-tab ${activeTab === 'consultation' ? 'active' : ''}`}
          onClick={() => setActiveTab('consultation')}
        >
          🩺 Consultation
        </button>
      </nav>

      <main className="doctor-content">
        {activeTab === 'worklist' && renderWorklist()}
        {activeTab === 'consultation' && renderConsultation()}
      </main>
    </div>
  );
};

export default Doctor;
