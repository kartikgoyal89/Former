import React, { useState, useEffect } from "react";
import "./input.css";
import { useLocation } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useItems } from "../../context/itemContext.jsx";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

const Input = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  inputText,
  onClick,
}) => {
  const { items } = useItems();
  const location = useLocation();
  let formId = location.pathname.split("/")[1];
  const handleInputClick = () => {
    onClick(id);
  };
  const defaultInputStyle = {
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000",
    textAlign: "left",
    inputText: "Add a short Paragraph",
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item?.type === "text" && !item.style) {
        item.style = { ...defaultInputStyle };
      }
    });
  }, []);

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } input-form-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleInputClick}
    >
      <input
        type="text"
        style={{
          fontSize: `${style?.fontSize !== undefined ? style?.fontSize : 18}px`,
          fontWeight: `${style?.bold ? "600" : "400"}`,
          fontStyle: `${style?.italic ? "italic" : "normal"}`,
          color: `${style?.color}`,
          cursor: "pointer",
        }}
        value={
          style?.input === undefined ? "Add a short Paragraph" : style?.input
        }
      />
      <DeleteButton id={id} />
    </div>
  );
};

export default Input;
