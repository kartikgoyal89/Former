import React, { createContext, useState, useEffect, useContext } from "react";

const SingleChoiceContext = createContext();

export const SingleChoiceProvider = ({ children }) => {
  const [singleChoiceOptions, setSingleChoiceOptions] = useState(() => {
    const savedOptions = localStorage.getItem("singleChoiceOptions");
    return savedOptions
      ? JSON.parse(savedOptions)
      : [
          { id: 1, defaultLabel: "Yes", rank: 1 },
          { id: 2, defaultLabel: "No", rank: 2 },
          { id: 3, defaultLabel: "Maybe", rank: 3 },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "singleChoiceOptions",
      JSON.stringify(singleChoiceOptions)
    );
  }, [singleChoiceOptions]);

  const addOption = (label) => {
    const newOption = {
      id: singleChoiceOptions.length + 1,
      defaultLabel: label,
      rank: singleChoiceOptions.length + 1,
    };
    setSingleChoiceOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const updateOptions = (newOptions) => {
    setSingleChoiceOptions(newOptions);
  };

  return (
    <SingleChoiceContext.Provider
      value={{
        singleChoiceOptions,
        addOption,
        updateOptions,
      }}
    >
      {children}
    </SingleChoiceContext.Provider>
  );
};

export const useSingleChoice = () => useContext(SingleChoiceContext);
