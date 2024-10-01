import React, { useState, useEffect } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { MdOutlinePublish } from "react-icons/md";
import Modal from "../Modal/Modal"; // Create this Modal component
import PublishModal from "../PublishModal/PublishModal";
import { useItems } from "../../context/itemContext";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { items } = useItems();
  const [components, setComponents] = useState([]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isFileNameModalOpen, setIsFileNameModalOpen] = useState(false);
  const [filename, setFilename] = useState("Untitled Form");
  const [publishUrl, setPublishUrl] = useState("");

  useEffect(() => {
    const savedFilename = localStorage.getItem("filename");
    if (savedFilename) {
      setFilename(savedFilename);
    }
  }, []);

  const handleSaveClick = () => {
    setIsFileNameModalOpen(true);
  };

  const handleSaveFileName = (fileName) => {
    const newFileName = fileName || `Untitled_${Date.now()}`;
    setFilename(newFileName);
    localStorage.setItem("filename", newFileName);
    setIsFileNameModalOpen(false);
  };

  const handlePublishClick = () => {
    handlePublish(filename);
  };

  const handlePublish = async (formName) => {
    const formId = `${formName || "Untitled"}_${Date.now()}`;
    const formJson = {
      id: formId,
      name: formName,
      components: JSON.parse(localStorage.getItem("items")), // Assuming items are stored in localStorage
    };

    try {
      await axios.post("http://localhost:5000/save-form", {
        fileName: formId,
        formContent: formJson,
      });
      const generatedUrl = `http://localhost:5173/${formId}`;
      setPublishUrl(generatedUrl);
      setIsPublishModalOpen(true);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };
  const handlePreviewClick = () => {
    navigate(`/${fileName}/preview`);
  };

  return (
    <div className="header-container">
      <div className="upper">
        <div className="left">
          <div className="logo">
            <img src="./logo.png" alt="FORMER_LOGO" />
          </div>
          <h6>FORMER</h6>
          <button
            className="edit-btn mb-2"
            style={{ opacity: 0.6 }}
            onClick={() => setIsFileNameModalOpen(true)}
          >
            {filename}
            <FiEdit2 className="ms-2 mb-1" />
          </button>
        </div>
        <div className="right">
          <div className="new-btn">New Form</div>
          <div className="avatar">
            <img src="./avatar.png" alt="avatar" />
          </div>
        </div>
      </div>
      <div className="lower">
        <button className="btn_" onClick={handleSaveClick}>
          <FiSave className="me-1 icon" />
          Save
        </button>
        <button className="btn_" onClick={handlePreviewClick}>
          <MdOutlineRemoveRedEye className="me-1 icon" />
          Preview
        </button>
        <button className="btn_" onClick={handlePublishClick}>
          <MdOutlinePublish className="me-1 icon" />
          Publish
        </button>
      </div>

      {isFileNameModalOpen && (
        <Modal
          title="Edit Form Name"
          onSave={handleSaveFileName}
          onClose={() => setIsFileNameModalOpen(false)}
        />
      )}

      {isPublishModalOpen && (
        <PublishModal
          onClose={() => setIsPublishModalOpen(false)}
          publishUrl={publishUrl}
        />
      )}
    </div>
  );
};

export default Header;
