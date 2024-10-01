// import React, { createContext, useState, useContext } from "react";
// import img from "../../public/picture.svg";

// const PictureChoiceContext = createContext();

// export const PictureChoiceProvider = ({ children }) => {
//   const [options, setOptions] = useState([
//     { id: 1, defaultLabel: "Choice 1", defaultImg: "./picture.svg" },
//     { id: 2, defaultLabel: "Choice 2", defaultImg: "./picture.svg" },
//     { id: 3, defaultLabel: "Choice 3", defaultImg: "./picture.svg" },
//     { id: 4, defaultLabel: "Choice 4", defaultImg: "./picture.svg" },
//   ]);

//   const addOption = (label) => {
//     const newOption = {
//       id: options.length + 1,
//       defaultLabel: label,
//       defaultImg: img,
//     };
//     setOptions((prevOptions) => [...prevOptions, newOption]);
//   };

//   const updateOptions = (newOptions) => {
//     setOptions(newOptions);
//   };

//   return (
//     <PictureChoiceContext.Provider
//       value={{ options, addOption, updateOptions }}
//     >
//       {children}
//     </PictureChoiceContext.Provider>
//   );
// };

// export const usePictureChoice = () => {
//   return useContext(PictureChoiceContext);
// };

import React, { createContext, useState, useEffect, useContext } from "react";
import img from "../../public/picture.svg";

const PictureChoiceContext = createContext();

export const PictureChoiceProvider = ({ children }) => {
  const [pictureChoiceOptions, setPictureChoiceOptions] = useState(() => {
    const savedOptions = localStorage.getItem("pictureChoiceOptions");
    return savedOptions
      ? JSON.parse(savedOptions)
      : [
          { id: 1, defaultLabel: "Choice 1", defaultImg: img },
          { id: 2, defaultLabel: "Choice 2", defaultImg: img },
          { id: 3, defaultLabel: "Choice 3", defaultImg: img },
          { id: 4, defaultLabel: "Choice 4", defaultImg: img },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "pictureChoiceOptions",
      JSON.stringify(pictureChoiceOptions)
    );
  }, [pictureChoiceOptions]);

  const addOption = (label) => {
    const newOption = {
      id: pictureChoiceOptions.length + 1,
      defaultLabel: label,
      defaultImg: img,
    };
    setPictureChoiceOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const updateOptions = (newOptions) => {
    setPictureChoiceOptions(newOptions);
  };

  return (
    <PictureChoiceContext.Provider
      value={{ pictureChoiceOptions, addOption, updateOptions }}
    >
      {children}
    </PictureChoiceContext.Provider>
  );
};

export const usePictureChoice = () => useContext(PictureChoiceContext);
