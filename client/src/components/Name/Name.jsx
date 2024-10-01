import React, { useState, useEffect } from "react";
import { useItems } from "../../context/itemContext.jsx";
import { useLocation } from "react-router-dom";
import { useVisibleOptions } from "../../context/VisibleOptionsContext";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import nameProperties from "../../config/nameProperties.json";
import "./name.css";

const Name = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  firstNameInput,
  lastNameInput,
  firstPlaceholder,
  lastPlaceholder,
  onClick,
  VisibleOptions,
}) => {
  const [visibleElements, setVisibleElements] = useState({
    firstName: true,
    middleName: false,
    lastName: true,
  });

  const { visibleNameOptions, setVisibleNameOptions } = useVisibleOptions();

  const { items } = useItems();

  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const handleShortTextClick = () => {
    onClick(id);
  };

  useEffect(() => {
    const updatedVisibleElements = {
      ...visibleElements,
    };
    VisibleOptions.forEach((opt) => {
      if (updatedVisibleElements.hasOwnProperty(opt.value)) {
        updatedVisibleElements[opt.value] = opt.checked;
      }
    });
    setVisibleElements(updatedVisibleElements);
  }, [VisibleOptions]);

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } short-text-container name-input-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleShortTextClick}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Name"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <div className="name-container">
        <div
          className={`name ${
            visibleNameOptions[0].checked === false ? "hidden" : ""
          }`}
        >
          <p>
            {style?.firstNameInput !== undefined
              ? style?.firstNameInput
              : "First Name"}
            {style?.required && <span style={{ color: "red" }}> *</span>}
          </p>
          <input
            type="text"
            readOnly={formId.length === 0 ? true : false}
            required={style?.required}
            placeholder={
              style?.firstPlaceholder !== undefined
                ? style?.firstPlaceholder
                : "First Name"
            }
          />
        </div>
        <div
          className={`name ${
            visibleNameOptions[1].checked === false ? "hidden" : ""
          }`}
        >
          <p>
            {style?.middleNameInput !== undefined
              ? style?.lastNameInput
              : "Middle Name"}
            {style?.required && <span style={{ color: "red" }}> *</span>}
          </p>
          <input
            type="text"
            readOnly={formId.length === 0 ? true : false}
            required={style?.required}
            placeholder={
              style?.middlePlaceholder !== undefined
                ? style?.middlePlaceholder
                : "Middle Name"
            }
          />
        </div>
        <div
          className={`name ${
            visibleNameOptions[2].checked === false ? "hidden" : ""
          }`}
        >
          <p>
            {style?.lastNameInput !== undefined
              ? style?.lastNameInput
              : "Last Name"}
            {style?.required && <span style={{ color: "red" }}> *</span>}
          </p>
          <input
            type="text"
            readOnly={formId.length === 0 ? true : false}
            required={style?.required}
            placeholder={
              style?.lastPlaceholder !== undefined
                ? style?.lastPlaceholder
                : "Last Name"
            }
          />
        </div>
      </div>
      <DeleteButton />
    </div>
  );
};

export default Name;
