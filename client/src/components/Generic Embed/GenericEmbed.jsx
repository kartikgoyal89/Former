import React, { useState, useEffect } from "react";
import "./generic.css";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

const GenericEmbed = ({ id, style, isSelected, onClick }) => {
  const [isValidUrl, setIsValidUrl] = useState(true); // State to manage URL validity

  const handleShortTextClick = () => {
    onClick(id);
  };

  useEffect(() => {
    // Validate URL format when component mounts or style.upload changes
    setIsValidUrl(validateUrlFormat(style?.upload));
  }, [style?.upload]);

  const validateUrlFormat = (url) => {
    try {
      new URL(url); // Try to create a new URL object
      return true; // If successful, URL is valid
    } catch (error) {
      return false; // If error, URL is invalid
    }
  };

  const handleAudioError = () => {
    setIsValidUrl(false); // Set state to indicate URL is not valid or resource doesn't exist
  };

  return (
    <div
      className={`hover-outline audio-container short-text-container long-text-container ${
        isSelected ? "active" : ""
      }`}
      onClick={handleShortTextClick}
      style={{ cursor: "pointer" }}
    >
      <h6
        className={` ${style?.required ? "required" : ""} ${
          style?.fieldLabel !== undefined ? "mb-3" : ""
        }`}
      >
        {style?.fieldLabel !== undefined ? style?.fieldLabel : ""}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <div>
        {style?.upload !== "" && style?.upload !== undefined ? (
          <p className="mb-0">{style?.upload}</p>
        ) : (
          <div
            className="video-img generic-img"
            style={{
              height:
                style?.videoHeight !== undefined
                  ? `${style?.videoHeight}px`
                  : "250px",
            }}
          >
            <img className="img" src="./generic.png" alt="" />
          </div>
        )}
      </div>
      <DeleteButton />
    </div>
  );
};

export default GenericEmbed;
