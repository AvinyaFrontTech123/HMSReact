import React, { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import Navbar from "../Navbar/Navbar";
import "../../styles/OrganizationMaster.css";

export default function OrganizationMaster() {

  const initialState = {
    organizationCode: "",
    organizationName: "",
    organizationTypeId: "",
    stateId: "",
    districtId: "",
    cityId: "",
    buildingNo: "",
    pincode: "",
    street: "",
    phone: "",
    website: "",
    createdBy: 1
  };

  const [form, setForm] = useState(initialState);
  const [logo, setLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  const [types, setTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [errors, setErrors] = useState({});

  /* --------------------- LOAD DROPDOWNS --------------------- */
  useEffect(() => {
    api.get("/api/master/organization-types").then(res => setTypes(res.data));
    api.get("/api/master/states").then(res => setStates(res.data));
  }, []);

  useEffect(() => {
    if (form.stateId) {
      api.get(`/api/master/districts/${form.stateId}`).then(res => setDistricts(res.data));
    } else {
      setDistricts([]);
      setForm(prev => ({ ...prev, districtId: "", cityId: "" }));
    }
  }, [form.stateId]);

  useEffect(() => {
    if (form.districtId) {
      api.get(`/api/master/cities/${form.districtId}`).then(res => setCities(res.data));
    } else {
      setCities([]);
      setForm(prev => ({ ...prev, cityId: "" }));
    }
  }, [form.districtId]);

  /* --------------------- INPUT CHANGE --------------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* --------------------- LOGO UPLOAD --------------------- */
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  /* --------------------- VALIDATION --------------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!form.organizationCode.trim()) newErrors.organizationCode = "Organization Code is required";
    if (!form.organizationName.trim()) newErrors.organizationName = "Organization Name is required";
    if (!form.organizationTypeId) newErrors.organizationTypeId = "Select organization type";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!form.buildingNo.trim()) newErrors.buildingNo = "Building number required";
    if (!form.street.trim()) newErrors.street = "Street is required";
    if (!form.cityId) newErrors.cityId = "Select city";
    if (!form.districtId) newErrors.districtId = "Select district";
    if (!form.stateId) newErrors.stateId = "Select state";
    if (!form.phone.trim()) newErrors.phone = "Contact number required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* --------------------- SUBMIT FORM --------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (logo) fd.append("organizationLogo", logo);

    try {
      const res = await api.post("/api/organization/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Organization Created Successfully!");

      // RESET FORM
      setForm(initialState);
      setLogo(null);
      setPreviewLogo(null);

    } catch (err) {
      console.error(err);
      alert("Error creating organization!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="org-page">
        <div className="org-card">

          <div className="org-title">Organization Master / Service Entity</div>

          {/* ------------ Section: Organization Details ------------ */}
          <div className="org-section-title">Organization Details</div>

          {/* ------------ LOGO FIRST (SIDE-BY-SIDE) ------------ */}
          <div className="logo-row">
            <label className="org-label logo-label">
              Organization Logo <span className="required">*</span>
            </label>

            <div className="logo-right">

              <div className="logo-box">
                {previewLogo ? (
                  <img src={previewLogo} className="logo-img" alt="Logo" />
                ) : (
                  "Upload Logo"
                )}
              </div>

              <input 
                type="file" 
                onChange={handleLogoChange} 
                className="logo-upload" 
              />

            </div>
          </div>

          {/* ------------ DETAILS GRID ------------ */}
          <div className="org-grid-3">

            <div>
              <label className="org-label">
                Organization Code <span className="required">*</span>
              </label>
              <input 
                name="organizationCode" 
                className="org-input" 
                value={form.organizationCode}
                onChange={handleChange}
              />
              {errors.organizationCode && <p className="error-text">{errors.organizationCode}</p>}
            </div>

            <div>
              <label className="org-label">
                Organization Name <span className="required">*</span>
              </label>
              <input 
                name="organizationName" 
                className="org-input"
                value={form.organizationName}
                onChange={handleChange}
              />
              {errors.organizationName && <p className="error-text">{errors.organizationName}</p>}
            </div>

            <div>
              <label className="org-label">
                Organization Type <span className="required">*</span>
              </label>
              <select 
                name="organizationTypeId" 
                className="org-input"
                value={form.organizationTypeId}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                {types.map(t => (
                  <option key={t.organizationTypeId} value={t.organizationTypeId}>
                    {t.organizationTypeName}
                  </option>
                ))}
              </select>
              {errors.organizationTypeId && <p className="error-text">{errors.organizationTypeId}</p>}
            </div>

          </div>

          {/* ------------ Address Section ------------ */}
          <div className="org-section-title">Address Details</div>

          <div className="org-grid-3">

            <div>
              <label className="org-label">Pincode <span className="required">*</span></label>
              <input 
                name="pincode" 
                className="org-input" 
                value={form.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <p className="error-text">{errors.pincode}</p>}
            </div>

            <div>
              <label className="org-label">Building No <span className="required">*</span></label>
              <input 
                name="buildingNo" 
                className="org-input" 
                value={form.buildingNo}
                onChange={handleChange}
              />
              {errors.buildingNo && <p className="error-text">{errors.buildingNo}</p>}
            </div>

            <div>
              <label className="org-label">Street <span className="required">*</span></label>
              <input 
                name="street" 
                className="org-input"
                value={form.street}
                onChange={handleChange}
              />
              {errors.street && <p className="error-text">{errors.street}</p>}
            </div>

            <div>
              <label className="org-label">City <span className="required">*</span></label>
              <select 
                name="cityId" 
                className="org-input"
                value={form.cityId}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cities.map(c => (
                  <option key={c.cityId} value={c.cityId}>{c.cityName}</option>
                ))}
              </select>
              {errors.cityId && <p className="error-text">{errors.cityId}</p>}
            </div>

            <div>
              <label className="org-label">District <span className="required">*</span></label>
              <select 
                name="districtId" 
                className="org-input"
                value={form.districtId}
                onChange={handleChange}
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d.districtId} value={d.districtId}>{d.districtName}</option>
                ))}
              </select>
              {errors.districtId && <p className="error-text">{errors.districtId}</p>}
            </div>

            <div>
              <label className="org-label">State <span className="required">*</span></label>
              <select 
                name="stateId" 
                className="org-input"
                value={form.stateId}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {states.map(s => (
                  <option key={s.stateId} value={s.stateId}>{s.stateName}</option>
                ))}
              </select>
              {errors.stateId && <p className="error-text">{errors.stateId}</p>}
            </div>

          </div>

          {/* ------------ Website / Contact ------------ */}
          <div className="org-grid-2">

            <div>
              <label className="org-label">Website</label>
              <input 
                name="website" 
                className="org-input"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="org-label">Contact <span className="required">*</span></label>
              <input 
                name="phone" 
                className="org-input"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

          </div>

          {/* ------------ Buttons ------------ */}
          <div className="button-row">
            <button className="save-btn" onClick={handleSubmit}>SAVE</button>
            <button className="cancel-btn" type="button" onClick={() => setForm(initialState)}>CANCEL</button>
          </div>

        </div>
      </div>
    </>
  );
}
