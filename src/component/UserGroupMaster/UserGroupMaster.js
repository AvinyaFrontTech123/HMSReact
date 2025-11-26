import React, { useState } from "react";
import "./UserGroupMaster.css";
import { FaSearch, FaPlus } from "react-icons/fa";

import ToggleSwitch from "./ToggleSwitch";
import ModalSearch from "./ModalSearch";

export default function UserGroupMaster() {
  // -------------------------
  // BLOCK / UNBLOCK STATE
  // -------------------------
  const [status, setStatus] = useState("Active");
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");

  // -------------------------
  // ROLE ASSIGNMENT TABLE (sample data)
  // -------------------------
  const [roleRows, setRoleRows] = useState([
    { id: 1, role: 'Administrator', organization: 'Apollo', facility: 'Chennai', activeFrom: '2025-01-01', status: true },
    { id: 2, role: 'Doctor Access', organization: 'Global Hospitals', facility: 'Bangalore', activeFrom: '2024-12-15', status: true },
    { id: 3, role: 'Pharmacy Role', organization: 'Fortis', facility: 'Hyderabad', activeFrom: '2023-08-10', status: false },
  ]);

  // -------------------------
  // ASSIGN USERS TABLE (sample data)
  // -------------------------
  const [userRows, setUserRows] = useState([
    { id: 1, userName: 'Rahul', empName: 'Rahul Kumar', empCode: 'EMP001', department: 'Cardiology', profileType: 'Doctor', status: true },
    { id: 2, userName: 'Priya', empName: 'Priya Sharma', empCode: 'EMP002', department: 'Nursing', profileType: 'Nurse', status: true },
  ]);

  // -------------------------
  // MODAL STATE
  // -------------------------
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  // Dummy role data for modal
  const roleData = [
    { display: "Administrator" },
    { display: "Doctor Access" },
    { display: "Nurse Access" },
    { display: "Pharmacy Role" },
  ];

  // Dummy user data for modal
  const userData = [
    {
      display: "Rahul Kumar",
      userName: "Rahul",
      empName: "Rahul Kumar",
      empCode: "EMP001",
      department: "Cardiology",
      profileType: "Doctor",
    },
    {
      display: "Priya Sharma",
      userName: "Priya",
      empName: "Priya Sharma",
      empCode: "EMP002",
      department: "Nursing",
      profileType: "Nurse",
    },
  ];

  // Add empty row to role table
  const addRoleRow = () => {
    setRoleRows([
      ...roleRows,
      {
        id: roleRows.length + 1,
        role: "",
        organization: "",
        facility: "",
        activeFrom: "",
        status: false,
      },
    ]);
  };

  // Add empty row to user table
  const addUserRow = () => {
    setUserRows([
      ...userRows,
      {
        id: userRows.length + 1,
        userName: "",
        empName: "",
        empCode: "",
        department: "",
        profileType: "",
        status: false,
      },
    ]);
  };

  // ------------------------------
  // SELECT ROLE FROM MODAL
  // ------------------------------
  const handleSelectRole = (item) => {
    const updated = [...roleRows];
    updated[updated.length - 1].role = item.display;
    setRoleRows(updated);
  };

  // ------------------------------
  // SELECT USER FROM MODAL
  // ------------------------------
  const handleSelectUser = (item) => {
    const updated = [...userRows];
    updated[updated.length - 1].userName = item.userName;
    updated[updated.length - 1].empName = item.empName;
    updated[updated.length - 1].empCode = item.empCode;
    updated[updated.length - 1].department = item.department;
    updated[updated.length - 1].profileType = item.profileType;
    setUserRows(updated);
  };

  // ------------------------------
  // BLOCK / UNBLOCK LOGIC
  // ------------------------------
  const handleBlock = () => {
    if (!newStatus) {
      alert("Please select New Status before blocking.");
      return;
    }
    setStatus(newStatus);
    alert("Status updated successfully!");
  };

  return (
    <div className="ug-container">

      {/* PAGE TITLE */}
      <h2 className="ug-title">User Group Master</h2>

      {/* BLOCK UNBLOCK SECTION */}
      <div className="section-header">User Group Details</div>

      <div className="ug-grid-4">
        <div>
          <label className="ug-label">User Group Name *</label>
          <input type="text" className="ug-input" defaultValue="General Staff" />
        </div>

        <div>
          <label className="ug-label">Current Status</label>
          <div
            className="status-text"
            style={{ color: status === "Active" ? "green" : "red" }}
          >
            {status}
          </div>
        </div>

        <div>
          <label className="ug-label">New Status</label>
          <select
            className="ug-input"
            onChange={(e) => setNewStatus(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            <option>Block</option>
            <option>Unblock</option>
          </select>
        </div>

        <div>
          <label className="ug-label">Emp Code</label>
          <input type="text" className="ug-input" defaultValue="UG001" />
        </div>
      </div>

      <div className="ug-grid-2">
        <div>
          <label className="ug-label">Reason *</label>
          <input
            type="text"
            className="ug-input"
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="block-buttons">
          <button className="block-btn" onClick={handleBlock}>
            BLOCK
          </button>
          <button className="unblock-btn" onClick={handleBlock}>
            UNBLOCK
          </button>
        </div>
      </div>

      {/* ROLE ASSIGNMENT SECTION */}
      <div className="section-header">Role Assignments</div>

      <div className="search-row">
        <label className="ug-label">Search Role</label>
        <div className="search-box">
          <input type="text" className="ug-input" readOnly />
          <FaSearch
            className="search-icon"
            onClick={() => {
              addRoleRow();
              setOpenRoleModal(true);
            }}
          />
        </div>
      </div>

      {/* ROLE TABLE */}
      <table className="ug-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Role Description</th>
            <th>Organization</th>
            <th>Facility</th>
            <th>Active From</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {roleRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.role}</td>
              <td>{row.organization}</td>
              <td>{row.facility}</td>
              <td>{row.activeFrom}</td>
              <td>
                <ToggleSwitch
                  value={row.status}
                  onChange={(val) => {
                    const updated = [...roleRows];
                    updated[row.id - 1].status = val;
                    setRoleRows(updated);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ASSIGN USERS SECTION */}
      <div className="section-header">Assign Users</div>

      <div className="search-row">
        <label className="ug-label">Search User Name</label>
        <div className="search-box">
          <input type="text" className="ug-input" readOnly />
          <FaSearch
            className="search-icon"
            onClick={() => {
              addUserRow();
              setOpenUserModal(true);
            }}
          />
        </div>
      </div>

      {/* USERS TABLE */}
      <table className="ug-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>Employee Name</th>
            <th>Emp Code</th>
            <th>Department</th>
            <th>Profile Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {userRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.userName}</td>
              <td>{row.empName}</td>
              <td>{row.empCode}</td>
              <td>{row.department}</td>
              <td>{row.profileType}</td>
              <td>
                <ToggleSwitch
                  value={row.status}
                  onChange={(val) => {
                    const updated = [...userRows];
                    updated[row.id - 1].status = val;
                    setUserRows(updated);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FINAL BUTTONS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 30 }}>
        <button
          className="save-btn"
          onClick={() => alert('User Group saved (sample)')}
        >
          SAVE
        </button>
        <button
          className="cancel-btn"
          onClick={() => {
            // reset to sample state
            setRoleRows([
              { id: 1, role: 'Administrator', organization: 'Apollo', facility: 'Chennai', activeFrom: '2025-01-01', status: true },
              { id: 2, role: 'Doctor Access', organization: 'Global Hospitals', facility: 'Bangalore', activeFrom: '2024-12-15', status: true },
              { id: 3, role: 'Pharmacy Role', organization: 'Fortis', facility: 'Hyderabad', activeFrom: '2023-08-10', status: false },
            ]);
            setUserRows([
              { id: 1, userName: 'Rahul', empName: 'Rahul Kumar', empCode: 'EMP001', department: 'Cardiology', profileType: 'Doctor', status: true },
              { id: 2, userName: 'Priya', empName: 'Priya Sharma', empCode: 'EMP002', department: 'Nursing', profileType: 'Nurse', status: true },
            ]);
          }}
        >
          CLEAR
        </button>
      </div>

      {/* ROLE MODAL */}
      <ModalSearch
        open={openRoleModal}
        onClose={() => setOpenRoleModal(false)}
        data={roleData}
        onSelect={handleSelectRole}
      />

      {/* USER MODAL */}
      <ModalSearch
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        data={userData}
        onSelect={handleSelectUser}
      />
    </div>
  );
}