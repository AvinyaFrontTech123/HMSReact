import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { FaSearch } from "react-icons/fa";
import ModalSearch from "../UserGroupMaster/ModalSearch";
import "./UserMaster.css";

const AssignedGroupsTable = ({ assignedGroups, setAssignedGroups }) => {
  const handleCellChange = (index, field, value) => {
    const updated = [...assignedGroups];
    updated[index][field] = value;
    setAssignedGroups(updated);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Organization</th>
          <th>Facility</th>
          <th>Assigned User Groups</th>
        </tr>
      </thead>
      <tbody>
        {assignedGroups.map((row, index) => (
          <tr key={index}>
            <td>{row.sno}</td>
            <td>
              <input
                className="tableInput"
                value={row.organization}
                onChange={(e) => handleCellChange(index, "organization", e.target.value)}
              />
            </td>
            <td>
              <input
                className="tableInput"
                value={row.facility}
                onChange={(e) => handleCellChange(index, "facility", e.target.value)}
              />
            </td>
            <td>
              <input
                className="tableInput"
                value={row.assignedGroup}
                onChange={(e) => handleCellChange(index, "assignedGroup", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UserMaster = ({ embedded = false }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    empCode: "",
    empOrganization: "",
    empPrimaryLocation: "",
    empProfileType: "",
    empDepartment: "",
    userName: "",
    password: "",
    confirmPassword: "",
    organizationSelect: "",
    facilityInput: "",
    userGroupInput: "",
  });

  const [assignedGroups, setAssignedGroups] = useState([
    { sno: 1, organization: "Apollo", facility: "Chennai", assignedGroup: "Group A" },
    { sno: 2, organization: "Global Hospitals", facility: "Bangalore", assignedGroup: "Group B" },
    { sno: 3, organization: "Fortis", facility: "Hyderabad", assignedGroup: "Group C" },
  ]);

  const orgOptions = ["Apollo", "Global Hospitals", "Fortis", "MIOT"];
  const facilityOptions = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"];

  // sample employee data for lookup
  const employeeData = [
    {
      display: "Rahul Kumar",
      userName: "Rahul",
      empName: "Rahul Kumar",
      empCode: "EMP001",
      department: "Cardiology",
      profileType: "Doctor",
      empOrganization: "Apollo",
      empPrimaryLocation: "Chennai",
    },
    {
      display: "Priya Sharma",
      userName: "Priya",
      empName: "Priya Sharma",
      empCode: "EMP002",
      department: "Nursing",
      profileType: "Nurse",
      empOrganization: "Global Hospitals",
      empPrimaryLocation: "Bangalore",
    },
    {
      display: "Arjun Mehta",
      userName: "Arjun",
      empName: "Arjun Mehta",
      empCode: "EMP003",
      department: "Pharmacy",
      profileType: "Pharmacist",
      empOrganization: "Fortis",
      empPrimaryLocation: "Hyderabad",
    },
  ];

  const [openEmpModal, setOpenEmpModal] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Saved!");
  };

  const handleClear = () => {
    setFormData({
      employeeName: "",
      empCode: "",
      empOrganization: "",
      empPrimaryLocation: "",
      empProfileType: "",
      empDepartment: "",
      userName: "",
      password: "",
      confirmPassword: "",
      organizationSelect: "",
      facilityInput: "",
      userGroupInput: "",
    });
  };

  const handleSelectEmployee = (item) => {
    setFormData({
      ...formData,
      employeeName: item.display || item.empName || item.userName,
      empCode: item.empCode || "",
      empOrganization: item.empOrganization || "",
      empPrimaryLocation: item.empPrimaryLocation || "",
      empProfileType: item.profileType || "",
      empDepartment: item.department || "",
      userName: item.userName || formData.userName,
    });
  };

  return (
    <>
      {!embedded && <Navbar />}
      <div className="formContainer">
        <div className="header">User Master</div>

      <form onSubmit={handleSave}>
        {/* Employee section */}
        <div className="section">
          <div className="formRow">
            <label className="label">
              Employee Name*
              <div className="inputWithIcon">
                <input
                  type="text"
                  className="input"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="inputIconBtn"
                  aria-label="Search Employee"
                  onClick={() => setOpenEmpModal(true)}
                >
                  <FaSearch className="inputIcon" />
                </button>
              </div>
            </label>

            <label className="label">
              Emp Code
              <input
                type="text"
                className="input"
                name="empCode"
                value={formData.empCode}
                readOnly
              />
            </label>
          </div>

          <div className="formRow">
            <label className="label">
              Emp Organization
              <input
                type="text"
                className="input"
                name="empOrganization"
                value={formData.empOrganization}
                readOnly
              />
            </label>

            <label className="label">
              Emp Primary Location
              <input
                type="text"
                className="input"
                name="empPrimaryLocation"
                value={formData.empPrimaryLocation}
                readOnly
              />
            </label>

            <label className="label">
              Emp Profile Type
              <input
                type="text"
                className="input"
                name="empProfileType"
                value={formData.empProfileType}
                readOnly
              />
            </label>

            <label className="label">
              Emp Department
              <input
                type="text"
                className="input"
                name="empDepartment"
                value={formData.empDepartment}
                readOnly
              />
            </label>
          </div>

          <div className="formRow">
            <label className="label">
              User Name*
              <input
                type="text"
                className="input"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Password*
              <input
                type="password"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Confirm Password*
              <input
                type="password"
                className="input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            <button type="button" className="utilityBtn">Default</button>
            <button type="button" className="utilityBtn">Reset</button>
            <button type="button" className="utilityBtn">Hx</button>
          </div>
        </div>

        <hr />

        {/* Facility Section */}
        <div className="facilitySection">
          <div className="sectionHeader">Facility Assignment</div>

          <div className="formRow">
            <label className="label">
              Organization
              <select
                className="select"
                name="organizationSelect"
                value={formData.organizationSelect}
                onChange={handleChange}
              >
                <option>Select...</option>
                {orgOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="label">
              Facility
              <select
                className="select"
                name="facilityInput"
                value={formData.facilityInput}
                onChange={handleChange}
              >
                <option>Select...</option>
                {facilityOptions.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </label>

            <button type="button" className="utilityBtn">+</button>
            <button type="button" className="utilityBtn">Hx</button>

            <label className="label">
              User Group
              <input
                type="text"
                className="input"
                name="userGroupInput"
                value={formData.userGroupInput}
                onChange={handleChange}
              />
            </label>

            <button type="button" className="utilityBtn">+</button>
          </div>

          <AssignedGroupsTable
            assignedGroups={assignedGroups}
            setAssignedGroups={setAssignedGroups}
          />
        </div>

        <div className="formFooter">
          <span className="userStatus">User Status: Active</span>
          <button type="submit" className="saveBtn">SAVE</button>
          <button type="button" className="clearBtn" onClick={handleClear}>CLEAR</button>
        </div>
      </form>

          {/* EMPLOYEE SEARCH MODAL */}
          <ModalSearch
            open={openEmpModal}
            onClose={() => setOpenEmpModal(false)}
            data={employeeData}
            onSelect={(item) => {
              handleSelectEmployee(item);
              setOpenEmpModal(false);
            }}
          />
      </div>
    </>
  );
};

export default UserMaster;
