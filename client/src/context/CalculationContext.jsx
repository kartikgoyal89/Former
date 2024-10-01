import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const CalculationContext = createContext();

// Create a provider component
export const CalculationProvider = ({ children }) => {
  const [calculationResult, setCalculationResult] = useState(() => {
    try {
      const savedResult = localStorage.getItem("calculationResult");
      return savedResult !== null ? JSON.parse(savedResult) : "";
    } catch (error) {
      console.error(
        "Error parsing calculationResult from localStorage:",
        error
      );
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "calculationResult",
        JSON.stringify(calculationResult)
      );
    } catch (error) {
      console.error("Error setting calculationResult in localStorage:", error);
    }
  }, [calculationResult]);

  return (
    <CalculationContext.Provider
      value={{ calculationResult, setCalculationResult }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

// Custom hook to use the calculation context
export const useCalculation = () => useContext(CalculationContext);
