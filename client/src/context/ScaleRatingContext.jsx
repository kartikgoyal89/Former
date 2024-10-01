import React, { createContext, useState, useContext, useEffect } from "react";

const ScaleRatingContext = createContext();

export const ScaleRatingProvider = ({ children }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);

  return (
    <ScaleRatingContext.Provider value={{ min, max, setMin, setMax }}>
      {children}
    </ScaleRatingContext.Provider>
  );
};

export const useRatingScale = () => useContext(ScaleRatingContext);
