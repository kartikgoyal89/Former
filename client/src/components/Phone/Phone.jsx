import React, { useState, useEffect } from "react";
import { useItems } from "../../context/itemContext.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone.css";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

const Phone = ({
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
  const [value, setValue] = useState();
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const defaultShortTextStyle = {
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000",
    textAlign: "left",
    text: "Add a short Paragraph",
    fieldLabel: "Short Text",
    placeholderText: "example@example.com",
    toggle: false,
  };

  const elementStyle = { ...defaultShortTextStyle, ...style };

  useEffect(() => {
    items.forEach((item) => {
      if (item?.type === "short-text" && !item.style) {
        item.style = { ...defaultShortTextStyle };
      }
    });
  }, []);
  const handleShortTextClick = () => {
    onClick(id);
  };
  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } phone-container`}
      onClick={handleShortTextClick}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Phone"}
        {elementStyle.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <PhoneInput
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: true,
          placeholder: "091234 56789",
        }}
      />
      <DeleteButton />
    </div>
  );
};

export default Phone;
