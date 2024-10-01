import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDropdown } from "../../context/dropdownContext";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./dropdown.css";

const Dropdown = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
  selectedChoice,
}) => {
  const { dropdownOptions } = useDropdown();
  const [selectedOption, setSelectedOption] = useState(null);

  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  useEffect(() => {
    if (dropdownOptions && dropdownOptions.length > 0) {
      setSelectedOption(dropdownOptions[0].id);
    }
  }, [dropdownOptions]);

  const handleOptionChange = (id) => {
    setSelectedOption(id);
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } dropdown-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={() => onClick(id)}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Dropdown"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <select className="dropdown-select">
        {dropdownOptions?.map((option) => (
          <option key={option.id} className="dropdown-option">
            {option.defaultLabel}
          </option>
        ))}
      </select>
      <DeleteButton />
    </div>
  );
};

export default Dropdown;
