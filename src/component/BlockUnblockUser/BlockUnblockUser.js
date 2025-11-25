import React, { useState } from "react";
import "./BlockUnblockUser.css";
import { FaSearch } from "react-icons/fa";

export default function BlockUnblockUser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("Active");
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");
  const [statusHistory, setStatusHistory] = useState([]);

  // Dummy user data
  const dummyUsers = [
    {
      id: 1,
      userName: "Rahul Kumar",
      empName: "Rahul Kumar",
      empCode: "EMP001",
      department: "Cardiology",
      profileType: "Doctor",
      status: "Active",
    },
    {
      id: 2,
      userName: "Priya Sharma",
      empName: "Priya Sharma",
      empCode: "EMP002",
      department: "Nursing",
      profileType: "Nurse",
      status: "Active",
    },
    {
      id: 3,
      userName: "Amit Verma",
      empName: "Amit Verma",
      empCode: "EMP003",
      department: "Pharmacy",
      profileType: "Pharmacist",
      status: "Blocked",
    },
  ];

  // Search user
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredUsers = dummyUsers.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery) ||
    user.empCode.toLowerCase().includes(searchQuery)
  );

  // Select user from search results
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setCurrentStatus(user.status);
    setNewStatus("");
    setReason("");
    setSearchQuery("");
  };

  // Block/Unblock user
  const handleBlockUnblock = () => {
    if (!newStatus) {
      alert("Please select a new status");
      return;
    }
    if (!reason.trim()) {
      alert("Please enter a reason");
      return;
    }

    const historyEntry = {
      id: statusHistory.length + 1,
      status: newStatus,
      reason: reason,
      comments: "",
      dateTime: new Date().toLocaleString(),
      doneBy: "Admin",
    };

    setStatusHistory([historyEntry, ...statusHistory]);
    setCurrentStatus(newStatus);
    setNewStatus("");
    setReason("");
    alert(`User ${newStatus.toLowerCase()} successfully!`);
  };

  return (
    <div className="block-unblock-container">
      <h2 className="bub-title">Block / Unblock User</h2>

      {/* Search Section */}
      <div className="bub-section">
        <div className="bub-search-row">
          <label className="bub-label">Search User Name / Emp Code</label>
          <div className="bub-search-box">
            <input
              type="text"
              className="bub-input"
              placeholder="Enter user name or employee code..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="bub-search-icon" />

            {/* Search Results Dropdown */}
            {searchQuery && filteredUsers.length > 0 && (
              <div className="bub-search-results">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bub-search-result-item"
                    onClick={() => handleSelectUser(user)}
                  >
                    <strong>{user.userName}</strong> - {user.empCode}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected User Details */}
      {selectedUser && (
        <>
          <div className="bub-section">
            <h3 className="bub-section-title">User Details</h3>
            <div className="bub-grid-2">
              <div>
                <label className="bub-label">User Name</label>
                <input
                  type="text"
                  className="bub-input-disabled"
                  value={selectedUser.userName}
                  disabled
                />
              </div>
              <div>
                <label className="bub-label">Employee Code</label>
                <input
                  type="text"
                  className="bub-input-disabled"
                  value={selectedUser.empCode}
                  disabled
                />
              </div>
              <div>
                <label className="bub-label">Employee Name</label>
                <input
                  type="text"
                  className="bub-input-disabled"
                  value={selectedUser.empName}
                  disabled
                />
              </div>
              <div>
                <label className="bub-label">Department</label>
                <input
                  type="text"
                  className="bub-input-disabled"
                  value={selectedUser.department}
                  disabled
                />
              </div>
              <div>
                <label className="bub-label">Profile Type</label>
                <input
                  type="text"
                  className="bub-input-disabled"
                  value={selectedUser.profileType}
                  disabled
                />
              </div>
              <div>
                <label className="bub-label">Current Status</label>
                <div
                  className="bub-status-display"
                  style={{
                    color: currentStatus === "Active" ? "#28a745" : "#dc3545",
                  }}
                >
                  {currentStatus}
                </div>
              </div>
            </div>
          </div>

          {/* Block/Unblock Section */}
          <div className="bub-section">
            <h3 className="bub-section-title">Change Status</h3>
            <div className="bub-grid-2">
              <div>
                <label className="bub-label">New Status *</label>
                <select
                  className="bub-input"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Block">Block</option>
                  <option value="Unblock">Unblock</option>
                </select>
              </div>
              <div>
                <label className="bub-label">Reason *</label>
                <input
                  type="text"
                  className="bub-input"
                  placeholder="Enter reason for change"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bub-button-row">
              <button className="bub-block-btn" onClick={handleBlockUnblock}>
                APPLY
              </button>
              <button
                className="bub-cancel-btn"
                onClick={() => {
                  setSelectedUser(null);
                  setNewStatus("");
                  setReason("");
                }}
              >
                CLEAR
              </button>
            </div>
          </div>

          {/* Status History */}
          <div className="bub-section">
            <h3 className="bub-section-title">Status History</h3>
            {statusHistory.length > 0 ? (
              <table className="bub-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th>Comments</th>
                    <th>Date Time</th>
                    <th>Done By</th>
                  </tr>
                </thead>
                <tbody>
                  {statusHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.id}</td>
                      <td>
                        <span
                          style={{
                            color:
                              entry.status === "Block" ? "#dc3545" : "#28a745",
                            fontWeight: "bold",
                          }}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td>{entry.reason}</td>
                      <td>{entry.comments}</td>
                      <td>{entry.dateTime}</td>
                      <td>{entry.doneBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="bub-no-data">No status history available</p>
            )}
          </div>
        </>
      )}

      {!selectedUser && !searchQuery && (
        <div className="bub-placeholder">
          <p>Search for a user to block/unblock them</p>
        </div>
      )}
    </div>
  );
}
