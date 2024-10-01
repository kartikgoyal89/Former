import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useItems } from "../../context/itemContext.jsx";
import "./heading.css";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

const Heading = ({ id, style, headingText, onClick, isSelected }) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];
  const { items, setItems } = useItems();

  const defaultHeadingStyle = {
    fontSize: "25px",
    textAlign: "left",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000",
    headingText: "Form Header",
  };

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.type === "form-header" && !item.style
          ? { ...item, style: defaultHeadingStyle }
          : item
      )
    );
  }, []);

  const handleHeadingClick = () => {
    onClick(id);
  };

  return (
    <div
      className={` ${
        formId.length === 0 ? "hover-outline" : ""
      } header-form-container position-relative ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleHeadingClick}
    >
      <h1
        style={{
          fontSize: `${style?.fontSize !== undefined ? style?.fontSize : 35}px`,
          paddingTop: `${
            style?.paddingTop !== undefined ? style?.paddingTop : 0
          }px`,
          paddingBottom: `${
            style?.paddingBottom !== undefined ? style?.paddingBottom : 0
          }px`,
          paddingLeft: `${
            style?.paddingLeft !== undefined ? style?.paddingLeft : 0
          }px`,
          paddingRight: `${
            style?.paddingRight !== undefined ? style?.paddingRight : 0
          }px`,
          color: `${style?.color}`,
          fontWeight: `${style?.bold ? "600" : "400"}`,
          fontStyle: `${style?.italic ? "italic" : "normal"}`,
          cursor: "pointer",
        }}
      >
        {style?.headingInput === undefined
          ? "Form Header"
          : style?.headingInput}
      </h1>
      <DeleteButton id={id} />
    </div>
  );
};

export default Heading;
