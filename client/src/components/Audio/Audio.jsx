import React, { useState, useEffect } from "react";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./audio.css";

const Audio = ({ id, style, isSelected, onClick }) => {
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleShortTextClick = () => {
    onClick(id);
  };

  useEffect(() => {
    setIsValidUrl(validateUrlFormat(style?.upload));
  }, [style?.upload]);

  const validateUrlFormat = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAudioError = () => {
    setIsValidUrl(false);
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
        className={`audio-label ${style?.required ? "required" : ""} ${
          style?.fieldLabel !== undefined ? "mb-3" : ""
        }`}
      >
        {style?.fieldLabel !== undefined ? style?.fieldLabel : ""}
        {style?.required && <span className="required-star"> *</span>}
      </h6>
      <div className="audio-player-container">
        {isValidUrl ? (
          <audio
            className="audio"
            src={style?.upload}
            controls
            onError={handleAudioError}
          >
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div className="default-div">
            <img
              src="./audio.png"
              alt="Default"
              className="audio-default-img"
            />
          </div>
        )}
      </div>
      <DeleteButton />
    </div>
  );
};

export default Audio;
