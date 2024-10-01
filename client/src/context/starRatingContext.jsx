import React, { createContext, useState, useContext, useEffect } from "react";

const StarRatingContext = createContext();

export const StarRatingProvider = ({ children }) => {
  const [maxStar, setMaxStar] = useState(5);
  const [minStar, setMinStar] = useState(0);

  return (
    <StarRatingContext.Provider
      value={{ maxStar, setMaxStar, minStar, setMinStar }}
    >
      {children}
    </StarRatingContext.Provider>
  );
};

export const useRatingStar = () => useContext(StarRatingContext);
