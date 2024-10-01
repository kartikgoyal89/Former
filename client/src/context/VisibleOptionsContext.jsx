import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const VisibleOptionsContext = createContext();

// Create a provider component
export const VisibleOptionsProvider = ({ children }) => {
  // Load initial state from local storage or use default
  const getInitialVisibleOptions = (key, defaultOptions) => {
    const savedOptions = localStorage.getItem(key);
    return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
  };

  const [visibleNameOptions, setVisibleNameOptions] = useState(() =>
    getInitialVisibleOptions("visibleNameOptions", [
      { id: "firstName", value: "First Name", checked: true },
      { id: "middleName", value: "Middle Name", checked: false },
      { id: "lastName", value: "Last Name", checked: true },
    ])
  );

  const [visibleAddressOptions, setVisibleAddressOptions] = useState(() =>
    getInitialVisibleOptions("visibleAddressOptions", [
      { id: "street1", value: "Street Address", checked: true },
      { id: "street2", value: "Street Address 2", checked: true },
      { id: "city", value: "City", checked: true },
      { id: "state", value: "State/Province", checked: true },
      { id: "postal", value: "Postal/Zip Code", checked: true },
      { id: "country", value: "Country", checked: true },
    ])
  );

  // Save to local storage whenever the options change
  useEffect(() => {
    localStorage.setItem(
      "visibleNameOptions",
      JSON.stringify(visibleNameOptions)
    );
  }, [visibleNameOptions]);

  useEffect(() => {
    localStorage.setItem(
      "visibleAddressOptions",
      JSON.stringify(visibleAddressOptions)
    );
  }, [visibleAddressOptions]);

  return (
    <VisibleOptionsContext.Provider
      value={{
        visibleNameOptions,
        setVisibleNameOptions,
        visibleAddressOptions,
        setVisibleAddressOptions,
      }}
    >
      {children}
    </VisibleOptionsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useVisibleOptions = () => useContext(VisibleOptionsContext);
