import React, { useState } from "react";
import "../../styles/LocationMaster.css";
import Navbar from "../Navbar/Navbar";

export default function LocationMasterForm() {
  const initialState = {
    locationCode: "",
    locationMasterDescription: "",
    licenceNo: "",
    website: "",
    pinCode: "",
    address: "",
    street: "",
    cityTown: "",
    mandal: "",
    district: "",
    state: "",
    contact: "",
    organization: "",
    logo: null
  };

  const [form, setForm] = useState(initialState);
  const [previewLogo, setPreviewLogo] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, logo: file });
    if (file) setPreviewLogo(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Saved Successfully!");
    setForm(initialState);
    setPreviewLogo(null);
  };

  return (
    <>
      <Navbar />

      <div className="loc-page">
        <div className="loc-card">

          <div className="loc-title">Location Master</div>

          {/* SECTION TITLE */}
          <div className="loc-section-title">Location Details</div>

          {/* LOGO ROW - SAME AS ORG MASTER */}
          <div className="logo-row">
            <label className="loc-label logo-label">
              Location Logo <span className="required">*</span>
            </label>

            <div className="logo-right">
              <div className="logo-box">
                {previewLogo ? (
                  <img src={previewLogo} alt="Logo" className="logo-img" />
                ) : (
                  "Upload Logo"
                )}
              </div>

              <input 
                type="file" 
                className="logo-upload" 
                onChange={handleLogoChange}
              />
            </div>
          </div>

          {/* GRID 3 - FIRST ROW */}
          <div className="loc-grid-3">
            <div>
              <label className="loc-label">Location Code <span className="required">*</span></label>
              <input className="loc-input" name="locationCode" value={form.locationCode} onChange={handleChange} />
            </div>

            <div>
              <label className="loc-label">Licence No <span className="required">*</span></label>
              <input className="loc-input" name="licenceNo" value={form.licenceNo} onChange={handleChange} />
            </div>

            <div>
              <label className="loc-label">Website</label>
              <input className="loc-input" name="website" value={form.website} onChange={handleChange} />
            </div>
          </div>

          {/* DESCRIPTION FULL WIDTH */}
          <div>
            <label className="loc-label">Location Description <span className="required">*</span></label>
            <textarea
              className="loc-textarea"
              name="locationMasterDescription"
              value={form.locationMasterDescription}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* ADDRESS SECTION */}
          <div className="loc-section-title">Address Details</div>

          <div className="loc-grid-3">
            <div>
              <label className="loc-label">Pin Code <span className="required">*</span></label>
              <input className="loc-input" name="pinCode" value={form.pinCode} onChange={handleChange} />
            </div>

            <div>
              <label className="loc-label">Street <span className="required">*</span></label>
              <input className="loc-input" name="street" value={form.street} onChange={handleChange} />
            </div>

            <div>
              <label className="loc-label">Address <span className="required">*</span></label>
              <input className="loc-input" name="address" value={form.address} onChange={handleChange} />
            </div>

            <div>
              <label className="loc-label">City / Town <span className="required">*</span></label>
              <select className="loc-input" name="cityTown" value={form.cityTown} onChange={handleChange}>
                <option value="">Select City</option>
                <option>Secunderabad</option>
                <option>Madhapur</option>
                <option>Gachibowli</option>
                <option>Jubilee Hills</option>
              </select>
            </div>

            <div>
              <label className="loc-label">Mandal <span className="required">*</span></label>
              <select className="loc-input" name="mandal" value={form.mandal} onChange={handleChange}>
                <option value="">Select Mandal</option>
                <option>Quthbullapur</option>
                <option>Kukatpally</option>
                <option>Balanagar</option>
                <option>Gajularamaram</option>
              </select>
            </div>

            <div>
              <label className="loc-label">District <span className="required">*</span></label>
              <select className="loc-input" name="district" value={form.district} onChange={handleChange}>
                <option value="">Select District</option>
                <option>Medchal</option>
                <option>Pulivendhula</option>
                <option>Coimbatore</option>
              </select>
            </div>

            
            <div>
              <label className="loc-label">State <span className="required">*</span></label>
              <select className="loc-input" name="state" value={form.state} onChange={handleChange}>
                <option value="">Select State</option>
                <option>Telangana</option>
                <option>Andhra Pradesh</option>
                <option>Tamil Nadu</option>
              </select>
            </div>

            <div>
              <label className="loc-label">Contact <span className="required">*</span></label>
              <input className="loc-input" name="contact" value={form.contact} onChange={handleChange} />
            </div>
          </div>

        
          <div>
            <label className="loc-label">Organization <span className="required">*</span></label>
            <select className="loc-input" name="organization" value={form.organization} onChange={handleChange}>
              <option value="">Select Organization</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="button-row">
            <button className="save-btn" onClick={handleSave}>SAVE</button>
            <button className="cancel-btn" onClick={() => setForm(initialState)}>CANCEL</button>
          </div>

        </div>
      </div>
    </>
  );
}
