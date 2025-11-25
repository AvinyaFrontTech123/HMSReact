import React, { useState } from "react";
import "../../styles/RoleMaster.css";
import Navbar from "../Navbar/Navbar";

export default function RoleMaster({ embedded }) {
  const [roleCode, setRoleCode] = useState("");
  const [roleDesc, setRoleDesc] = useState("");

  const [errors, setErrors] = useState({
    roleCode: "",
    roleDesc: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { roleCode: "", roleDesc: "" };
    let valid = true;

    if (!roleCode.trim()) {
      newErrors.roleCode = "Please enter Role Code";
      valid = false;
    }

    if (!roleDesc.trim()) {
      newErrors.roleDesc = "Please enter Role Description";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      alert("Role Created Successfully!");
    }
  };

  const handleCancel = () => {
    setRoleCode("");
    setRoleDesc("");
    setErrors({ roleCode: "", roleDesc: "" });
  };

  return (
    <div className="rm-page">
      {!embedded && <Navbar />}

      <div className="rm-wrapper">
        <div className="rm-card">
          <h2 className="rm-header">👥 Role Master</h2>

          <form className="rm-form" onSubmit={handleSubmit}>
            
            {/* Role Code */}
            <label>Role Code<span className="required"> *</span></label>
            <input
              type="text"
              value={roleCode}
              onChange={(e) => {
                setRoleCode(e.target.value);
                setErrors((prev) => ({ ...prev, roleCode: "" }));
              }}
              placeholder="Enter Role Code"
            />
            {errors.roleCode && (
              <p className="rm-error-text">{errors.roleCode}</p>
            )}

            {/* Role Description */}
            <label>Role Description<span className="required"> *</span></label>
            <textarea
              value={roleDesc}
              onChange={(e) => {
                setRoleDesc(e.target.value);
                setErrors((prev) => ({ ...prev, roleDesc: "" }));
              }}
              placeholder="Enter Role Description"
            ></textarea>
            {errors.roleDesc && (
              <p className="rm-error-text">{errors.roleDesc}</p>
            )}

            {/* Buttons */}
            <div className="rm-buttons">
              <button type="submit" className="rm-save-btn">
                Save
              </button>

              <button
                type="button"
                className="rm-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
