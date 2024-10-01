import React, { createContext, useState, useContext, useEffect } from "react";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
