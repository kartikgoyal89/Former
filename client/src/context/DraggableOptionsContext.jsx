import React, { createContext, useContext, useState } from "react";

// Create a context
const DraggableOptionsContext = createContext();

// Create a provider component
export const DraggableOptionsProvider = ({ children }) => {
  const [draggableOptions, setDraggableOptions] = useState([
    { id: "1", content: "1" },
    { id: "2", content: "2" },
    { id: "3", content: "3" },
  ]);

  return (
    <DraggableOptionsContext.Provider
      value={{ draggableOptions, setDraggableOptions }}
    >
      {children}
    </DraggableOptionsContext.Provider>
  );
};

// Custom hook to use the context
export const useDraggableOptions = () => useContext(DraggableOptionsContext);
