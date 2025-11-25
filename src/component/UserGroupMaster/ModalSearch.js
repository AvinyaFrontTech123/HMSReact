import React from "react";
import "./ModalSearch.css";

export default function ModalSearch({ open, onClose, data, onSelect }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Select an Item</h3>

        <div className="modal-list">
          {data.map((item, index) => (
            <div
              key={index}
              className="modal-item"
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              {item.display}
            </div>
          ))}
        </div>

        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
