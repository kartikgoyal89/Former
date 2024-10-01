import React, { useState, useEffect } from "react";
import { usePictureChoice } from "../../context/PictureChoiceContext";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useLocation } from "react-router-dom";

import "./pictureChoice.css";

const PictureChoice = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
  imagesPerRow = 4,
}) => {
  const { pictureChoiceOptions } = usePictureChoice();
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  useEffect(() => {
    if (pictureChoiceOptions && pictureChoiceOptions.length > 0) {
      setSelectedOption(pictureChoiceOptions[0].id);
    }
  }, [pictureChoiceOptions]);

  const handleOptionChange = (id) => {
    setSelectedOption(id);
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } picture-choice-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={() => onClick(id)}
      style={{ cursor: "pointer" }}
    >
      <h5 className={`mb-4 el-heading ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Picture Choice"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h5>
      <div
        className="picture-options"
        style={{
          gridTemplateColumns: `repeat(${
            style?.Columns !== undefined ? style?.Columns : imagesPerRow
          }, 1fr)`,
        }}
      >
        {pictureChoiceOptions.map((option) => (
          <div
            key={option.id}
            className={`picture-option ${
              selectedOption === option.id ? "selected" : ""
            }`}
            style={
              style?.Style === "standard" || style?.Style === undefined
                ? { border: "1px solid #e1e1e1" }
                : { border: "none" }
            }
            onClick={() => handleOptionChange(option.id)}
          >
            <div
              className={`pic-div pic-div-${
                style?.Columns !== undefined ? style?.Columns : imagesPerRow
              }`}
              style={{
                backgroundColor:
                  option.defaultImg !== "/public/picture.svg" ? "#fff" : "#eff",
              }}
            >
              <img
                src={option.defaultImg}
                alt={option.defaultLabel}
                style={{
                  height:
                    option.defaultImg !== "/public/picture.svg"
                      ? "100%"
                      : "30px",
                  width:
                    option.defaultImg !== "/public/picture.svg"
                      ? "100%"
                      : "30px",
                  objectFit: "contain",
                  opacity:
                    option.defaultImg !== "/public/picture.svg" ? "1" : "0.4",
                }}
              />
            </div>
            <div className="choice d-flex align-items-center mt-1 gap-1">
              <input
                type="radio"
                id={`option-${option.id}`}
                className="radio-button picture-radio single-choice-button mb-0"
                checked={selectedOption === option.id}
                disabled={selectedOption !== option.id}
                onChange={() => handleOptionChange(option.id)}
              />
              <label className="picture-label" htmlFor={`option-${option.id}`}>
                {option.defaultLabel}
              </label>
            </div>
          </div>
        ))}
      </div>
      <DeleteButton />
    </div>
  );
};

export default PictureChoice;
