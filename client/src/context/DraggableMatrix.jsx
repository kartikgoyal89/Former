// import React, { useState, useEffect, useRef } from "react";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { RxCrossCircled } from "react-icons/rx";
// import { useMatrix } from "./matrixContext";

// const DraggableMatrix = ({ options, type, onOptionsChange }) => {
//   const { rows, columns, addRow, addColumn, updateRow, updateColumn } =
//     useMatrix();
//   const [internalOptions, setInternalOptions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const inputRef = useRef(null);
//   const [inputStyle, setInputStyle] = useState({});

//   useEffect(() => {
//     setInternalOptions(options);
//   }, [options]);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active?.id && over?.id && active.id !== over.id) {
//       const oldIndex = internalOptions.findIndex(
//         (option) => option.id === active.id
//       );
//       const newIndex = internalOptions.findIndex(
//         (option) => option.id === over.id
//       );

//       const newOptions = arrayMove(internalOptions, oldIndex, newIndex);
//       setInternalOptions(newOptions);
//       onOptionsChange(newOptions);
//     }
//   };

//   const handleDelete = (id) => {
//     const newOptions = internalOptions.filter((option) => option.id !== id);
//     setInternalOptions(newOptions);
//     onOptionsChange(newOptions);
//   };

//   const handleLabelClick = (option, event) => {
//     setEditingId(option.id);
//     setInputValue(option.defaultLabel);

//     const element = event.target.closest(".draggable-option");
//     const { top, left, width, height } = element.getBoundingClientRect();

//     setInputStyle({
//       position: "absolute",
//       top: element.offsetTop,
//       left: element.offsetLeft,
//       width,
//       height,
//       padding: "0px",
//       paddingLeft: "5px",
//       zIndex: 1000,
//     });

//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 0);
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputBlur = () => {
//     if (editingId) {
//       const newOptions = internalOptions.map((option) =>
//         option.id === editingId
//           ? { ...option, defaultLabel: inputValue }
//           : option
//       );
//       setInternalOptions(newOptions);

//       if (type === "row") {
//         updateRow(editingId, inputValue); // Update the row in context
//       } else if (type === "column") {
//         updateColumn(editingId, inputValue); // Update the column in context
//       }

//       onOptionsChange(newOptions);
//       setEditingId(null);
//     }
//   };

//   const handleInputKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleInputBlur();
//     }
//   };

//   const handleAddRow = () => {
//     addRow(`Row ${rows.length + 1}`);
//     const newRow = {
//       id: `row-${rows.length + 1}`,
//       defaultLabel: `Row ${rows.length + 1}`,
//     };
//     const newOptions = [...internalOptions, newRow];
//     setInternalOptions(newOptions);
//     onOptionsChange(newOptions);
//   };

//   const handleAddColumn = () => {
//     addColumn(`Column ${columns.length + 1}`);
//     const newColumn = {
//       id: `col-${columns.length + 1}`,
//       defaultLabel: `Column ${columns.length + 1}`,
//     };
//     const newOptions = [...internalOptions, newColumn];
//     setInternalOptions(newOptions);
//     onOptionsChange(newOptions);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext
//           items={internalOptions.map((option) => option.id)} // Ensure unique item ids
//           strategy={verticalListSortingStrategy}
//         >
//           {internalOptions.map((option) => (
//             <SortableItem
//               key={option.id} // Ensure each key is unique
//               option={option}
//               onDelete={handleDelete}
//               onLabelClick={(event) => handleLabelClick(option, event)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>
//       {editingId && (
//         <input
//           ref={inputRef}
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           onBlur={handleInputBlur}
//           onKeyDown={handleInputKeyDown}
//           style={inputStyle}
//         />
//       )}
//       {type === "row" && (
//         <button className="add-option mt-3" onClick={handleAddRow}>
//           Add Row
//         </button>
//       )}
//       {type === "column" && (
//         <button className="add-option mt-3" onClick={handleAddColumn}>
//           Add Column
//         </button>
//       )}
//     </div>
//   );
// };

// const SortableItem = ({ option, onDelete, onLabelClick }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: option.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     position: "relative",
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="draggable-option d-flex align-items-center gap-10"
//     >
//       <span onClick={onLabelClick}>{option.defaultLabel}</span>
//       <div className="cross" onClick={() => onDelete(option.id)}>
//         <RxCrossCircled className="icon" />
//       </div>
//     </div>
//   );
// };

// export default DraggableMatrix;

// import React, { useState, useEffect, useRef } from "react";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { RxCrossCircled } from "react-icons/rx";
// import { useMatrix } from "./matrixContext";

// const DraggableMatrix = ({ options, type, onOptionsChange }) => {
//   const { rows, columns, addRow, addColumn, updateRow, updateColumn } =
//     useMatrix();
//   const [internalOptions, setInternalOptions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const inputRef = useRef(null);
//   const [inputStyle, setInputStyle] = useState({});

//   useEffect(() => {
//     setInternalOptions(options);
//   }, [options]);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active?.id && over?.id && active.id !== over.id) {
//       const oldIndex = internalOptions.findIndex(
//         (option) => option.id === active.id
//       );
//       const newIndex = internalOptions.findIndex(
//         (option) => option.id === over.id
//       );

//       const newOptions = arrayMove(internalOptions, oldIndex, newIndex);
//       setInternalOptions(newOptions);
//       onOptionsChange(newOptions);
//     }
//   };

//   const handleDelete = (id) => {
//     const newOptions = internalOptions.filter((option) => option.id !== id);
//     setInternalOptions(newOptions);
//     onOptionsChange(newOptions);
//   };

//   const handleLabelClick = (option, event) => {
//     setEditingId(option.id);
//     setInputValue(option.defaultLabel);

//     const element = event.target.closest(".draggable-option");
//     const { top, left, width, height } = element.getBoundingClientRect();

//     setInputStyle({
//       position: "absolute",
//       top: element.offsetTop,
//       left: element.offsetLeft,
//       width,
//       height,
//       padding: "0px",
//       paddingLeft: "5px",
//       zIndex: 1000,
//     });

//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 0);
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputBlur = () => {
//     if (editingId) {
//       const newOptions = internalOptions.map((option) =>
//         option.id === editingId
//           ? { ...option, defaultLabel: inputValue }
//           : option
//       );
//       setInternalOptions(newOptions);

//       if (type === "row") {
//         updateRow(editingId, inputValue); // Update the row in context
//       } else if (type === "column") {
//         updateColumn(editingId, inputValue); // Update the column in context
//       }

//       onOptionsChange(newOptions);
//       setEditingId(null);
//     }
//   };

//   const handleInputKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleInputBlur();
//     }
//   };

//   const handleAddRow = () => {
//     const newLabel = `Row ${rows.length + 1}`;
//     addRow(newLabel);
//     const newRow = {
//       id: `row-${rows.length + 1}`,
//       defaultLabel: newLabel,
//     };
//     const newOptions = [...internalOptions, newRow];
//     setInternalOptions(newOptions);
//     onOptionsChange(newOptions);
//   };

//   const handleAddColumn = () => {
//     const newLabel = `Column ${columns.length + 1}`;
//     addColumn(newLabel);
//     const newColumn = {
//       id: `col-${columns.length + 1}`,
//       defaultLabel: newLabel,
//     };
//     const newOptions = [...internalOptions, newColumn];
//     setInternalOptions(newOptions);
//     onOptionsChange(newOptions);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext
//           items={internalOptions.map((option) => option.id)} // Ensure unique item ids
//           strategy={verticalListSortingStrategy}
//         >
//           {internalOptions.map((option) => (
//             <SortableItem
//               key={option.id} // Ensure each key is unique
//               option={option}
//               onDelete={handleDelete}
//               onLabelClick={(event) => handleLabelClick(option, event)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>
//       {editingId && (
//         <input
//           ref={inputRef}
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           onBlur={handleInputBlur}
//           onKeyDown={handleInputKeyDown}
//           style={inputStyle}
//         />
//       )}
//       {type === "row" && (
//         <button className="add-option mt-3" onClick={handleAddRow}>
//           Add Row
//         </button>
//       )}
//       {type === "column" && (
//         <button className="add-option mt-3" onClick={handleAddColumn}>
//           Add Column
//         </button>
//       )}
//     </div>
//   );
// };

// const SortableItem = ({ option, onDelete, onLabelClick }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: option.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     position: "relative",
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="draggable-option d-flex align-items-center gap-10"
//     >
//       <span onClick={onLabelClick}>{option.defaultLabel}</span>
//       <div className="cross" onClick={() => onDelete(option.id)}>
//         <RxCrossCircled className="icon" />
//       </div>
//     </div>
//   );
// };

// export default DraggableMatrix;

/*
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
import { useMatrix } from "./matrixContext";

const DraggableMatrix = ({ options, type, onOptionsChange }) => {
  const {
    rows,
    columns,
    addRow,
    addColumn,
    updateRow,
    updateColumn,
    updateRowOrder,
    updateColumnOrder,
  } = useMatrix();
  const [internalOptions, setInternalOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    setInternalOptions(options);
  }, [options]);

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
      onOptionsChange(newOptions);

      if (type === "row") {
        updateRowOrder(newOptions); // Update the row order in context
      } else if (type === "column") {
        updateColumnOrder(newOptions); // Update the column order in context
      }
    }
  };

  const handleDelete = (id) => {
    const newOptions = internalOptions.filter((option) => option.id !== id);
    setInternalOptions(newOptions);
    onOptionsChange(newOptions);
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

      if (type === "row") {
        updateRow(editingId, inputValue); // Update the row in context
      } else if (type === "column") {
        updateColumn(editingId, inputValue); // Update the column in context
      }

      onOptionsChange(newOptions);
      setEditingId(null);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleAddRow = () => {
    const newLabel = `Row ${rows.length + 1}`;
    addRow(newLabel);
    const newRow = {
      id: `row-${rows.length + 1}`,
      defaultLabel: newLabel,
    };
    const newOptions = [...internalOptions, newRow];
    setInternalOptions(newOptions);
    onOptionsChange(newOptions);
  };

  const handleAddColumn = () => {
    const newLabel = `Column ${columns.length + 1}`;
    addColumn(newLabel);
    const newColumn = {
      id: `col-${columns.length + 1}`,
      defaultLabel: newLabel,
    };
    const newOptions = [...internalOptions, newColumn];
    setInternalOptions(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <div style={{ position: "relative" }}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={internalOptions.map((option) => option.id)} // Ensure unique item ids
          strategy={verticalListSortingStrategy}
        >
          {internalOptions.map((option) => (
            <SortableItem
              key={option.id} // Ensure each key is unique
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
      {type === "row" && (
        <button className="add-option mt-3" onClick={handleAddRow}>
          Add Row
        </button>
      )}
      {type === "column" && (
        <button className="add-option mt-3" onClick={handleAddColumn}>
          Add Column
        </button>
      )}
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

export default DraggableMatrix;
*/

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
import { useMatrix } from "./matrixContext";

const DraggableMatrix = ({ type }) => {
  const {
    rows,
    columns,
    addRow,
    addColumn,
    updateRow,
    updateColumn,
    updateRowOrder,
    updateColumnOrder,
  } = useMatrix();
  const [internalOptions, setInternalOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    if (type === "row") {
      setInternalOptions(rows);
    } else if (type === "column") {
      setInternalOptions(columns);
    }
  }, [rows, columns, type]);

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

      if (type === "row") {
        updateRowOrder(newOptions); // Update the row order in context
      } else if (type === "column") {
        updateColumnOrder(newOptions); // Update the column order in context
      }
    }
  };

  const handleDelete = (id) => {
    const newOptions = internalOptions.filter((option) => option.id !== id);
    setInternalOptions(newOptions);

    if (type === "row") {
      updateRowOrder(newOptions); // Update the row order in context
    } else if (type === "column") {
      updateColumnOrder(newOptions); // Update the column order in context
    }
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

      if (type === "row") {
        updateRow(editingId, inputValue); // Update the row in context
      } else if (type === "column") {
        updateColumn(editingId, inputValue); // Update the column in context
      }

      setEditingId(null);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleAddRow = () => {
    const newLabel = `Row ${rows.length + 1}`;
    addRow(newLabel);
  };

  const handleAddColumn = () => {
    const newLabel = `Column ${columns.length + 1}`;
    addColumn(newLabel);
  };

  return (
    <div style={{ position: "relative" }}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={internalOptions.map((option) => option.id)} // Ensure unique item ids
          strategy={verticalListSortingStrategy}
        >
          {internalOptions.map((option) => (
            <SortableItem
              key={option.id} // Ensure each key is unique
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
      {type === "row" && (
        <button className="add-option mt-3" onClick={handleAddRow}>
          Add Row
        </button>
      )}
      {type === "column" && (
        <button className="add-option mt-3" onClick={handleAddColumn}>
          Add Column
        </button>
      )}
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

export default DraggableMatrix;
