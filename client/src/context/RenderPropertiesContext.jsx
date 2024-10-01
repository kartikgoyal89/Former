import React, { createContext, useContext, useState } from "react";

const RenderPropertiesContext = createContext();

export const RenderPropertiesProvider = ({ children }) => {
  const [design, setDesign] = useState("general");
  const [activeTab, setActiveTab] = useState("general");
  const [slide, setSlide] = useState("hide");
  const [visibleNameOptions, setVisibleNameOptions] = useState([]);
  const [visibleAddressOptions, setVisibleAddressOptions] = useState([]);
  const [slideColor, setSlideColor] = useState("#ffffff");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStyleChange = (id, key, value) => {
    // Your style change logic here
  };

  const handleOptionsChange = (id, key, newOptions) => {
    // Your options change logic here
  };

  const handleMatrixOptionsChange = (newOptions, matrix) => {
    // Your matrix options change logic here
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleImageUpload = (image) => setUploadedImage(image);

  return (
    <RenderPropertiesContext.Provider
      value={{
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
      }}
    >
      {children}
    </RenderPropertiesContext.Provider>
  );
};

export const useRenderPropertiesContext = () =>
  useContext(RenderPropertiesContext);
