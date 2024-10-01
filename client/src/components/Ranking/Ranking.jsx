import React, { useState, useEffect } from "react";
import Sortable from "sortablejs";
import { useOptions } from "../../context/OptionsContext";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./ranking.css";

const Ranking = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
}) => {
  const { options, updateOptions } = useOptions();
  const [items, setItems] = useState([]);

  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  useEffect(() => {
    console.log(options);
  }, [options]);

  useEffect(() => {
    if (options && options.length > 0) {
      const updatedItems = options.map((item, index) => ({
        id: item.id.toString(),
        content: item.defaultLabel,
        rank: index + 1,
      }));
      setItems(updatedItems);
    }
  }, [options]);

  useEffect(() => {
    const sortableList = Sortable.create(
      document.getElementById("sortable-list"),
      {
        onEnd: handleDragEnd,
      }
    );

    return () => {
      sortableList.destroy();
    };
  }, [items]);

  const handleShortTextClick = () => {
    onClick(id);
  };

  const handleDragEnd = (event) => {
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(event.oldIndex, 1);
    updatedItems.splice(event.newIndex, 0, movedItem);

    updatedItems.forEach((item, index) => {
      item.rank = index + 1;
    });

    setItems(updatedItems);
    updateOptions(
      updatedItems.map((item) => ({
        id: parseInt(item.id, 10),
        defaultLabel: item.content,
        rank: item.rank,
      }))
    );
  };

  const handleRankChange = (event, itemId) => {
    const newRank = parseInt(event.target.value, 10);
    const currentItemIndex = items.findIndex((item) => item.id === itemId);
    const currentItem = items[currentItemIndex];

    // Remove the item from its current position
    const updatedItems = Array.from(items);
    updatedItems.splice(currentItemIndex, 1);

    // Insert the item at its new position
    updatedItems.splice(newRank - 1, 0, currentItem);

    // Update the ranks based on new positions
    updatedItems.forEach((item, index) => {
      item.rank = index + 1;
    });

    setItems(updatedItems);
    updateOptions(
      updatedItems.map((item) => ({
        id: parseInt(item.id, 10),
        defaultLabel: item.content,
        rank: item.rank,
      }))
    );
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } ranking-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleShortTextClick}
      style={{ cursor: "pointer" }}
    >
      <h6 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Ranking"}
      </h6>
      <ul id="sortable-list" className="sortable-list">
        {items.map((item, index) => (
          <li key={item.id} className="sortable-item">
            <div
              className="draggable-item"
              style={{
                display: "flex",
                alignItems: "center",
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: "#fff",
                color: "#333",
                border: "1px solid #ccc",
                width: "100%",
                borderRadius: "6px",
              }}
            >
              <select
                value={item.rank}
                className="sortable-select"
                onChange={(event) => handleRankChange(event, item.id)}
                style={{ marginRight: "16px" }}
              >
                {items.map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
              </select>
              {item.content}
            </div>
          </li>
        ))}
      </ul>
      <DeleteButton />
    </div>
  );
};

export default Ranking;
