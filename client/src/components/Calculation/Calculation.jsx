import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCalculation } from "../../context/CalculationContext";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./calculation.css";

const Calculation = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  onClick,
  calculation,
}) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];
  const handleCalculationClick = () => {
    onClick(id);
  };

  const { calculationResult, setCalculationResult } = useCalculation();

  useEffect(() => {
    try {
      const result = eval(calculation);
      if (!isNaN(result)) {
        setCalculationResult(result);
      }
    } catch (error) {
      setCalculationResult("");
    }
  }, [calculation, setCalculationResult]);

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } calculation-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleCalculationClick}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Calculation"}
      </h6>
      <input
        type="text"
        className="w-100 ps-2"
        placeholder={
          style?.placeholderText !== undefined
            ? style?.placeholderText
            : "Build your formula through the settings."
        }
        value={formId.length !== 0 ? calculationResult : calculation}
        readOnly
        required={style?.required}
      />
      <DeleteButton />
    </div>
  );
};

export default Calculation;
