import React from "react";
import TurnstileComponent from "react-turnstile";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

const Turnstile = ({ id, onBlur, onFocus, style, isSelected, onClick }) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const handleTurnstile = () => {
    onClick(id);
  };

  const onVerify = (token) => {
    // console.log(token);
  };

  const onErr = (err) => {
    // console.log(err);
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } ranking-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleTurnstile}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent:
          style?.alignment !== undefined ? style?.alignment : "left",
      }}
    >
      <TurnstileComponent
        sitekey="0x4AAAAAAAfXd48RHidhlo6U"
        onVerify={onVerify}
        onError={onErr}
      />
      <DeleteButton />
    </div>
  );
};

export default Turnstile;
// 0x4AAAAAAAfXd48RHidhlo6U
