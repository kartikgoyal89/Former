import React, { createContext, useState, useContext, useEffect } from "react";

const MultipleChoiceContext = createContext();

export const MultipleChoiceProvider = ({ children }) => {
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState(() => {
    const savedOptions = localStorage.getItem("multipleChoiceOptions");
    return savedOptions
      ? JSON.parse(savedOptions)
      : [
          { id: 1, defaultLabel: "Option 1", rank: 1 },
          { id: 2, defaultLabel: "Option 2", rank: 2 },
          { id: 3, defaultLabel: "Option 3", rank: 3 },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "multipleChoiceOptions",
      JSON.stringify(multipleChoiceOptions)
    );
  }, [multipleChoiceOptions]);

  const addOption = (label) => {
    const newOption = {
      id: multipleChoiceOptions.length + 1,
      defaultLabel: label,
      rank: multipleChoiceOptions.length + 1,
    };
    setMultipleChoiceOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const updateOptions = (newOptions) => {
    setMultipleChoiceOptions(newOptions);
  };

  return (
    <MultipleChoiceContext.Provider
      value={{ multipleChoiceOptions, addOption, updateOptions }}
    >
      {children}
    </MultipleChoiceContext.Provider>
  );
};

export const useMultipleChoice = () => useContext(MultipleChoiceContext);
