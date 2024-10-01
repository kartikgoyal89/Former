import React, { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxCrossCircled } from "react-icons/rx";
import { usePictureChoice } from "./PictureChoiceContext";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";

const defaultImagePath = "./picture.svg";

const DraggablePictureChoice = () => {
  const { pictureChoiceOptions, updateOptions, addOption } = usePictureChoice();
  const [internalOptions, setInternalOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [inputStyle, setInputStyle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOptionId, setCurrentOptionId] = useState(null);

  useEffect(() => {
    setInternalOptions(pictureChoiceOptions);
  }, [pictureChoiceOptions]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = internalOptions.findIndex(
        (option) => option.id === active.id
      );
      const newIndex = internalOptions.findIndex(
        (option) => option.id === over.id
      );

      const newOptions = arrayMove(internalOptions, oldIndex, newIndex);
      setInternalOptions(newOptions);
      updateOptions(newOptions); // Update the context
    }
  };

  const handleDelete = (id) => {
    const newOptions = internalOptions.filter((option) => option.id !== id);
    setInternalOptions(newOptions);
    updateOptions(newOptions); // Update the context
  };

  const handleAddOption = () => {
    addOption(`Choice ${internalOptions.length + 1}`);
  };

  const handleLabelClick = (option, event) => {
    setEditingId(option.id);
    setInputValue(option.defaultLabel);

    const element = event.target.closest(".draggable-option");
    const { top, left, width, height } = element.getBoundingClientRect();

    setInputStyle({
      position: "absolute",
      top: element.offsetTop,
      left: element.offsetLeft,
      width,
      height,
      padding: "0px",
      paddingLeft: "5px",
      marginLeft: "20px",
      zIndex: 1000,
    });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (editingId) {
      const newOptions = internalOptions.map((option) =>
        option.id === editingId
          ? { ...option, defaultLabel: inputValue }
          : option
      );
      setInternalOptions(newOptions);
      updateOptions(newOptions); // Update the context
      setEditingId(null);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleImageChange = (optionId, image) => {
    const newOptions = internalOptions.map((option) =>
      option.id === optionId ? { ...option, defaultImg: image } : option
    );
    setInternalOptions(newOptions);
    updateOptions(newOptions); // Update the context
  };

  const handleImageClick = (optionId) => {
    setCurrentOptionId(optionId);
    setIsModalOpen(true);
  };

  const handleRemoveImage = (optionId) => {
    const newOptions = internalOptions.map((option) =>
      option.id === optionId
        ? { ...option, defaultImg: defaultImagePath }
        : option
    );
    setInternalOptions(newOptions);
    updateOptions(newOptions); // Update the context
  };

  const handleDrop = (acceptedFiles) => {
    if (currentOptionId && acceptedFiles.length > 0) {
      const newOptions = internalOptions.map((option) =>
        option.id === currentOptionId
          ? { ...option, defaultImg: URL.createObjectURL(acceptedFiles[0]) }
          : option
      );
      setInternalOptions(newOptions);
      updateOptions(newOptions); // Update the context
      setIsModalOpen(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div style={{ position: "relative" }}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={internalOptions}
          strategy={verticalListSortingStrategy}
        >
          {internalOptions.map((option) => (
            <SortableItem
              key={option.id}
              option={option}
              onDelete={handleDelete}
              onLabelClick={(event) => handleLabelClick(option, event)}
              onImageClick={() => handleImageClick(option.id)}
              onImageChange={(image) => handleImageChange(option.id, image)} // Pass function to update image
              onRemoveImage={() => handleRemoveImage(option.id)} // Pass function to remove image
            />
          ))}
        </SortableContext>
      </DndContext>
      {editingId && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          style={inputStyle}
        />
      )}
      <button className="add-option mt-3" onClick={handleAddOption}>
        Add Option
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Media Gallery"
      >
        <h2>Media Gallery</h2>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop an image here, or click to select one</p>
        </div>
      </Modal>
    </div>
  );
};

const SortableItem = ({
  option,
  onDelete,
  onLabelClick,
  onImageClick,
  onImageChange,
  onRemoveImage,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
  };

  const handleImageChangeLocal = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result); // Call parent component function to update image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="draggable-option d-flex align-items-center gap-10"
    >
      <img
        src={option.defaultImg || defaultImagePath}
        alt="img"
        width="20px"
        height="20px"
        onClick={onImageClick}
        style={{ cursor: "pointer" }}
      />
      <span onClick={onLabelClick}>{option.defaultLabel}</span>
      {option.defaultImg && option.defaultImg !== defaultImagePath && (
        <div onClick={onRemoveImage} style={{ cursor: "pointer" }}>
          <img src="./remove.svg" alt="Remove" />
        </div>
      )}
      <div className="cross" onClick={() => onDelete(option.id)}>
        <RxCrossCircled className="icon" />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChangeLocal}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default DraggablePictureChoice;
