import React, { useState, useRef, useEffect } from "react";
import SignaturePad from "react-signature-pad-wrapper";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import "./sign.css";

const Signature = ({ id, onBlur, onFocus, style, isSelected, onClick }) => {
  const [isSigningEnabled, setIsSigningEnabled] = useState(false); // State to control signing
  const [penColor, setPenColor] = useState("#000000");
  const sigPad = useRef(null);
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  useEffect(() => {
    setPenColor(style?.color);
  }, [style?.color]);

  const clearSignature = (e) => {
    e.preventDefault();
    if (sigPad.current) {
      sigPad.current.clear();
    }
  };

  const handleTurnstile = () => {
    onClick(id);
  };

  const saveSignature = () => {
    if (sigPad.current) {
      const dataUrl = sigPad.current.toDataURL();
      console.log(dataUrl); // You can save this URL or use it as needed
    }
  };

  const enableSigning = () => {
    setIsSigningEnabled(true);
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } ranking-container short-text-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleTurnstile}
    >
      <h5 className={`mb-3 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Signature"}
        {style?.required === true && <span style={{ color: "red" }}> *</span>}
      </h5>
      <div className="sign-pad">
        {formId.length != 0 ? (
          <SignaturePad
            ref={sigPad}
            width={800}
            height={200}
            options={{
              penColor: penColor,
            }}
          />
        ) : (
          <div className="disabled-signature-pad">
            <img
              className="cursor-pointer"
              src="./sign.jpg"
              alt=""
              height="200px"
            />
          </div>
        )}
      </div>
      <div className="mt-3 d-flex align-items-center gap-10">
        {formId.length !== 0 && (
          <button className="sign-clear" onClick={clearSignature}>
            Clear
          </button>
        )}
      </div>
      <DeleteButton />
    </div>
  );
};

export default Signature;
