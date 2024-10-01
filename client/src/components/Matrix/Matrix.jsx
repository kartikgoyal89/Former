import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMatrix } from "../../context/matrixContext";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./matrix.css";

const Matrix = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
  selectedChoice,
}) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const { rows, columns, addRow, addColumn, updateRow, updateColumn } =
    useMatrix();

  const handleRowLabelChange = (index, newValue) => {
    const newRows = [...rows];
    newRows[index].defaultLabel = newValue;
    updateRow(newRows);
  };

  const handleColumnLabelChange = (index, newValue) => {
    const newColumns = [...columns];
    newColumns[index].defaultLabel = newValue;
    updateColumn(newColumns);
  };

  return (
    <div
      className={`short-text-container ${
        formId.length === 0 ? "hover-outline" : ""
      } 
      ${isSelected && formId.length === 0 ? "active" : ""}
      matrix-container`}
      onClick={() => onClick(id)}
    >
      <h5 className={`mb-3 ${style?.required ? "required" : ""} `}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Matrix"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h5>
      <table className="matrix-table">
        <thead>
          <tr>
            <th></th>
            {columns.map((col, index) => (
              <th className="column-head" key={col.id}>
                <input
                  type="text"
                  readOnly
                  value={col.defaultLabel}
                  className="matrix-input"
                  onChange={(e) =>
                    handleColumnLabelChange(index, e.target.value)
                  }
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>
                <input
                  type="text"
                  readOnly
                  className="matrix-input"
                  value={row.defaultLabel}
                  onChange={(e) => handleRowLabelChange(index, e.target.value)}
                />
              </td>
              {columns.map((col) => (
                <td key={col.id}>
                  <input
                    className="radio-btn"
                    type="radio"
                    required={style?.required ? "true" : "false"}
                    disabled={formId.length === 0 ? true : false}
                    name={`row-${row.id}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteButton />
    </div>
  );
};

export default Matrix;
