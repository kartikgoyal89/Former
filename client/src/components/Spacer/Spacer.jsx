import React from "react";
import { useLocation } from "react-router-dom";
import "./spacer.css";

const Spacer = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
}) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];
  const handleShortTextClick = () => {
    onClick(id);
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } short-text-container spacer-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleShortTextClick}
      style={{ cursor: "pointer", height: `${style?.height}px` }}
    >
      {!style?.hr ? (
        <p className="mb-0">Spacer element</p>
      ) : (
        <hr
          className="hr_"
          style={{
            height: `${style?.seperatorHeight}px`,
            backgroundColor: `${style?.seperatorColor}`,
          }}
        />
      )}
    </div>
  );
};

export default Spacer;
