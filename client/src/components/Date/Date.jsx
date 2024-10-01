import React, { useState, useEffect } from "react";
import { useItems } from "../../context/itemContext.jsx";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

import "./date.css";

const Date = ({
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
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Date"}
        {elementStyle.required && <span style={{ color: "red" }}> *</span>}
      </h6>

      <input
        placeholder={
          style?.placeholderText !== undefined
            ? style?.placeholderText
            : "Pick a Date"
        }
        class="textbox-n"
        type={formId.length === 0 ? "text" : "date"}
        onfocus="(this.type='date')"
        onblur="(this.type='text')"
        readOnly={formId.length === 0 ? true : false}
        value={style?.DefaultDate}
        min={style?.StartDate}
        max={style?.EndDate}
        required={style?.required}
        id="date"
      />
      <DeleteButton />
    </div>
  );
};

export default Date;
