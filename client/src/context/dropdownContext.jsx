// import React, { createContext, useState, useContext } from "react";

// const DropdownContext = createContext();

// export const DropdownProvider = ({ children }) => {
//   const [dropdownOptions, setDropdownOptions] = useState([
//     { id: 1, defaultLabel: "Yes", rank: 1 },
//     { id: 2, defaultLabel: "No", rank: 2 },
//     { id: 3, defaultLabel: "Maybe", rank: 3 },
//   ]);

//   const addOption = (label) => {
//     const newOption = {
//       id: dropdownOptions.length + 1,
//       defaultLabel: label,
//       rank: dropdownOptions.length + 1,
//     };
//     setDropdownOptions((prevOptions) => [...prevOptions, newOption]);
//   };

//   const updateOptions = (newOptions) => {
//     setDropdownOptions(newOptions);
//   };

//   return (
//     <DropdownContext.Provider
//       value={{ dropdownOptions, addOption, updateOptions }}
//     >
//       {children}
//     </DropdownContext.Provider>
//   );
// };

// export const useDropdown = () => useContext(DropdownContext);

/*
import React, { createContext, useState, useContext } from "react";

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [dropdownOptions, setDropdownOptions] = useState([
    { id: 1, defaultLabel: "Yes", rank: 1 },
    { id: 2, defaultLabel: "No", rank: 2 },
    { id: 3, defaultLabel: "Maybe", rank: 3 },
  ]);

  const addOption = (label) => {
    const newOption = {
      id: dropdownOptions.length + 1,
      defaultLabel: label,
      rank: dropdownOptions.length + 1,
    };
    setDropdownOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const updateOptions = (newOptions) => {
    setDropdownOptions(newOptions);
  };

  return (
    <DropdownContext.Provider
      value={{ dropdownOptions, addOption, updateOptions }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
*/

import React, { createContext, useState, useEffect, useContext } from "react";

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [dropdownOptions, setDropdownOptions] = useState(() => {
    const savedOptions = localStorage.getItem("dropdownOptions");
    return savedOptions
      ? JSON.parse(savedOptions)
      : [
          { id: 1, defaultLabel: "Yes", rank: 1 },
          { id: 2, defaultLabel: "No", rank: 2 },
          { id: 3, defaultLabel: "Maybe", rank: 3 },
        ];
  });

  useEffect(() => {
    localStorage.setItem("dropdownOptions", JSON.stringify(dropdownOptions));
  }, [dropdownOptions]);

  const addOption = (label) => {
    const newOption = {
      id: dropdownOptions.length + 1,
      defaultLabel: label,
      rank: dropdownOptions.length + 1,
    };
    setDropdownOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const updateOptions = (newOptions) => {
    setDropdownOptions(newOptions);
  };

  return (
    <DropdownContext.Provider
      value={{ dropdownOptions, addOption, updateOptions }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
