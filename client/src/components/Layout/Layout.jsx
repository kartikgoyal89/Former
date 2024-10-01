import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { DndContext } from "@dnd-kit/core";
import "./layout.css";
import { ItemsProvider, useItems } from "../../context/itemContext";
import { OptionsProvider } from "../../context/OptionsContext";

const Layout = ({ children }) => {
  const [idCounter, setIdCounter] = useState(1);
  const { items, setItems } = useItems();

  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "droppable") {
      document.getElementById("droppable").dispatchEvent(
        new CustomEvent("itemDropped", {
          detail: { id: active.id },
        })
      );
    }
    setIdCounter((idCounter) => idCounter + 1);
    setItems((prevItems) => [
      ...prevItems,
      { id: idCounter, text: active.id, type: active.id, style: {} },
    ]);
  };

  const [sidebarItems, setSidebarItems] = useState([
    "form-header",
    "text",
    "short-text",
    "long-text",
    "number",
    "name",
    "email",
    "phone",
    "link",
    "address",
    "date",
    "time",
  ]);

  const handleDrop = (id) => {
    setSidebarItems((items) => [...items]);
  };

  return (
    <ItemsProvider>
      <OptionsProvider>
        <DndContext onDragEnd={handleDragEnd}>
          <div className={`${formId.length === 0 ? "" : "display-none"}`}>
            <Header />
          </div>
          <div className="d-flex layout">
            <div
              className={`sidebar ${formId.length === 0 ? "" : "display-none"}`}
              style={{ width: formId.length === 0 ? "22%" : "0%" }}
            >
              <Sidebar items={sidebarItems} />
            </div>
            <div
              className="content"
              style={{
                width: formId.length === 0 ? "78%" : "100%",
                backgroundColor: "#f2f2f2",
              }}
            >
              {children}
            </div>
          </div>
        </DndContext>
      </OptionsProvider>
    </ItemsProvider>
  );
};

export default Layout;
export const listState = (props) => {
  return (
    <listState.Provider value={items}>{props.children}</listState.Provider>
  );
};
