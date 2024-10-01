import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { saveAs } from "file-saver";
import "../Home/home.css";
import { useDroppable } from "@dnd-kit/core";
import { listState } from "../../components/Layout/Layout";
import { useItems } from "../../context/itemContext.jsx";
import { useMatrix } from "../../context/matrixContext";
import { useRatingScale } from "../../context/ScaleRatingContext";
import { useRatingStar } from "../../context/starRatingContext";
import { useSingleChoice } from "../../context/singleChoiceContext";
import { useVisibleOptions } from "../../context/VisibleOptionsContext";
import { RenderPropertiesProvider } from "../../context/RenderPropertiesContext";
import { useDropdown } from "../../context/dropdownContext";

import { useMultipleChoice } from "../../context/MultipleChoiceContext";
import { usePictureChoice } from "../../context/PictureChoiceContext";

import DynamicForm from "../../components/DynamicForm/DynamicForm";

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
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import { PiRowsBold } from "react-icons/pi";
import { CiViewTable } from "react-icons/ci";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";
import { BsRepeat } from "react-icons/bs";
import { PiPenNib } from "react-icons/pi";
import { BiUpload } from "react-icons/bi";
import { TbCurrentLocation } from "react-icons/tb";
import { PiMathOperationsLight } from "react-icons/pi";
import { RxSpaceBetweenVertically } from "react-icons/rx";

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
import singleChoiceProperties from "../../config/singleChoiceProperties.json";
import multipleChoiceProperties from "../../config/multipleChoiceProperties.json";
import pictureChoiceProperties from "../../config/pictureChoiceProperties.json";
import dropdownProperties from "../../config/dropdownProperties.json";
import matrixProperties from "../../config/matrixProperties.json";
import imageProperties from "../../config/imageProperties.json";
import videoProperties from "../../config/videoProperties.json";
import audioProperties from "../../config/audioProperties.json";
import genericProperties from "../../config/genericProperties.json";
import recaptchaProperties from "../../config/recaptchaProperties.json";
import turnstileProperties from "../../config/turnstileProperties.json";
import signProperties from "../../config/signProperties.json";
import locationProperties from "../../config/locationProperties.json";
import calculationProperties from "../../config/calculationProperties.json";
import fileUploadProperties from "../../config/fileUploadProperties.json";
import spacerProperties from "../../config/spacerProperties.json";

import Accordion from "../../components/Accordion/Accordion";

import { DragDropContext } from "react-beautiful-dnd";
import DraggableOptions from "../../context/DraggableOptions";
import DraggableSingleChoice from "../../context/DraggableSingleChoice";
import DraggableMultipleChoice from "../../context/DraggableMultipleChoice";
import DraggablePictureChoice from "../../context/DraggablePictureChoice";
import DraggableDropdown from "../../context/DraggableDropdown";
import DraggableMatrix from "../../context/DraggableMatrix";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ImageUploadModal from "../../components/ImageUpload/ImageUploadModal";

const Home1 = () => {
  const location = useLocation();
  const formId = location.pathname.split("/")[1];

  // CONTEXT PART
  const { items, setItems } = useItems();
  const { setMin, setMax, min, max } = useRatingScale();
  const { setMaxStar, maxStar, minStar, setMinStar } = useRatingStar();
  const { singleChoiceOptions, setSingleChoiceOptions } = useSingleChoice();
  const { multipleChoiceOptions } = useMultipleChoice();
  const { pictureChoiceOptions } = usePictureChoice();
  const { dropdownOptions } = useDropdown();

  const { rows, columns, addRow, addColumn } = useMatrix();

  const {
    visibleNameOptions,
    setVisibleNameOptions,
    visibleAddressOptions,
    setVisibleAddressOptions,
  } = useVisibleOptions();

  const [initialRows, setInitialRows] = useState(rows);
  const [initialCols, setInitialCols] = useState(columns);

  const [selectedElementId, setSelectedElementId] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // COLOR STATE
  const [primaryColor, setPrimaryColor] = useState("#01A3FE");
  const [questionColor, setQuestionColor] = useState("#FFFFFF");
  const [answerColor, setAnswerColor] = useState("#FFFFFF");
  const [formColor, setFormColor] = useState("#FFFFFF");
  const [buttonColor, setButtonColor] = useState("");

  const [slide, setSlide] = useState("hide");

  const [slideColor, setSlideColor] = useState("#000000");

  const [displayToggle, setDisplayToggle] = useState(false);
  const [singleChoice, setSingleChoice] = useState("");

  const [submit, setSubmit] = useState("Submit");
  const [btnHeight, setBtnHeight] = useState(42);
  const [btnFontSize, setBtnFontSize] = useState(20);
  const [btnBold, setBtnBold] = useState(false);
  const [btnItalic, setBtnItalic] = useState(false);

  const [submitButtonStyle, setSubmitButtonStyle] = useState({
    backgroundColor: primaryColor,
    fontSize: 20,
    height: 42,
    bold: false,
    italic: false,
    fontStyle: "normal",
    text: "Submit",
  });

  // =================================================================
  // MAIN STYLING
  const [mainId, setMainId] = useState(null);
  const [mainType, setMainType] = useState("");
  const [mainText, setMainText] = useState("");
  const [mainStyle, setMainStyle] = useState({});
  const [design, setDesign] = useState("general");
  const [activeTab, setActiveTab] = useState("general");
  const [textAreaValue, setTextAreaValue] = useState("");

  const [visibleArray, setVisibleArray] = useState([]);
  const [rankings, setRankings] = useState([]);

  const [uniqueSingleId, setUniqueSingleId] = useState(0);

  // ==================================================================

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleImageUpload = (image) => {
    setUploadedImage(image);
  };

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

  const handleSubmitButton = (e) => {
    e.preventDefault();
    setMainId(0);
    setSlide("show");
    setMainType("button");
    setActiveTab("general");
    setDesign("general");
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

  const addOperator = (id, key, label) => {
    const newValue = textAreaValue + label;
    setTextAreaValue(newValue);
    handleStyleChange(id, key, newValue);
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
    IoMdRadioButtonOn: IoMdRadioButtonOn,
    IoIosCheckboxOutline: IoIosCheckboxOutline,
    CiViewTable: CiViewTable,
    IoImageOutline: IoImageOutline,
    BsArrowRepeat: BsArrowRepeat,
    BsRepeat: BsRepeat,
    PiPenNib: PiPenNib,
    BiUpload: BiUpload,
    TbCurrentLocation: TbCurrentLocation,
    PiMathOperationsLight: PiMathOperationsLight,
    RxSpaceBetweenVertically: RxSpaceBetweenVertically,
  };

  const handleMatrixOptionsChange = (newOptions, type) => {
    if (type === "row") {
      setInitialRows(newOptions);
    } else if (type === "column") {
      setInitialCols(newOptions);
    }
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
      id: generateUniqueId(),
      defaultLabel: "New Option",
    };
    const updatedOptions = [...ranking[id].properties[key].option, newOption];
    handleOptionsChange(id, key, updatedOptions);
  };

  const renderProperties = (properties, id) => {
    const element = items.find((item) => item.id === id);

    const lowestRating = properties.lowestRating?.default || 0;
    const highestRating = properties.highestRating?.default || 10;

    const filteredOptions = visibleAddressOptions.filter(
      (option) => option.checked
    );

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
            <>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => {
                    handleStyleChange(id, key, !element?.style?.[key]);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </>
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
              {property?.context === "name" &&
                visibleNameOptions.map((option, optionKey) => (
                  <div
                    key={optionKey}
                    className="d-flex w-100 align-items-center gap-20"
                  >
                    <input
                      style={{ width: "20px" }}
                      type="checkbox"
                      value={option.value}
                      checked={option.checked}
                      onChange={() => {
                        setVisibleNameOptions((prevOptions) =>
                          prevOptions.map((opt) =>
                            opt.id === option.id
                              ? { ...opt, checked: !opt.checked }
                              : opt
                          )
                        );
                      }}
                    />
                    <label>{option.value}</label>
                  </div>
                ))}
              {property?.context === "address" &&
                visibleAddressOptions.map((option, optionKey) => (
                  <div
                    key={optionKey}
                    className="d-flex w-100 align-items-center gap-20"
                  >
                    <input
                      style={{ width: "20px" }}
                      type="checkbox"
                      value={option.value}
                      checked={option.checked}
                      onChange={() => {
                        setVisibleAddressOptions((prevOptions) =>
                          prevOptions.map((opt) =>
                            opt.id === option.id
                              ? { ...opt, checked: !opt.checked }
                              : opt
                          )
                        );
                      }}
                    />
                    <label>{option.value}</label>
                  </div>
                ))}
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
              onChange={(e) => {
                const value = parseInt(e.target.value);
                handleStyleChange(id, key, parseInt(e.target.value));

                if (property?.label === "Lowest Rating Point") {
                  setMin(value);
                } else if (property?.label === "Highest Rating Point") {
                  setMax(value);
                } else if (property?.label === "Rating Amount") {
                  setMaxStar(value);
                }
              }}
            >
              {property?.context === "scale" && (
                <>
                  {Array.from({ length: max - min + 1 }, (_, index) => (
                    <option key={min + index} value={min + index}>
                      {min + index}
                    </option>
                  ))}
                </>
              )}
              {property?.context === "star" && (
                <>
                  {Array.from({ length: maxStar - minStar + 1 }, (_, index) => (
                    <option key={minStar + index} value={minStar + index}>
                      {minStar + index}
                    </option>
                  ))}
                </>
              )}

              {property?.context !== "scale" &&
                property?.context !== "star" &&
                options.map((option) => (
                  <option key={option} value={parseInt(option)}>
                    {option}
                  </option>
                ))}
            </select>
          ) : property?.type === "draggable-options" &&
            property?.designType === design ? (
            <div key={key} className="property" style={{ flex: 1 }}>
              {property?.field === "ranking" ? (
                <>
                  <DraggableOptions
                    options={property.option}
                    onOptionsChange={(newOptions) =>
                      handleOptionsChange(id, key, newOptions)
                    }
                  />
                </>
              ) : property?.field === "single-choice" ? (
                <>
                  <DraggableSingleChoice
                    options={property.option}
                    uniqueId="form1-options"
                    onOptionsChange={(newOptions) =>
                      handleOptionsChange(id, key, newOptions)
                    }
                  />
                </>
              ) : property?.field === "multiple-choice" ? (
                <>
                  <DraggableMultipleChoice
                    options={property.option}
                    onOptionsChange={(newOptions) =>
                      handleOptionsChange(id, key, newOptions)
                    }
                  />
                </>
              ) : property?.field === "picture-choice" ? (
                <>
                  <DraggablePictureChoice
                    options={property.option}
                    onOptionsChange={(newOptions) =>
                      handleOptionsChange(id, key, newOptions)
                    }
                  />
                </>
              ) : property?.field === "dropdown" ? (
                <>
                  <DraggableDropdown
                    options={property.option}
                    onOptionsChange={(newOptions) =>
                      handleOptionsChange(id, key, newOptions)
                    }
                  />

                  {}
                </>
              ) : property?.field === "matrix" ? (
                <>
                  {property.option && (
                    <DraggableMatrix
                      options={property.option}
                      type={property.matrix === "column" ? "column" : "row"}
                      onOptionsChange={(newOptions) =>
                        handleMatrixOptionsChange(newOptions, property.matrix)
                      }
                    />
                  )}
                </>
              ) : null}
            </div>
          ) : property.type === "radio" && property.designType === design ? (
            <>
              {property?.context === "single" ? (
                <div className="d-flex flex-column align-items-start gap-10">
                  {singleChoiceOptions?.map((option, key) => {
                    return (
                      <div
                        className="d-flex align-items-center gap-10 justify-content-start"
                        key={key}
                      >
                        <input
                          className="radio_btn"
                          name="radio"
                          type="radio"
                          value="radio"
                        />
                        <label htmlFor="">{option.defaultLabel}</label>
                      </div>
                    );
                  })}
                </div>
              ) : property?.context === "picture" ? (
                <div className="d-flex flex-column align-items-center gap-10">
                  {pictureChoiceOptions?.map((option, key) => {
                    return (
                      <div
                        key={key}
                        className="d-flex align-items-center gap-10"
                      >
                        <input
                          className="radio_btn"
                          type="radio"
                          value={option}
                        />
                        <label htmlFor="" className="text-nowrap">
                          {option.defaultLabel}
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          ) : property?.type === "checkbox" &&
            property.designType === design ? (
            <>
              {property?.context === "multiple" ? (
                <div className="d-flex flex-column gap-10 align-items-start">
                  {multipleChoiceOptions?.map((option, key) => {
                    return (
                      <div
                        className="w-100 d-flex align-items-center gap-10"
                        key={key}
                      >
                        <input
                          className="radio_btn"
                          type="checkbox"
                          value={option.id}
                        />
                        <label className="text-nowrap" htmlFor="">
                          {option.defaultLabel}
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {Object.values(property?.option).map((option, optionKey) => {
                    return (
                      <div className="d-flex align-items-center gap-10">
                        <input
                          type="checkbox"
                          className="single-choice-input checkbox"
                          id={`option-${optionKey}`}
                          onClick={() => setSingleChoice(option.defaultLabel)}
                        />
                        <label htmlFor="">{option.defaultLabel}</label>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : property?.type === "dropdown" &&
            property?.designType === design ? (
            <>
              {property?.context === "dropdown" ? (
                <>
                  <select className="dropdown_dropdown" name="dropdown" id="">
                    {dropdownOptions?.map((option, key) => {
                      return (
                        <>
                          <option value="">{option.defaultLabel}</option>
                        </>
                      );
                    })}
                  </select>
                </>
              ) : (
                <div
                  className="dropdown-input"
                  style={{ width: "100px", height: "30px" }}
                >
                  <select
                    name="dropdown-number"
                    id=""
                    style={{
                      width: "100px",
                      height: "30px",
                      outline: "none",
                      border: "1px solid #ccc",
                      padding: "0px 5px",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => handleStyleChange(id, key, e.target.value)}
                  >
                    {Object.values(property?.option).map(
                      (option, optionKey) => {
                        return (
                          <option
                            key={option.id}
                            value={parseInt(option.value)}
                          >
                            {option.value}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
              )}
            </>
          ) : property?.type === "dropdown-style" &&
            property?.designType === design ? (
            <div className="dropdown-input">
              <select
                className="dropdown-style"
                name="dropdown-style"
                id=""
                onChange={(e) => handleStyleChange(id, key, e.target.value)}
              >
                {Object.values(property?.option).map((option, optionKey) => {
                  {
                    return (
                      <option key={option.id} value={option?.styleType}>
                        {option.styleType === "modern" ? (
                          <div className="style">
                            <PiRowsBold />
                            <p>Standard</p>
                          </div>
                        ) : (
                          <div className="style">
                            <PiRowsBold />
                            <p>Modern</p>
                          </div>
                        )}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          ) : property?.type === "add-button" &&
            property?.designType === design ? (
            <>
              {uploadedImage === null ? (
                <button className="btn_" onClick={handleOpenModal}>
                  {property?.value}
                </button>
              ) : (
                <div className="d-flex align-items-center gap-10">
                  <button className="btn_" onClick={handleOpenModal}>
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="btn_"
                    onClick={() => setUploadedImage(null)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              )}
              <ImageUploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onImageUpload={handleImageUpload}
              />
            </>
          ) : property?.type === "alignment" ? (
            <div className="alignment-div">
              <button onClick={() => handleStyleChange(id, key, "left")}>
                <PiAlignLeftBold />
                &nbsp;Left
              </button>
              <button onClick={() => handleStyleChange(id, key, "center")}>
                <PiAlignCenterHorizontalBold /> Center
              </button>
              <button onClick={() => handleStyleChange(id, key, "right")}>
                <PiAlignRightBold />
                &nbsp;Right
              </button>
            </div>
          ) : property?.type === "cal-textarea" &&
            property?.designType === design ? (
            <div>
              {Object.keys(property?.buttonList).map((btn, key) => {
                return (
                  <button
                    className="cal-btn"
                    onClick={() =>
                      addOperator(
                        property?.buttonList[key]?.id,
                        "Formula",
                        property?.buttonList[key]?.label
                      )
                    }
                  >
                    {property?.buttonList[key]?.label}
                  </button>
                );
              })}
              <textarea
                className="input-textarea mt-2 mb-2"
                cols="33"
                rows="5"
                defaultValue={property.defaultValue}
                value={textAreaValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setTextAreaValue(newValue);
                  handleStyleChange(id, key, newValue);
                }}
              ></textarea>
            </div>
          ) : null}
        </div>
      );
    });

    const generateOptions = () => {
      let actualMin = min === undefined ? 0 : min;
      let actualMax = max === undefined ? 10 : max;
      const optionsArray = [];
      for (let i = actualMin; i <= actualMax; i++) {
        optionsArray.push(i);
      }
      return optionsArray;
    };
  };

  return (
    <listState>
      <Layout className="home-layout">
        <div
          className={`home-container ${
            formId.length !== 0 && "result-container"
          }`}
        >
          <DynamicForm
            items={items}
            setTheProperties={setTheProperties}
            mainId={mainId}
            visibleArray={visibleArray}
            rankings={rankings}
            singleChoice={singleChoice}
            uploadedImage={uploadedImage}
            submitButtonStyle={submitButtonStyle}
            handleSubmitButton={handleSubmitButton}
            calculation={textAreaValue}
          />

          <div
            className={`side-settings ${
              formId.length === 0 ? "" : "display-none"
            }`}
            style={{ width: "max-content" }}
          >
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
              {mainType === "button" && renderProperties(buttonProperties, 0)}
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
              {mainType === "single-choice" &&
                renderProperties(singleChoiceProperties, mainId)}
              {mainType === "multiple-choice" &&
                renderProperties(multipleChoiceProperties, mainId)}
              {mainType === "picture-choice" &&
                renderProperties(pictureChoiceProperties, mainId)}
              {mainType === "dropdown" &&
                renderProperties(dropdownProperties, mainId)}
              {mainType === "matrix" &&
                renderProperties(matrixProperties, mainId)}
              {mainType === "image" &&
                renderProperties(imageProperties, mainId)}
              {mainType === "video" &&
                renderProperties(videoProperties, mainId)}
              {mainType === "audio" &&
                renderProperties(audioProperties, mainId)}
              {mainType === "generic" &&
                renderProperties(genericProperties, mainId)}
              {mainType === "recaptcha" &&
                renderProperties(recaptchaProperties, mainId)}
              {mainType === "turnstile" &&
                renderProperties(turnstileProperties, mainId)}
              {mainType === "signature" &&
                renderProperties(signProperties, mainId)}
              {mainType === "location" &&
                renderProperties(locationProperties, mainId)}
              {mainType === "file_upload" &&
                renderProperties(fileUploadProperties, mainId)}
              {mainType === "calculation" &&
                renderProperties(calculationProperties, mainId)}
              {mainType === "spacer" &&
                renderProperties(spacerProperties, mainId)}
            </div>
          </div>
        </div>
      </Layout>
    </listState>
  );
};

export default Home1;
