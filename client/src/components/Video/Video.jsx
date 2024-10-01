import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./video.css";

const Video = ({ id, style, isSelected, onClick, uploadedImage }) => {
  const [isValidUrl, setIsValidUrl] = useState(true); // State to manage URL validity

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

  const handlePlayerError = () => {
    setIsValidUrl(false);
  };

  return (
    <div
      className={`hover-outline video-container short-text-container long-text-container ${
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
        {isValidUrl ? (
          <ReactPlayer
            url={style?.upload}
            controls
            width="100%"
            height={
              style?.videoHeight !== undefined
                ? `${style?.videoHeight}px`
                : "300px"
            }
            onError={handlePlayerError}
          />
        ) : (
          <div
            className="video-img"
            style={{
              height:
                style?.videoHeight !== undefined
                  ? `${style?.videoHeight}px`
                  : "300px",
            }}
          >
            <img className="img" src="./video.png" alt="" />
          </div>
        )}
      </div>
      <DeleteButton />
    </div>
  );
};

export default Video;
