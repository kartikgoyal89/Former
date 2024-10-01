import React, { useEffect } from "react";
import { useItems } from "../../context/itemContext.jsx";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

import "./number.css";

const Number = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
}) => {
  const { items } = useItems();
  const location = useLocation();
  let formId = location.pathname.split("/")[1];
  const handleShortTextClick = () => {
    onClick(id);
  };
  const defaultShortTextStyle = {
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000",
    textAlign: "left",
    text: "Add a short Paragraph",
    fieldLabel: "Short Text",
    placeholderText: "Type your answer here...",
    toggle: false,
  };
  useEffect(() => {
    items.forEach((item) => {
      if (item?.type === "short-text" && !item.style) {
        item.style = { ...defaultShortTextStyle };
      }
    });
  }, []);
  const elementStyle = { ...defaultShortTextStyle, ...style };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } short-text-container number-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleShortTextClick}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Number"}
        {elementStyle.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <input
        type="number"
        className="w-100"
        placeholder={
          style?.placeholderText !== undefined
            ? style?.placeholderText
            : "Enter your Value"
        }
        readOnly={formId.length === 0 ? true : false}
        min={style?.minChar}
        max={style?.maxChar}
        required={style?.required}
      />
      <DeleteButton />
    </div>
  );
};

export default Number;
