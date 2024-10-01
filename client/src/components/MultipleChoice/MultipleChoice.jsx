import React, { useState, useEffect } from "react";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useMultipleChoice } from "../../context/MultipleChoiceContext";
import { useLocation } from "react-router-dom";
import "./multipleChoice.css";

const MultipleChoice = ({
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
  const formId = location.pathname.split("/")[1];
  const { multipleChoiceOptions } = useMultipleChoice();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (multipleChoiceOptions && multipleChoiceOptions.length > 0) {
      setSelectedOption(multipleChoiceOptions[0].id);
    }
  }, [multipleChoiceOptions]);

  const handleOptionChange = (id) => {
    setSelectedOption(id);
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } single-choice-container short-text-container  ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={() => onClick(id)}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined
          ? style?.fieldLabel
          : "Multiple Choice"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <ul className="single-choice-list">
        {multipleChoiceOptions.map((option) => (
          <li key={option.id} className="single-choice-item">
            <div
              className="single-choice-div"
              style={
                style?.Style === "standard" || style?.Style === undefined
                  ? {
                      border: "1px solid #e1e1e1",
                      padding: "10px",
                      gap: "10px",
                      height: "50px",
                    }
                  : {
                      border: "none",
                      padding: "10px",
                      gap: "0px",
                      height: "30px",
                    }
              }
            >
              <input
                type="checkbox"
                name={`single-choice-${id}`}
                className="single-choice-input"
                value={option.id}
                disabled={formId.length === 0 ? true : false}
                onChange={() => handleOptionChange(option.id)}
              />
              <label className="single-choice-label">
                {option.defaultLabel}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <DeleteButton />
    </div>
  );
};

export default MultipleChoice;
