// import React, { createContext, useState, useContext } from "react";
// import { useItems } from "./itemContext";

// const OptionsContext = createContext();

// export const OptionsProvider = ({ children }) => {
//   const [options, setOptions] = useState([
//     { id: 1, defaultLabel: "Item 1", rank: 1 },
//     { id: 2, defaultLabel: "Item 2", rank: 2 },
//     { id: 3, defaultLabel: "Item 3", rank: 3 },
//   ]);

//   const addOption = (label) => {
//     const newOption = {
//       id: options.length + 1,
//       defaultLabel: label,
//       rank: options.length + 1,
//     };
//     setOptions((prevOptions) => [...prevOptions, newOption]);
//   };

//   const updateOptions = (newOptions) => {
//     setOptions(newOptions);
//   };

//   return (
//     <OptionsContext.Provider value={{ options, addOption, updateOptions }}>
//       {children}
//     </OptionsContext.Provider>
//   );
// };

// export const useOptions = () => {
//   return useContext(OptionsContext);
// };

import React, { createContext, useState, useContext, useEffect } from "react";

const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState(() => {
    const savedOptions = localStorage.getItem("options");
    return savedOptions
      ? JSON.parse(savedOptions)
      : [
          { id: 1, defaultLabel: "Item 1", rank: 1 },
          { id: 2, defaultLabel: "Item 2", rank: 2 },
          { id: 3, defaultLabel: "Item 3", rank: 3 },
        ];
  });

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  const addOption = (label) => {
    const newOption = {
      id: options.length + 1,
      defaultLabel: label,
      rank: options.length + 1,
    };
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const updateOptions = (newOptions) => {
    setOptions(newOptions);
  };

  return (
    <OptionsContext.Provider value={{ options, addOption, updateOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  return useContext(OptionsContext);
};
