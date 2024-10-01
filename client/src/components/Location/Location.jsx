import React, { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./location.css";

const Location = ({ id, onBlur, onFocus, style, isSelected, onClick }) => {
  const [locationMap, setLocationMap] = useState("");

  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const handleTurnstile = () => {
    onClick(id);
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationMap(` ${latitude},  ${longitude}`);
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div
      className={` ${
        formId.length === 0 ? "hover-outline" : ""
      } ranking-container short-text-container location-input-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleTurnstile}
    >
      <h5 htmlFor="location-input" className="mb-3 location-label">
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Location"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h5>
      <div className="location-input-wrapper">
        <input
          type="text"
          id="location-input"
          className="location-input cursor-pointer"
          value={locationMap}
          onChange={handleChange}
          placeholder={
            style?.placeholderText !== undefined
              ? style?.placeholderText
              : "Enter Location"
          }
          readOnly={formId.length === 0 ? true : false}
        />
        <button
          type="button"
          className="location-icon-button"
          onClick={handleLocationClick}
        >
          <BiCurrentLocation />
        </button>
      </div>
      <DeleteButton />
    </div>
  );
};

export default Location;
