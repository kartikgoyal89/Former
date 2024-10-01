import React, { useState, useEffect } from "react";
import { useItems } from "../../context/itemContext.jsx";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./scaleRating.css";

const ScaleRating = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
  start = 0,
  end = 10,
}) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const [value, setValue] = useState(null);
  const { items } = useItems();
  const lowestRating =
    typeof style?.lowestRating === "number" ? style.lowestRating : start;
  const highestRating =
    typeof style?.highestRating === "number" ? style.highestRating : end;

  const defaultScaleStyle = {
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000",
    textAlign: "left",
    text: "Rate your experience",
    fieldLabel: "Scale Rating",
    placeholderText: "Select your rating",
    toggle: false,
    defaultVal: "Default Value",
  };

  const elementStyle = { ...defaultScaleStyle, ...style };

  useEffect(() => {
    {
      formId.length === 0 && setValue(style?.defaultVal);
    }
  });

  const handleShortTextClick = () => {
    onClick(id);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item?.type === "scale-rating" && !item.style) {
        item.style = { ...defaultScaleStyle };
      }
    });
  }, [items]);

  const range = Array.from(
    { length: highestRating - lowestRating + 1 },
    (_, i) => lowestRating + i
  );

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } rating-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      style={{ cursor: "pointer" }}
      onClick={handleShortTextClick}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {elementStyle.fieldLabel}
        {elementStyle.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <div className="scale-rating">
        {range.map((val, index) => (
          <div key={index} className="rating-button-container">
            <button
              type="button"
              className={`rating-button ${value === val ? "selected" : ""}`}
              onClick={() => setValue(val)}
            >
              {val}
            </button>
            {index === 0 && (
              <span className="lowest-rating-text">
                {style?.lowestRatingText !== undefined
                  ? style?.lowestRatingText
                  : "Worst"}
              </span>
            )}
            {index === range.length - 1 && (
              <span className="highest-rating-text">
                {style?.highestRatingText !== undefined
                  ? style?.highestRatingText
                  : "Best"}
              </span>
            )}
          </div>
        ))}
      </div>
      <DeleteButton />
    </div>
  );
};

export default ScaleRating;
