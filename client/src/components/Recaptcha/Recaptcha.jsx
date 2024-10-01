import React, { useState } from "react";
import "./recaptcha.css";
import ReCAPTCHA from "react-google-recaptcha";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { useLocation } from "react-router-dom";

const Recaptcha = ({ id, onBlur, onFocus, style, isSelected, onClick }) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const handleRecaptcha = () => {
    onClick(id);
  };

  const onChange = () => {};

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } ranking-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleRecaptcha}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent:
          style?.alignment !== undefined ? style?.alignment : "left",
      }}
    >
      <ReCAPTCHA
        sitekey="6LfQORMqAAAAAGcdRtntud1iCPFSd2kaK5x3Lwwx"
        onChange={onChange}
      />
      <DeleteButton />
    </div>
  );
};

export default Recaptcha;
