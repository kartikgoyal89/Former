import React, { useState, useEffect } from "react";
import { useItems } from "../../context/itemContext.jsx";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./image.css";

const Image = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
  uploadedImage,
}) => {
  const { items } = useItems();
  const [img, setImg] = useState("./picture.svg");

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

  useEffect(() => {
    console.log(uploadedImage);
  }, [uploadedImage]);

  return (
    <div
      className={`hover-outline image-container short-text-container long-text-container ${
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
        {elementStyle.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <div
        className={`img-container ${
          uploadedImage === null ? "bg-visible" : "bg-white"
        }`}
      >
        <img
          src={uploadedImage || "./picture.svg"}
          className={`${
            uploadedImage === null ? "default-img" : "uploaded-img"
          }`}
          alt=""
          style={{
            width: `${
              uploadedImage === null ? "150px" : `${style?.imgSize}px`
            }`,
          }}
        />
      </div>
      <DeleteButton />
    </div>
  );
};

export default Image;
