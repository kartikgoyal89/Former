// import React, { useState } from "react";
// import { SketchPicker } from "react-color";
// import "./colorpicker.css";

// const ColorPicker = ({ onColorChange }) => {
//   const [color, setColor] = useState("#000");
//   const [displayColorPicker, setDisplayColorPicker] = useState(false);

//   const handleChangeComplete = (color) => {
//     setColor(color.hex);
//     onColorChange(color.hex);
//   };

//   const handleClick = () => {
//     setDisplayColorPicker(!displayColorPicker);
//   };

//   const handleClose = () => {
//     setDisplayColorPicker(false);
//   };

//   const handleInputChange = (e) => {
//     setColor(e.target.value);
//     onColorChange(e.target.value);
//   };

//   return (
//     <div className="color-picker-container">
//       <input
//         type="text"
//         value={color}
//         onChange={handleInputChange}
//         className="color-input"
//       />
//       <div
//         className="color-box color"
//         style={{ backgroundColor: color }}
//         onClick={handleClick}
//       />
//       {displayColorPicker ? (
//         <div className="popover">
//           <div className="cover" onClick={handleClose} />
//           <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default ColorPicker;

import React, { useState } from "react";
import { SketchPicker } from "react-color";
import "./colorpicker.css";

const ColorPicker = ({ onChange }) => {
  const [color, setColor] = useState("#000");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    onChange(color.hex); // Pass selected color to parent component
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleInputChange = (e) => {
    setColor(e.target.value);
    onChange(e.target.value); // Pass entered color value to parent component
  };

  return (
    <div className="color-picker-container">
      <input
        type="text"
        value={color}
        onChange={handleInputChange}
        className="color-input"
      />
      <div
        className="color-box color"
        style={{ backgroundColor: color }}
        onClick={handleClick}
      />
      {displayColorPicker ? (
        <div className="popover">
          <div className="cover" onClick={handleClose} />
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
