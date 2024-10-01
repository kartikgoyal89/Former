import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./modal.css";

const Modal = ({ title, onSave, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="mb-4">{title}</h4>
          <RxCross2 className="fs-2 mb-4 cursor-pointer" onClick={onClose} />
        </div>
        <input
          type="text"
          defaultValue={
            localStorage.getItem("filename") !== undefined
              ? localStorage.getItem("filename")
              : inputValue
          }
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter name"
        />
        <div className="modal-buttons">
          <button className="btn_" onClick={handleSave}>
            Save
          </button>
          <button className="btn_" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
