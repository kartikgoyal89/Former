import React, { useState, useEffect } from "react";
import { useItems } from "../../context/itemContext.jsx";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useLocation } from "react-router-dom";

import "./shortText.css";

const ShortText = ({
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
  const { items } = useItems();
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
    defaultVal: "Default Value",
  };

  const elementStyle = { ...defaultShortTextStyle, ...style };

  useEffect(() => {
    items.forEach((item) => {
      if (item?.type === "short-text" && !item.style) {
        item.style = { ...defaultShortTextStyle };
      }
    });
  }, []);

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleShortTextClick}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Short Text"}
        {elementStyle.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <input
        type="text"
        className="w-100"
        placeholder={
          style?.placeholderText !== undefined
            ? style?.placeholderText
            : "Type your answer here..."
        }
        readOnly={formId.length === 0 ? true : false}
        required={style?.required}
      />
      <DeleteButton />
    </div>
  );
};

export default ShortText;
