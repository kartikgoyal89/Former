import React, { useState, useEffect } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineStar } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { TiStarOutline } from "react-icons/ti";
import "./star.css";

const StarRating = ({
  id,
  onBlur,
  onFocus,
  style,
  isSelected,
  text,
  placeholderText,
  onClick,
  color = "gold",
  readOnly = false,
}) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [totalStars, setTotalStars] = useState(5);
  const [defaultFilled, setDefaultFilled] = useState(0);

  const handleRating = (rate) => {
    if (!readOnly) {
      setRating(rate);
    }
  };

  useEffect(() => {
    if (style?.starCount !== undefined) {
      setTotalStars(style.starCount);
    }
  }, [style?.starCount]);

  useEffect(() => {
    if (style?.defaultVal !== undefined) {
      setHoverRating(style?.defaultVal);
    }
  });

  const handleShortTextClick = () => {
    onClick(id);
  };

  const handleMouseEnter = (rate) => {
    if (!readOnly) {
      setHoverRating(defaultFilled);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const starStyle = {
    cursor: readOnly ? "default" : "pointer",
    fontSize: "24px",
    margin: "0 5px",
  };

  const numberStyle = {
    display: "block",
    marginTop: "5px",
    fontSize: "14px",
    color: "black",
  };

  return (
    <div
      className={`${
        formId.length === 0 ? "hover-outline" : ""
      } star-rating-container rating-container ${
        isSelected && formId.length === 0 ? "active" : ""
      }`}
      onClick={handleShortTextClick}
    >
      <h6 className={`mb-2 ${style?.required ? "required" : ""}`}>
        {style?.fieldLabel !== undefined ? style?.fieldLabel : "Star Rating"}
        {style?.required && <span style={{ color: "red" }}> *</span>}
      </h6>
      <div>
        {[...Array(totalStars)].map((_, index) => (
          <span
            key={index}
            style={{ display: "inline-block", textAlign: "center" }}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleRating(index + 1)}
          >
            <span style={starStyle}>
              {index < (hoverRating || rating) ? (
                <TiStarFullOutline
                  className="star-icon"
                  color={
                    style?.starColor !== undefined
                      ? style?.starColor
                      : "#FEC84B"
                  }
                />
              ) : (
                <TiStarOutline
                  className="star-icon"
                  color={
                    style?.starColor !== undefined
                      ? style?.starColor
                      : "#FEC84B"
                  }
                />
              )}
            </span>
            {!style?.showNumber && <span style={numberStyle}>{index + 1}</span>}
          </span>
        ))}
      </div>
      <DeleteButton />
    </div>
  );
};

export default StarRating;
