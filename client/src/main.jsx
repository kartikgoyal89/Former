import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ItemsProvider, useItems } from "./context/itemContext";
import { OptionsProvider } from "./context/OptionsContext";
import { CalculationProvider } from "./context/CalculationContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <OptionsProvider>
    <ItemsProvider>
      <CalculationProvider>
        <App />
      </CalculationProvider>
    </ItemsProvider>
  </OptionsProvider>
);
