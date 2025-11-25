import React from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function ToggleSwitch({ value, onChange }) {
  return (
    <div
      style={{ cursor: "pointer", fontSize: "28px" }}
      onClick={() => onChange(!value)}
    >
      {value ? (
        <FaToggleOn color="#28a745" />
      ) : (
        <FaToggleOff color="#6c757d" />
      )}
    </div>
  );
}
