import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import "../Home/home.css";
import { useDroppable } from "@dnd-kit/core";
import { listState } from "../../components/Layout/Layout";
import { useItems } from "../../context/itemContext.jsx";

import Input from "../../components/Input/Input";
import Heading from "../../components/heading/Heading";
import ShortText from "../../components/shortText/ShortText";
import LongText from "../../components/LongText/LongText";
import Number from "../../components/Number/Number";
import Name from "../../components/Name/Name";
import Email from "../../components/Email/Email";
import Phone from "../../components/Phone/Phone";
import Link from "../../components/Link/Link";
import Address from "../../components/Address/Address";
import Date from "../../components/Date/Date";
import Time from "../../components/Time/Time";
import ScaleRating from "../../components/ScaleRating/ScaleRating";
import StarRating from "../../components/starRating/StarRating";
import Ranking from "../../components/Ranking/Ranking";

import ColorPicker from "../../components/ColorPicker/ColorPicker";
import Collapsible from "react-collapsible";
import { AiOutlineDrag } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { PiAlignCenterHorizontalBold } from "react-icons/pi";
import { PiAlignRightBold } from "react-icons/pi";
import { PiAlignLeftBold } from "react-icons/pi";
import { FaHeading } from "react-icons/fa6";
import { TfiText } from "react-icons/tfi";
import { PiTextTBold } from "react-icons/pi";
import { FiFileText } from "react-icons/fi";
import { TbNumbers } from "react-icons/tb";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";
import { LuPhone } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { PiMapPinBold } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { PiChartBarBold } from "react-icons/pi";
import { TiStarFullOutline } from "react-icons/ti";
import { PiRankingBold } from "react-icons/pi";

import buttonProperties from "../../config/buttonProperties.json";
import textProperties from "../../config/textProperties.json";
import formHeaderProperties from "../../config/formHeaderProperties.json";
import shortTextProperties from "../../config/shortTextProperties.json";
import longTextProperties from "../../config/longTextProperties.json";
import numberProperties from "../../config/numberProperties.json";
import nameProperties from "../../config/nameProperties.json";
import emailProperties from "../../config/emailProperties.json";
import phoneProperties from "../../config/phoneProperties.json";
import linkProperties from "../../config/linkProperties.json";
import addressProperties from "../../config/addressProperties.json";
import dateProperties from "../../config/dateProperties.json";
import timeProperties from "../../config/timeProperties.json";
import scaleRatingProperties from "../../config/scaleRatingProperties.json";
import starRatingProperties from "../../config/starRatingProperties.json";
import rankingProperties from "../../config/rankingProperties.json";

import Accordion from "../../components/Accordion/Accordion";

import { DragDropContext } from "react-beautiful-dnd";
import DraggableOptions from "../../context/DraggableOptions";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Home1 = () => {
  const { items, setItems } = useItems();
  const [selectedElementId, setSelectedElementId] = useState(null);

  // COLOR STATE
  const [primaryColor, setPrimaryColor] = useState("#01A3FE");
  const [questionColor, setQuestionColor] = useState("#FFFFFF");
  const [answerColor, setAnswerColor] = useState("#FFFFFF");
  const [formColor, setFormColor] = useState("#FFFFFF");
  const [buttonColor, setButtonColor] = useState("");

  const [slide, setSlide] = useState("hide");

  const [slideColor, setSlideColor] = useState("#000000");

  const [displayToggle, setDisplayToggle] = useState(false);

  const [submit, setSubmit] = useState("Submit");
  const [btnHeight, setBtnHeight] = useState(42);
  const [btnFontSize, setBtnFontSize] = useState(20);
  const [btnBold, setBtnBold] = useState(false);
  const [btnItalic, setBtnItalic] = useState(false);

  const [submitButtonStyle, setSubmitButtonStyle] = useState({
    backgroundColor: primaryColor,
    fontSize: 20,
    height: 42,
    fontWeight: "400",
    fontStyle: "normal",
    text: "Submit",
  });

  // =========s=========================================================
  // MAIN STYLING
  const [mainId, setMainId] = useState(null);
  const [mainType, setMainType] = useState("");
  const [mainText, setMainText] = useState("");
  const [mainStyle, setMainStyle] = useState({});
  const [design, setDesign] = useState("general");
  const [activeTab, setActiveTab] = useState("general");

  const [visibleArray, setVisibleArray] = useState([]);
  const [rankings, setRankings] = useState([]);

  // ==================================================================

  //BUTTON PROPERTIES
  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color);
  };

  const handleQuestionColorChange = (color) => {
    setQuestionColor(color);
  };

  const handleAnswerColorChange = (color) => {
    setAnswerColor(color);
  };

  const handleFormColorChange = (color) => {
    setFormColor(color);
  };

  // SUBMIT BUTTON FUNCTION
  const handleSubmitButton = (e) => {
    e.preventDefault();
    setSlide("show");
    setMainType("button");
    setMainId(0);
    setActiveTab("general");
    setDesign("general");
    setMainText(submit ? submit : "Submit");
    ({
      backgroundColor: primaryColor,
      fontSize: `${btnFontSize}px`,
      height: `${btnHeight}px`,
      fontWeight: btnBold ? "600" : "400",
      fontStyle: btnItalic ? "italic" : "normal",
    });
  };

  const setTheProperties = (id) => {
    setMainId(id);
    items.forEach((item) => {
      if (item?.id === id) {
        setMainText(item?.text || "");
        setMainStyle(item?.style || {});
        setMainType(item?.type);
      }
    });
    setSlide("show");
    setActiveTab("general");
    setDesign("general");
  };

  const handleStyleChange = (id, name, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              style: { ...item.style, [name]: value },
              ...(name === "text" && { text: value }),
            }
          : item
      )
    );
    if (id === 0) {
      setSubmitButtonStyle((prevStyle) => ({
        ...prevStyle,
        [name]: value,
      }));
    }
    // console.log(id, name, value);
  };

  const iconComponents = {
    FaHeading: FaHeading,
    FaBold: FaBold,
    FaItalic: FaItalic,
    PiTextTBold: PiTextTBold,
    IoRadioButtonOnSharp: IoRadioButtonOnSharp,
    FiFileText: FiFileText,
    TbNumbers: TbNumbers,
    AiOutlineUser: AiOutlineUser,
    TfiEmail: TfiEmail,
    LuPhone: LuPhone,
    FaLink: FaLink,
    PiMapPinBold: PiMapPinBold,
    MdOutlineDateRange: MdOutlineDateRange,
    MdAccessTime: MdAccessTime,
    PiChartBarBold: PiChartBarBold,
    TiStarFullOutline: TiStarFullOutline,
    PiRankingBold: PiRankingBold,
  };

  const handleOptionsChange = (id, key, newOptions) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, [key]: { ...item[key], option: newOptions } }
          : item
      )
    );
    // console.log(id, key, newOptions);
    setRankings(newOptions);
  };

  const handleAddOption = (id, key) => {
    const newOption = {
      id: generateUniqueId(), // You need to implement a function to generate unique IDs
      defaultLabel: "New Option", // Default label or any initial value
    };
    const updatedOptions = [...ranking[id].properties[key].option, newOption];
    handleOptionsChange(id, key, updatedOptions);
  };

  const renderProperties = (properties, id) => {
    const element = items.find((item) => item.id === id);

    const lowestRating = properties.lowestRating?.default || 0;
    const highestRating = properties.highestRating?.default || 10;

    return Object.keys(properties).map((key, index) => {
      const property = properties[key];
      const IconComponent = iconComponents[property.headingIcon];

      const options = Array.from(
        { length: property.end - property.start + 1 },
        (_, i) => property.start + i
      );

      if (property.type === "none") {
        return (
          <div key={key} className="row-wrapper">
            <div className="property" style={{ flex: 1 }}>
              <div
                className="w-100 d-flex justify-content-between"
                style={{ padding: "5px 10px" }}
              >
                <div className="heading">
                  <div className="icon">
                    {IconComponent && <IconComponent />}
                  </div>
                  <label
                    className={`${
                      property.isHeading && property.type === "heading"
                        ? "heading-label"
                        : ""
                    }`}
                  >
                    {property.label}
                  </label>
                </div>
                <RxCross2
                  className={`${
                    property.isHeading ? "heading-cross" : "display-none"
                  }`}
                  onClick={() => {
                    setSlide("hide");
                    setTimeout(() => {
                      setDesign("general");
                      setActiveTab("general");
                    }, 200);
                  }}
                />
              </div>
              <hr className={`${property.isHeading ? "hr" : "display-none"}`} />
            </div>
            {index < Object.keys(properties).length - 1 &&
              properties[Object.keys(properties)[index + 1]].type ===
                "none" && (
                <div className="property" style={{ flex: 1 }}>
                  <div
                    className="w-100 d-flex justify-content-between"
                    style={{ padding: "5px 10px" }}
                  >
                    <div className="heading">
                      <div className="icon">
                        {IconComponent && <IconComponent />}
                      </div>
                      <label
                        className={`${
                          property.isHeading ? "heading-label" : ""
                        }`}
                      >
                        {property.label}
                      </label>
                    </div>
                    <RxCross2
                      className={`${
                        property.isHeading ? "heading-cross" : "display-none"
                      }`}
                      onClick={() => {
                        setSlide("hide");
                        setDesign("general");
                        setActiveTab("general");
                      }}
                    />
                  </div>
                </div>
              )}
          </div>
        );
      }

      return (
        <div
          key={key}
          className={`max-height px-2 ${
            property?.designType === design || property?.designType === "head"
              ? ""
              : "display-none"
          }`}
          style={
            property.column === "column"
              ? {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  verticalAlign: "middle",
                }
              : property?.designType === design ||
                property?.designType === "head"
              ? {}
              : { display: "none" }
          }
        >
          <div
            className={`${property.isHeading ? "element-heading" : "element"}`}
          >
            <div
              className={`${
                property?.isHeading
                  ? "w-100 d-flex justify-content-between"
                  : ""
              }`}
              style={property?.isHeading ? { padding: "5px 10px" } : {}}
            >
              <div className="heading">
                <div className="icon">{IconComponent && <IconComponent />}</div>
                <label
                  className={`${
                    property.isHeading
                      ? "heading-label"
                      : property?.designType === design
                      ? ""
                      : "display-none"
                  }`}
                >
                  {property.label}
                </label>
              </div>
              <RxCross2
                className={`${
                  property.isHeading ? "heading-cross" : "display-none"
                }`}
                onClick={() => {
                  setSlide("hide");
                  setTimeout(() => {
                    setDesign("general");
                    setActiveTab("general");
                  }, 200);
                }}
              />
            </div>
            <hr className={`${property.isHeading ? "hr" : "display-none"}`} />
          </div>
          {property.type === "number" && property?.designType === design ? (
            <input
              type="number"
              className={`${property?.column === "column" ? "w-100" : ""}`}
              max={property.max ? property.max : 10000}
              min={property.min ? property.min : 0}
              defaultValue={
                parseInt(element?.style?.[key]) === undefined
                  ? parseInt(element?.style?.[key])
                  : property.defaultValue
              }
              onChange={(e) => handleStyleChange(id, key, e.target.value)}
            />
          ) : property.type === "button" && property?.designType === design ? (
            <button
              className={`btn_ ${
                element?.style?.[key] === true ? "active-btn" : ""
              }`}
              onClick={() => {
                handleStyleChange(id, key, !element?.style?.[key]);
              }}
            >
              {property.value}
            </button>
          ) : property.type === "color" && property?.designType === design ? (
            <div className="color-input-div">
              <input
                className="color-input"
                type="color"
                value={slideColor}
                onChange={(e) => {
                  handleStyleChange(id, key, e.target.value);
                  setSlideColor(e.target.value);
                }}
              />
              <p className="mb-0">{slideColor}</p>
            </div>
          ) : property.type === "toggle" && property?.designType === design ? (
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => {
                  handleStyleChange(id, key, !element?.style?.[key]);
                }}
              />
              <span className="slider round"></span>
            </label>
          ) : property.type === "input" && property?.designType === design ? (
            <input
              className="input-text"
              type="text"
              defaultValue={property.defaultValue}
              value={element?.style?.[key]}
              onChange={(e) => handleStyleChange(id, key, e.target.value)}
            />
          ) : property.type === "design" ? (
            <div className="w-100 d-flex flex-column align-items-start justify-content-start cursor-pointer">
              <div className="d-flex gap-20 design-tab">
                <p
                  className={`mb-0 ${
                    design === "general" ? "active-design" : ""
                  }`}
                  onClick={() => {
                    setDesign("general");
                    setActiveTab("general");
                  }}
                >
                  {property?.label1}
                </p>
                {property?.label2 && (
                  <p
                    className={`mb-0 ${
                      design === "advanced" ? "active-design" : ""
                    }`}
                    onClick={() => {
                      setDesign("advanced");
                      setActiveTab("advanced");
                    }}
                  >
                    {property?.label2}
                  </p>
                )}
              </div>
              <hr className="m-0 mt-0" />
            </div>
          ) : property?.type === "textarea" &&
            property?.designType === design ? (
            <textarea
              className="input-textarea mt-2 mb-2"
              cols="33"
              rows="5"
              defaultValue={property.defaultValue}
              value={element?.style?.[key]}
              onChange={(e) => handleStyleChange(id, key, e.target.value)}
            ></textarea>
          ) : property.type === "option" && property?.designType === design ? (
            <>
              <div className="w-100">
                {Object.values(property.options).map((option, optionKey) => {
                  return (
                    <div
                      key={optionKey}
                      className="d-flex w-100 align-items-center gap-20"
                    >
                      <input
                        style={{ width: "20px" }}
                        type="checkbox"
                        value={option}
                        defaultChecked={option.checked}
                        onClick={() => {
                          setDisplayToggle(!displayToggle);
                          setVisibleArray((prevArray) => {
                            const index = prevArray.findIndex(
                              (item) => item.id === option.id
                            );

                            if (index !== -1) {
                              const updatedArray = [...prevArray];
                              updatedArray[index] = {
                                id: option.id,
                                checked: !prevArray[index].checked,
                                value: option.value,
                              };
                              return updatedArray;
                            } else {
                              return [
                                ...prevArray,
                                {
                                  id: option.id,
                                  checked: !option.checked,
                                  value: option.value,
                                },
                              ];
                            }
                          });
                        }}
                      />
                      <label>{option?.label}</label>
                    </div>
                  );
                })}
              </div>
            </>
          ) : property.type === "date" && property?.designType === design ? (
            <>
              <input
                type="date"
                className="w-100 date-input"
                onChange={(e) => handleStyleChange(id, key, e.target.value)}
              />
            </>
          ) : property?.type === "time" && property?.designType === design ? (
            <>
              <input
                type="time"
                className="w-100 time-input"
                onChange={(e) => handleStyleChange(id, key, e.target.value)}
              />
            </>
          ) : property?.type === "number-select" &&
            property?.designType === design ? (
            <select
              name=""
              id=""
              className={`select-input ${
                property?.column === "column" ? "w-100" : ""
              }`}
              value={element?.style?.[key] || property?.default}
              onChange={(e) =>
                handleStyleChange(id, key, parseInt(e.target.value))
              }
            >
              {options.map((option) => (
                <option key={option} value={parseInt(option)}>
                  {option}
                </option>
              ))}
            </select>
          ) : property?.type === "draggable-options" &&
            property?.designType === design ? (
            <div key={key} className="property" style={{ flex: 1 }}>
              <DraggableOptions
                options={property.option}
                onOptionsChange={(newOptions) =>
                  handleOptionsChange(id, key, newOptions)
                }
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    });
  };

  return (
    <listState>
      <Layout className="home-layout">
        <div className="home-container">
          <form action="" className="form-container">
            {items?.length === 0 ? (
              <>
                <div className="nodata">
                  <div className="text">
                    <AiOutlineDrag /> Click or Drag Elements to add questions,
                    text to your form.
                  </div>
                </div>
              </>
            ) : (
              <>
                {items?.map((item, key) =>
                  item?.type === "form-header" ? (
                    <Heading
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                    />
                  ) : item?.type === "text" ? (
                    <Input
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                    />
                  ) : item?.type === "long-text" ? (
                    <LongText
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      height={item?.height}
                      defaultVal={item?.defaultVal}
                      minChar={item?.minChar}
                      maxChar={item?.maxChar}
                    />
                  ) : item?.type === "short-text" ? (
                    <ShortText
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                    />
                  ) : item?.type === "number" ? (
                    <Number
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                      minChar={item?.minChar}
                      maxChar={item?.maxChar}
                    />
                  ) : item?.type === "email" ? (
                    <Email
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                    />
                  ) : item?.type === "name" ? (
                    <Name
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      firstNameInput={item.text}
                      lastNameInput={item.text}
                      firstPlaceholder={item.text}
                      lastPlaceholder={item.text}
                      VisibleOptions={visibleArray}
                    />
                  ) : item?.type === "phone" ? (
                    <Phone
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                    />
                  ) : item?.type === "link" ? (
                    <Link
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                    />
                  ) : item?.type === "address" ? (
                    <Address
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                      VisibleOptions={visibleArray}
                    />
                  ) : item?.type === "date" ? (
                    <Date
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                    />
                  ) : item?.type === "time" ? (
                    <Time
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                    />
                  ) : item?.type === "scale" ? (
                    <ScaleRating
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                    />
                  ) : item?.type === "star" ? (
                    <StarRating
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                    />
                  ) : item?.type === "ranking" ? (
                    <Ranking
                      id={item.id}
                      key={item.id}
                      onClick={() => setTheProperties(item.id)}
                      style={item.style || {}}
                      isSelected={mainId === item.id}
                      text={item.text}
                      placeholderText={item.text}
                      defaultVal={item?.defaultVal}
                      ranking={rankings}
                      onRankingChange={handleRankingChange}
                    />
                  ) : (
                    <></>
                  )
                )}
                <div className="submit-div hover-outline">
                  <button
                    className="submit"
                    style={submitButtonStyle}
                    onClick={(e) => {
                      handleSubmitButton(e);
                    }}
                  >
                    {submit ? submit : "SUBMIT"}
                  </button>
                </div>
              </>
            )}
          </form>
          <div className="side-settings" style={{ width: "max-content" }}>
            <h6 className="mb-0">Design</h6>
            <hr className="p-0 m-0 w-100 mt-2 mb-2" />
            <h6>General</h6>
            <div className="color-pallette">
              <div className="color-box mt-2 mb-2">
                <p className="color-input m-0">Primary Color</p>
                <ColorPicker onChange={handlePrimaryColorChange} />
              </div>
              <div className="color-box mt-2 mb-2 ms-3">
                <p className="color-input m-0 text-nowrap">Question Color</p>
                <ColorPicker onChange={handleQuestionColorChange} />
              </div>
              <div className="color-box mb-2" style={{ marginTop: "30px" }}>
                <p className="color-input m-0 text-nowrap">Answer Color</p>
                <ColorPicker onChange={handleAnswerColorChange} />
              </div>
              <div
                className="color-box ms-3 mb-2"
                style={{ marginTop: "30px" }}
              >
                <p className="color-input m-0 text-nowrap">Form Color</p>
                <ColorPicker onChange={handleFormColorChange} />
              </div>
            </div>

            <Accordion />

            <div className={`slide-settings ${slide}`}>
              {mainType === "form-header" &&
                renderProperties(formHeaderProperties, mainId)}
              {mainType === "text" && renderProperties(textProperties, mainId)}
              {mainType === "button" && renderProperties(buttonProperties)}
              {mainType === "short-text" &&
                renderProperties(shortTextProperties, mainId)}
              {mainType === "long-text" &&
                renderProperties(longTextProperties, mainId)}
              {mainType === "number" &&
                renderProperties(numberProperties, mainId)}
              {mainType === "name" && renderProperties(nameProperties, mainId)}
              {mainType === "email" &&
                renderProperties(emailProperties, mainId)}
              {mainType === "phone" &&
                renderProperties(phoneProperties, mainId)}
              {mainType === "link" && renderProperties(linkProperties, mainId)}
              {mainType === "address" &&
                renderProperties(addressProperties, mainId)}
              {mainType === "date" && renderProperties(dateProperties, mainId)}
              {mainType === "time" && renderProperties(timeProperties, mainId)}
              {mainType === "scale" &&
                renderProperties(scaleRatingProperties, mainId)}
              {mainType === "star" &&
                renderProperties(starRatingProperties, mainId)}
              {mainType === "ranking" &&
                renderProperties(rankingProperties, mainId)}
            </div>
          </div>
        </div>
      </Layout>
    </listState>
  );
};

export default Home1;
