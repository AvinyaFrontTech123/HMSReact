import React, { useState } from "react";
import {
  FaUser,
  FaUpload,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
} from "react-icons/fa";

import "./EmployeeMaster.css";
import Navbar from "../Navbar/Navbar";

const EmployeeMaster = ({ embedded = false }) => {
  const [step, setStep] = useState(1);
  const [profilePic, setProfilePic] = useState(null);

  const [form, setForm] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    doj: "",
    email: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    category: "",
    organization: "",
    facility: "",
    empProfileType: "",
    licenseNo: "",
    department: "",
    designation: "",
    acknowledge: false,
  });

  const [errors, setErrors] = useState({});
  const [photoError, setPhotoError] = useState("");

  /* Validation */
  const validateField = (field, value) => {
    if (!value || value.trim() === "") {
      return "This field is required";
    }

    if (field === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value) ? "" : "Invalid email address";
    }

    if (field === "mobile") {
      const regex = /^[6-9]\d{9}$/;
      return regex.test(value) ? "" : "Enter valid 10-digit mobile number";
    }

    if (field === "aadhaar") {
      const regex = /^\d{12}$/;
      return regex.test(value) ? "" : "Aadhaar must be exactly 12 digits";
    }

    if (field === "pan") {
      const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
      return regex.test(value) ? "" : "Invalid PAN format (ABCDE1234F)";
    }

    return "";
  };

  const handleChange = (field, value) => {
    if (field === "pan") value = value.toUpperCase();
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    const error = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const requiredStep1 = ["title", "firstName", "lastName", "gender", "dob"];
  const requiredStep2 = ["email", "mobile", "aadhaar", "pan"];
  const requiredStep3 = ["category", "department", "designation"];

  const validateStep = (fields) => {
    let valid = true;
    let updated = {};

    fields.forEach((f) => {
      const e = validateField(f, form[f]);
      updated[f] = e;
      if (e) valid = false;
    });

    setErrors((prev) => ({ ...prev, ...updated }));
    return valid;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep(requiredStep1)) return;
    if (step === 2 && !validateStep(requiredStep2)) return;
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSave = () => {
    if (!validateStep(requiredStep3)) {
      setStep(3);
      return;
    }

    console.log("PAYLOAD:", form);
    alert("Saved Successfully!");
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Only JPG, JPEG, or PNG formats are allowed.");
      setProfilePic(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("File size must be less than 2 MB.");
      setProfilePic(null);
      return;
    }

    setPhotoError("");
    setProfilePic(URL.createObjectURL(file));
  };

  return (
    <>
      {!embedded && <Navbar />}
      <div className="emp-bg">
      <div className="emp-wrapper">
        <div className="emp-header-card">
          <div className="emp-header-left">
            <FaUser className="emp-header-icon" />
            <h1>Employee Master</h1>
          </div>
          <div className="emp-header-divider"></div>
        </div>

        <div className="emp-steps">
          <div className={`emp-step ${step === 1 ? "active" : ""}`}>1. Personal Info</div>
          <div className={`emp-step ${step === 2 ? "active" : ""}`}>2. Contact</div>
          <div className={`emp-step ${step === 3 ? "active" : ""}`}>3. Employment</div>
        </div>

        <div className="emp-card">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="emp-title">
                <FaUser className="emp-title-icon" /> Personal Information
              </h2>

              <div className="emp-profile-section">
                <div className="emp-profile-pic">
                  {profilePic ? <img src={profilePic} alt="Profile" /> : "Profile"}
                </div>

                <label className="emp-upload-btn">
                  <FaUpload /> Upload Photo
                  <input type="file" accept="image/*" onChange={handleProfileUpload} />
                </label>

                {photoError && <small className="error-text">{photoError}</small>}
              </div>

              <div className="emp-grid-4">
                {/* TITLE */}
                <div className="emp-field">
                  <label>
                    <b>Select Title</b> <span className="req">*</span>
                  </label>
                  <select
                    className={errors.title ? "emp-error" : ""}
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    onBlur={() => handleBlur("title")}
                  >
                    <option value="">Select</option>
                    <option>Mr</option>
                    <option>Ms</option>
                    <option>Mrs</option>
                    <option>Dr</option>
                  </select>
                  {errors.title && <small className="error-text">{errors.title}</small>}
                </div>

                {/* FIRST NAME */}
                <div className="emp-field">
                  <label>
                    <b>First Name</b> <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={errors.firstName ? "emp-error" : ""}
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    onBlur={() => handleBlur("firstName")}
                  />
                  {errors.firstName && <small className="error-text">{errors.firstName}</small>}
                </div>

                {/* MIDDLE NAME */}
                <div className="emp-field">
                  <label>
                    <b>Middle Name</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Middle Name"
                    value={form.middleName}
                    onChange={(e) => handleChange("middleName", e.target.value)}
                  />
                </div>

                {/* LAST NAME */}
                <div className="emp-field">
                  <label>
                    <b>Last Name</b> <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={errors.lastName ? "emp-error" : ""}
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    onBlur={() => handleBlur("lastName")}
                  />
                  {errors.lastName && <small className="error-text">{errors.lastName}</small>}
                </div>
              </div>

              {/* SECOND ROW */}
              <div className="emp-grid-4">
                {/* GENDER */}
                <div className="emp-field">
                  <label>
                    <b>Gender</b> <span className="req">*</span>
                  </label>
                  <select
                    className={errors.gender ? "emp-error" : ""}
                    value={form.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    onBlur={() => handleBlur("gender")}
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  {errors.gender && <small className="error-text">{errors.gender}</small>}
                </div>

                {/* DOB */}
                <div className="emp-field">
                  <label>
                    <b>Date of Birth</b> <span className="req">*</span>
                  </label>
                  <div className={`emp-input-icon ${errors.dob ? "emp-error" : ""}`}>
                    <FaCalendarAlt />
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => handleChange("dob", e.target.value)}
                      onBlur={() => handleBlur("dob")}
                    />
                  </div>
                  {errors.dob && <small className="error-text">{errors.dob}</small>}
                </div>

                {/* BLOOD GROUP */}
                <div className="emp-field">
                  <label>
                    <b>Blood Group</b>
                  </label>
                  <select
                    value={form.bloodGroup}
                    onChange={(e) => handleChange("bloodGroup", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>A+</option><option>A-</option>
                    <option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option>
                    <option>AB+</option><option>AB-</option>
                  </select>
                </div>

                {/* DOJ */}
                <div className="emp-field">
                  <label>
                    <b>Date of Joining</b>
                  </label>
                  <div className="emp-input-icon">
                    <FaCalendarAlt />
                    <input
                      type="date"
                      value={form.doj}
                      onChange={(e) => handleChange("doj", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="emp-btn-row">
                <button className="emp-btn next" onClick={nextStep}>
                  <b>Next</b> →
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h2 className="emp-title">
                <FaPhoneAlt className="emp-title-icon" /> Contact Details
              </h2>

              <div className="emp-grid-4">
                {/* EMAIL */}
                <div className="emp-field">
                  <label>
                    <b>Email ID</b> <span className="req">*</span>
                  </label>
                  <div className={`emp-input-icon ${errors.email ? "emp-error" : ""}`}>
                    <FaEnvelope />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                    />
                  </div>
                  {errors.email && <small className="error-text">{errors.email}</small>}
                </div>

                {/* MOBILE */}
                <div className="emp-field">
                  <label>
                    <b>Primary Contact No</b> <span className="req">*</span>
                  </label>
                  <div className={`emp-input-icon ${errors.mobile ? "emp-error" : ""}`}>
                    <FaPhoneAlt />
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={form.mobile}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                      onBlur={() => handleBlur("mobile")}
                    />
                  </div>
                  {errors.mobile && <small className="error-text">{errors.mobile}</small>}
                </div>

                {/* AADHAAR */}
                <div className="emp-field">
                  <label>
                    <b>Aadhaar No</b> <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Aadhaar Number"
                    className={errors.aadhaar ? "emp-error" : ""}
                    value={form.aadhaar}
                    onChange={(e) => handleChange("aadhaar", e.target.value)}
                    onBlur={() => handleBlur("aadhaar")}
                  />
                  {errors.aadhaar && <small className="error-text">{errors.aadhaar}</small>}
                </div>

                {/* PAN */}
                <div className="emp-field">
                  <label>
                    <b>PAN Number</b> <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="PAN Number"
                    className={errors.pan ? "emp-error" : ""}
                    value={form.pan}
                    onChange={(e) => handleChange("pan", e.target.value)}
                    onBlur={() => handleBlur("pan")}
                  />
                  {errors.pan && <small className="error-text">{errors.pan}</small>}
                </div>
              </div>

              <div className="emp-btn-row">
                <button className="emp-btn prev" onClick={prevStep}>
                  ← Previous
                </button>
                <button className="emp-btn next" onClick={nextStep}>
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h2 className="emp-title">
                <FaBuilding className="emp-title-icon" /> Employment Details
              </h2>

              <div className="emp-grid-4">
                {/* CATEGORY */}
                <div className="emp-field">
                  <label>
                    <b>Employee Category</b> <span className="req">*</span>
                  </label>
                  <select
                    className={errors.category ? "emp-error" : ""}
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    onBlur={() => handleBlur("category")}
                  >
                    <option value="">Select</option>
                    <option>Permanent</option>
                    <option>Contract</option>
                    <option>Trainee</option>
                  </select>
                  {errors.category && <small className="error-text">{errors.category}</small>}
                </div>

                {/* ORG */}
                <div className="emp-field">
                  <label>
                    <b>Organization</b>
                  </label>
                  <select
                    value={form.organization}
                    onChange={(e) => handleChange("organization", e.target.value)}
                  >
                    <option value="">Select Organization</option>
                    <option>Hospital A</option>
                    <option>Hospital B</option>
                  </select>
                </div>

                {/* FACILITY */}
                <div className="emp-field">
                  <label>
                    <b>Facility</b>
                  </label>
                  <select
                    value={form.facility}
                    onChange={(e) => handleChange("facility", e.target.value)}
                  >
                    <option value="">Select Facility</option>
                    <option>Main Branch</option>
                    <option>Clinic</option>
                  </select>
                </div>

                {/* LICENSE */}
                <div className="emp-field">
                  <label>
                    <b>HP-ID / License No</b>
                  </label>
                  <div className="emp-input-icon">
                    <FaIdBadge />
                    <input
                      type="text"
                      placeholder="HP-ID / License"
                      value={form.licenseNo}
                      onChange={(e) => handleChange("licenseNo", e.target.value)}
                    />
                  </div>
                </div>

                {/* DEPARTMENT */}
                <div className="emp-field">
                  <label>
                    <b>Department</b> <span className="req">*</span>
                  </label>
                  <select
                    className={errors.department ? "emp-error" : ""}
                    value={form.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    onBlur={() => handleBlur("department")}
                  >
                    <option value="">Department</option>
                    <option>Admin</option>
                    <option>Nursing</option>
                    <option>Lab</option>
                    <option>Radiology</option>
                  </select>
                  {errors.department && <small className="error-text">{errors.department}</small>}
                </div>

                {/* DESIGNATION */}
                <div className="emp-field">
                  <label>
                    <b>Designation</b> <span className="req">*</span>
                  </label>
                  <select
                    className={errors.designation ? "emp-error" : ""}
                    value={form.designation}
                    onChange={(e) => handleChange("designation", e.target.value)}
                    onBlur={() => handleBlur("designation")}
                  >
                    <option value="">Designation</option>
                    <option>Manager</option>
                    <option>Technician</option>
                    <option>Operator</option>
                    <option>Assistant</option>
                  </select>
                  {errors.designation && (
                    <small className="error-text">{errors.designation}</small>
                  )}
                </div>
              </div>

              <label className="emp-upload-btn" style={{ marginTop: "18px" }}>
                <FaUpload /> Upload e-Signature
                <input type="file" />
              </label>

              <p className="emp-ack-text">
                <b>“I certify that the uploaded e-Signature is genuine and provided with my consent.”</b>
              </p>

              <div className="emp-ack-box">
                <input
                  type="checkbox"
                  checked={form.acknowledge}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, acknowledge: e.target.checked }))
                  }
                />
                <label>I agree to the above acknowledgement.</label>
              </div>

              {errors.acknowledge && (
                <small className="error-text">{errors.acknowledge}</small>
              )}

              <div className="emp-btn-row">
                <button className="emp-btn prev" onClick={prevStep}>
                  ← Previous
                </button>
                <button
                  className="emp-btn save"
                  onClick={() => {
                    if (!form.acknowledge) {
                      setErrors((e) => ({
                        ...e,
                        acknowledge: "You must agree before saving.",
                      }));
                      return;
                    }
                    handleSave();
                  }}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default EmployeeMaster;
