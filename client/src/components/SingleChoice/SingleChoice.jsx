import React, { useState, useEffect } from "react";
import { useSingleChoice } from "../../context/singleChoiceContext";
import { useLocation } from "react-router-dom";
import "./singleChoice.css";

const SingleChoice = ({
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
  const location = useLocation();
  let formId = location.pathname.split("/")[1];
  const { singleChoiceOptions } = useSingleChoice();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (singleChoiceOptions && singleChoiceOptions.length > 0) {
      setSelectedOption(singleChoiceOptions[0].id);
    }
  }, [singleChoiceOptions]);

  const handleOptionChange = (id) => {
    setSelectedOption(id);
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } single-choice-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={() => onClick(id)}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Single Choice"}
      </h6>
      <ul className="single-choice-list">
        {singleChoiceOptions.map((option) => (
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
                type="radio"
                name={`single-choice-${id}`}
                className="single-choice-input"
                value={option.id}
                // checked={
                //   formId.length === 0 && selectedChoice === option.defaultLabel
                // }
                onChange={() => handleOptionChange(option.id)}
              />
              <label className="single-choice-label">
                {option.defaultLabel}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleChoice;
