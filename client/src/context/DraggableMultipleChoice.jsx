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
import { useMultipleChoice } from "./MultipleChoiceContext";

const DraggableMultipleChoice = () => {
  const { multipleChoiceOptions, updateOptions, addOption } =
    useMultipleChoice();
  const [internalOptions, setInternalOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    setInternalOptions(multipleChoiceOptions);
  }, [multipleChoiceOptions]);

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
    </div>
  );
};

const SortableItem = ({ option, onDelete, onLabelClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="draggable-option d-flex align-items-center gap-10"
    >
      <span onClick={onLabelClick}>{option.defaultLabel}</span>
      <div className="cross" onClick={() => onDelete(option.id)}>
        <RxCrossCircled className="icon" />
      </div>
    </div>
  );
};

export default DraggableMultipleChoice;
