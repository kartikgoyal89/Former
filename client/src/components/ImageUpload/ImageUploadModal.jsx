// ImageUploadModal.jsx
import React from "react";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";

const ImageUploadModal = ({ isOpen, onClose, onImageUpload }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Image Upload">
      <div className="modal-content">
        <h2>Media Gallery</h2>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag and drop an image here, or click to select one</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
