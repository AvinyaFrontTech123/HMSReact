import React, { useState } from "react";
import { FiUserCheck, FiHome, FiBriefcase, FiMapPin } from "react-icons/fi";
import "../../styles/ChangeLoginRole.css";
import Navbar from "../Navbar/Navbar";

export default function ChangeLoginRole({ embedded }) {
  const [organization, setOrganization] = useState("");
  const [facility, setFacility] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="clr-page">
      {!embedded && <Navbar />}

      <div className="clr-wrapper">
        <div className="clr-card">
          <header className="clr-header">
            <FiHome className="clr-header-icon" />
            <h2>Change Login Role / Location</h2>
          </header>

          <div className="clr-row">
            <div className="clr-input-group">
              <label>
                <FiBriefcase className="label-icon" /> Organization
              </label>
              <select
                className="clr-input"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                <option value="">Select Organization</option>
                <option>Organization 1</option>
                <option>Organization 2</option>
              </select>
            </div>

            <div className="clr-input-group">
              <label>
                <FiMapPin className="label-icon" /> Facility
              </label>
              <select
                className="clr-input"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              >
                <option value="">Select Facility</option>
                <option>Facility 1</option>
                <option>Facility 2</option>
              </select>
            </div>
          </div>

          <div className="clr-input-group">
            <label>
              <FiUserCheck className="label-icon" /> User Role
            </label>
            <select
              className="clr-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select User Role</option>
              <option>Admin</option>
              <option>Operator</option>
              <option>Viewer</option>
            </select>
          </div>

          <button
            className="clr-btn"
            disabled={!organization || !facility || !role}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
}
