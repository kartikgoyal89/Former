import React from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useRenderPropertiesContext } from "../../context/RenderPropertiesContext";
import DraggableOptions from "../../context/DraggableOptions"; // Adjust the import paths
import DraggableSingleChoice from "../../context/DraggableSingleChoice";
import DraggableMultipleChoice from "../../context/DraggableMultipleChoice";
import DraggablePictureChoice from "../../context/DraggablePictureChoice";
import DraggableDropdown from "../../context/DraggableDropdown";
import DraggableMatrix from "../../context/DraggableMatrix";
import ImageUploadModal from "../../components/ImageUpload/ImageUploadModal";

const renderProperties = (properties, id, items, iconComponents) => {
  const {
    design,
    setDesign,
    activeTab,
    setActiveTab,
    slide,
    setSlide,
    visibleNameOptions,
    setVisibleNameOptions,
    visibleAddressOptions,
    setVisibleAddressOptions,
    slideColor,
    setSlideColor,
    uploadedImage,
    setUploadedImage,
    isModalOpen,
    setIsModalOpen,
    handleStyleChange,
    handleOptionsChange,
    handleMatrixOptionsChange,
    handleOpenModal,
    handleCloseModal,
    handleImageUpload,
  } = useRenderPropertiesContext();

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
                <div className="icon">{IconComponent && <IconComponent />}</div>
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
            properties[Object.keys(properties)[index + 1]].type === "none" && (
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
                      className={`${property.isHeading ? "heading-label" : ""}`}
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
            : property?.designType === design || property?.designType === "head"
            ? {}
            : { display: "none" }
        }
      >
        <div
          className={`${property.isHeading ? "element-heading" : "element"}`}
        >
          <div
            className={`${
              property?.isHeading ? "w-100 d-flex justify-content-between" : ""
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
            className={`${
              property?.column === "column"
                ? "w-100 m-0"
                : "btn m-0 d-flex align-items-center gap-1 justify-content-center"
            } ${property?.style ? "m-0 p-0" : ""}`}
            onClick={() => handleOptionsChange(id, key, options)}
            style={{ background: element?.style?.[key] }}
          >
            {element?.style?.[key] || property.defaultValue}
          </button>
        ) : property.type === "color" && property?.designType === design ? (
          <input
            type="color"
            className={`${property?.column === "column" ? "w-100" : ""}`}
            defaultValue={
              element?.style?.[key]
                ? element?.style?.[key]
                : property.defaultValue
            }
            onChange={(e) => {
              setSlideColor(e.target.value);
              handleStyleChange(id, key, e.target.value);
            }}
          />
        ) : property.type === "toggle" && property?.designType === design ? (
          <label className="toggle-switch">
            <input
              type="checkbox"
              defaultChecked={element?.style?.[key] === "true"}
              onChange={(e) => {
                const newValue = e.target.checked ? "true" : "false";
                handleStyleChange(id, key, newValue);
              }}
            />
            <span className="slider round"></span>
          </label>
        ) : property.type === "dropdown" && property?.designType === design ? (
          <DraggableDropdown
            key={key}
            id={id}
            element={element}
            property={property}
            handleOptionsChange={handleOptionsChange}
            handleMatrixOptionsChange={handleMatrixOptionsChange}
            options={options}
          />
        ) : property.type === "matrix" && property?.designType === design ? (
          <DraggableMatrix
            key={key}
            id={id}
            element={element}
            property={property}
            handleMatrixOptionsChange={handleMatrixOptionsChange}
          />
        ) : property.type === "rating" && property?.designType === design ? (
          <input
            type="number"
            className="w-100"
            max={highestRating}
            min={lowestRating}
            defaultValue={
              parseInt(element?.style?.[key]) === undefined
                ? parseInt(element?.style?.[key])
                : property.defaultValue
            }
            onChange={(e) => handleStyleChange(id, key, e.target.value)}
          />
        ) : property.type === "icon" && property?.designType === design ? (
          <div className="icon-selector">
            <MdOutlineEdit
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
            <ImageUploadModal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
            />
            <AiOutlineDelete onClick={() => handleStyleChange(id, key, null)} />
          </div>
        ) : property.type === "heading" && property?.designType === design ? (
          <input
            type="text"
            className="w-100"
            defaultValue={element?.style?.[key]}
            onChange={(e) => handleStyleChange(id, key, e.target.value)}
          />
        ) : null}
      </div>
    );
  });
};

export default renderProperties;
