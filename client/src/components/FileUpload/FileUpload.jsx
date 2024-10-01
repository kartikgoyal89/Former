import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./fileUpload.css";

const FileUpload = ({ id, onBlur, onFocus, style, isSelected, onClick }) => {
  const location = useLocation();
  const [size, setSize] = useState(style?.maxSize || 1); // Initialize size with a default value

  let formId = location.pathname.split("/")[1];

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  // Effect to update size when style.maxSize changes
  useEffect(() => {
    if (style?.maxSize) {
      setSize(style.maxSize);
    }
  }, [style?.maxSize]); // Include style?.maxSize in dependencies array

  const maxFileSize = size * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: style?.multiple,
    maxSize: maxFileSize, // Pass maxFileSize to dropzone options
  });

  const handleTurnstile = () => {
    onClick(id);
  };

  return (
    <div
      className={`short-text-container ${
        formId.length === 0 ? "hover-outline" : ""
      } 
      ${isSelected && formId.length === 0 ? "active" : ""}
      file-upload-container`}
      onClick={() => onClick(id)}
    >
      <h5 className="mb-3">
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "File Upload"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h5>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drop your file here (or){" "}
            <span className="choose-file">Choose File</span>
          </p>
        )}
      </div>
      <DeleteButton />
    </div>
  );
};

export default FileUpload;
