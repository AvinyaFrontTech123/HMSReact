import React, { useState } from 'react';
import './Laboratory.css';

const Laboratory = () => {
  const [activeTab, setActiveTab] = useState('worklist');
  const [tests, setTests] = useState([
    { id: 'LAB001', patientId: 'PAT12345', patientName: 'John Doe', testType: 'Blood Test', status: 'pending', priority: 'routine', requestedBy: 'Dr. Smith', requestDate: '2025-11-12' },
    { id: 'LAB002', patientId: 'PAT12346', patientName: 'Jane Smith', testType: 'Urine Analysis', status: 'collected', priority: 'urgent', requestedBy: 'Dr. Johnson', requestDate: '2025-11-12' },
    { id: 'LAB003', patientId: 'PAT12347', patientName: 'Bob Wilson', testType: 'X-Ray', status: 'processing', priority: 'stat', requestedBy: 'Dr. Brown', requestDate: '2025-11-12' }
  ]);

  const [selectedTest, setSelectedTest] = useState(null);
  const [testRequest, setTestRequest] = useState({
    patientId: '',
    patientName: '',
    testType: '',
    priority: 'routine',
    requestedBy: '',
    notes: ''
  });

  const [testResults, setTestResults] = useState({
    testId: '',
    results: '',
    findings: '',
    technician: '',
    reviewedBy: ''
  });

  const testTypes = [
    'Blood Test', 'Complete Blood Count (CBC)', 'Blood Sugar', 'Lipid Profile',
    'Liver Function Test', 'Kidney Function Test', 'Thyroid Profile',
    'Urine Analysis', 'Stool Test', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound',
    'ECG', 'Echo', 'Pathology', 'Microbiology', 'Culture Test'
  ];

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setTestRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleResultsChange = (e) => {
    const { name, value } = e.target;
    setTestResults(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const newTest = {
      id: `LAB${String(tests.length + 1).padStart(3, '0')}`,
      ...testRequest,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0]
    };
    setTests([...tests, newTest]);
    setTestRequest({
      patientId: '',
      patientName: '',
      testType: '',
      priority: 'routine',
      requestedBy: '',
      notes: ''
    });
    alert('Test request submitted successfully!');
  };

  const handleCollectSample = (testId) => {
    setTests(tests.map(test => 
      test.id === testId ? { ...test, status: 'collected' } : test
    ));
    alert(`Sample collected for test ${testId}`);
  };

  const handleStartProcessing = (testId) => {
    setTests(tests.map(test => 
      test.id === testId ? { ...test, status: 'processing' } : test
    ));
    setSelectedTest(tests.find(t => t.id === testId));
    setTestResults({ ...testResults, testId });
    setActiveTab('results');
  };

  const handleSubmitResults = (e) => {
    e.preventDefault();
    setTests(tests.map(test => 
      test.id === testResults.testId ? { ...test, status: 'completed', results: testResults } : test
    ));
    setTestResults({
      testId: '',
      results: '',
      findings: '',
      technician: '',
      reviewedBy: ''
    });
    setSelectedTest(null);
    setActiveTab('worklist');
    alert('Test results submitted successfully!');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      collected: '#17a2b8',
      processing: '#007bff',
      completed: '#28a745',
      cancelled: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      stat: { label: 'STAT', color: '#dc3545' },
      urgent: { label: 'URGENT', color: '#ff6b6b' },
      routine: { label: 'ROUTINE', color: '#6c757d' }
    };
    return badges[priority] || badges.routine;
  };

  const renderWorklist = () => (
    <div className="worklist-container">
      <div className="worklist-header">
        <h3>Laboratory Worklist</h3>
        <div className="worklist-filters">
          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="collected">Collected</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
          <select className="filter-select">
            <option value="all">All Priorities</option>
            <option value="stat">STAT</option>
            <option value="urgent">Urgent</option>
            <option value="routine">Routine</option>
          </select>
        </div>
      </div>

      <div className="worklist-stats">
        <div className="stat-item">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{tests.filter(t => t.status === 'pending').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Collected</span>
          <span className="stat-value">{tests.filter(t => t.status === 'collected').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Processing</span>
          <span className="stat-value">{tests.filter(t => t.status === 'processing').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{tests.filter(t => t.status === 'completed').length}</span>
        </div>
      </div>

      <div className="worklist-table">
        <table>
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Test Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Requested By</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map(test => (
              <tr key={test.id}>
                <td><strong>{test.id}</strong></td>
                <td>{test.patientId}</td>
                <td>{test.patientName}</td>
                <td>{test.testType}</td>
                <td>
                  <span 
                    className="priority-badge" 
                    style={{ backgroundColor: getPriorityBadge(test.priority).color }}
                  >
                    {getPriorityBadge(test.priority).label}
                  </span>
                </td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(test.status) }}
                  >
                    {test.status.toUpperCase()}
                  </span>
                </td>
                <td>{test.requestedBy}</td>
                <td>{test.requestDate}</td>
                <td>
                  <div className="action-buttons">
                    {test.status === 'pending' && (
                      <button 
                        className="btn-action-small btn-collect"
                        onClick={() => handleCollectSample(test.id)}
                      >
                        Collect
                      </button>
                    )}
                    {test.status === 'collected' && (
                      <button 
                        className="btn-action-small btn-process"
                        onClick={() => handleStartProcessing(test.id)}
                      >
                        Process
                      </button>
                    )}
                    {test.status === 'completed' && (
                      <button className="btn-action-small btn-view">
                        View
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestRequest = () => (
    <div className="test-request-container">
      <h3>New Test Request</h3>
      <form onSubmit={handleSubmitRequest} className="test-request-form">
        <div className="form-row">
          <div className="form-group">
            <label>Patient ID *</label>
            <input
              type="text"
              name="patientId"
              value={testRequest.patientId}
              onChange={handleRequestChange}
              required
              placeholder="Enter Patient ID"
            />
          </div>
          <div className="form-group">
            <label>Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={testRequest.patientName}
              onChange={handleRequestChange}
              required
              placeholder="Enter Patient Name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Test Type *</label>
            <select
              name="testType"
              value={testRequest.testType}
              onChange={handleRequestChange}
              required
            >
              <option value="">Select Test Type</option>
              {testTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Priority *</label>
            <select
              name="priority"
              value={testRequest.priority}
              onChange={handleRequestChange}
              required
            >
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="stat">STAT</option>
            </select>
          </div>
          <div className="form-group">
            <label>Requested By *</label>
            <input
              type="text"
              name="requestedBy"
              value={testRequest.requestedBy}
              onChange={handleRequestChange}
              required
              placeholder="Doctor Name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea
              name="notes"
              value={testRequest.notes}
              onChange={handleRequestChange}
              rows="3"
              placeholder="Additional notes or special instructions"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Submit Request</button>
        </div>
      </form>
    </div>
  );

  const renderTestResults = () => (
    <div className="test-results-container">
      <h3>Enter Test Results</h3>
      {selectedTest && (
        <div className="test-info-card">
          <div className="info-row">
            <span className="info-label">Test ID:</span>
            <span className="info-value">{selectedTest.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Patient:</span>
            <span className="info-value">{selectedTest.patientName} ({selectedTest.patientId})</span>
          </div>
          <div className="info-row">
            <span className="info-label">Test Type:</span>
            <span className="info-value">{selectedTest.testType}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmitResults} className="results-form">
        <div className="form-row">
          <div className="form-group full-width">
            <label>Test Results *</label>
            <textarea
              name="results"
              value={testResults.results}
              onChange={handleResultsChange}
              rows="6"
              required
              placeholder="Enter detailed test results..."
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Findings/Observations</label>
            <textarea
              name="findings"
              value={testResults.findings}
              onChange={handleResultsChange}
              rows="4"
              placeholder="Additional findings or observations..."
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Technician Name *</label>
            <input
              type="text"
              name="technician"
              value={testResults.technician}
              onChange={handleResultsChange}
              required
              placeholder="Lab Technician Name"
            />
          </div>
          <div className="form-group">
            <label>Reviewed By</label>
            <input
              type="text"
              name="reviewedBy"
              value={testResults.reviewedBy}
              onChange={handleResultsChange}
              placeholder="Pathologist/Supervisor Name"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => setActiveTab('worklist')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">Submit Results</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="laboratory-module">
      <header className="lab-header">
        <h1>🔬 Laboratory Management System</h1>
        <p>Test requests, sample collection, and results management</p>
      </header>

      <nav className="lab-tabs">
        <button
          className={`lab-tab ${activeTab === 'worklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('worklist')}
        >
          📋 Worklist
        </button>
        <button
          className={`lab-tab ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          ➕ New Request
        </button>
        <button
          className={`lab-tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          📊 Results Entry
        </button>
      </nav>

      <main className="lab-content">
        {activeTab === 'worklist' && renderWorklist()}
        {activeTab === 'request' && renderTestRequest()}
        {activeTab === 'results' && renderTestResults()}
      </main>
    </div>
  );
};

export default Laboratory;
