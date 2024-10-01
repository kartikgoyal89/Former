import React, { useState } from "react";
import { useItems } from "../../context/itemContext";
import "./publishModal.css";

const PublishModal = ({ onClose, publishUrl }) => {
  const { items } = useItems();
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(publishUrl)
      .then(() => {
        setCopyButtonText("Copied!");
        setTimeout(() => {
          setCopyButtonText("Copy");
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="publish-modal">
      <div className="publish-modal-content">
        <button className="close fs-2 me-2" onClick={onClose}>
          &times;
        </button>
        <h3>Publish Form</h3>
        <div className="form-accessible-toggle">
          <span>Form accessible to users</span>
          <input
            className="publish-checkbox"
            type="checkbox"
            defaultChecked={true}
          />
        </div>
        <div className="form-link-section">
          <div className="form-link-header mb-2">
            Share your form link to start getting submissions.
          </div>
          <input
            type="text mt-5"
            style={{ height: "45px" }}
            value={publishUrl}
            readOnly
          />
          <div className="copy">
            <button className="mt-3 copy-button" onClick={handleCopy}>
              {copyButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
