// import React, { createContext, useState, useContext } from "react";

// const MatrixContext = createContext();

// export const MatrixProvider = ({ children }) => {
//   const [rows, setRows] = useState([{ id: "row-1", defaultLabel: "Row 1" }]);
//   const [columns, setColumns] = useState([
//     { id: "col-1", defaultLabel: "Column 1" },
//     { id: "col-2", defaultLabel: "Column 2" },
//   ]);

//   const addRow = (label) => {
//     const newRow = {
//       id: `row-${rows.length + 1}`,
//       defaultLabel: label,
//     };
//     setRows((prevRows) => [...prevRows, newRow]);
//   };

//   const addColumn = (label) => {
//     const newColumn = {
//       id: `col-${columns.length + 1}`,
//       defaultLabel: label,
//     };
//     setColumns((prevColumns) => [...prevColumns, newColumn]);
//   };

//   const updateRow = (id, newLabel) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, defaultLabel: newLabel } : row
//       )
//     );
//   };

//   const updateColumn = (id, newLabel) => {
//     setColumns((prevColumns) =>
//       prevColumns.map((column) =>
//         column.id === id ? { ...column, defaultLabel: newLabel } : column
//       )
//     );
//   };

//   return (
//     <MatrixContext.Provider
//       value={{
//         rows,
//         columns,
//         addRow,
//         addColumn,
//         updateRow,
//         updateColumn,
//       }}
//     >
//       {children}
//     </MatrixContext.Provider>
//   );
// };

// export const useMatrix = () => useContext(MatrixContext);

// import React, { createContext, useState, useEffect, useContext } from "react";

// const MatrixContext = createContext();

// const loadStateFromLocalStorage = (key, defaultState) => {
//   const savedState = localStorage.getItem(key);
//   return savedState ? JSON.parse(savedState) : defaultState;
// };

// const saveStateToLocalStorage = (key, state) => {
//   localStorage.setItem(key, JSON.stringify(state));
// };

// export const MatrixProvider = ({ children }) => {
//   const [rows, setRows] = useState(() =>
//     loadStateFromLocalStorage("rows", [{ id: "row-1", defaultLabel: "Row 1" }])
//   );
//   const [columns, setColumns] = useState(() =>
//     loadStateFromLocalStorage("columns", [
//       { id: "col-1", defaultLabel: "Column 1" },
//       { id: "col-2", defaultLabel: "Column 2" },
//     ])
//   );

//   useEffect(() => {
//     console.log(rows);
//   }, [rows]);

//   useEffect(() => {
//     console.log(columns);
//   }, [columns]);

//   useEffect(() => {
//     saveStateToLocalStorage("rows", rows);
//   }, [rows]);

//   useEffect(() => {
//     saveStateToLocalStorage("columns", columns);
//   }, [columns]);

//   const addRow = (label) => {
//     const newRow = {
//       id: `row-${rows.length + 1}`,
//       defaultLabel: label,
//     };
//     setRows((prevRows) => [...prevRows, newRow]);
//   };

//   const addColumn = (label) => {
//     const newColumn = {
//       id: `col-${columns.length + 1}`,
//       defaultLabel: label,
//     };
//     setColumns((prevColumns) => [...prevColumns, newColumn]);
//   };

//   const updateRow = (id, newLabel) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, defaultLabel: newLabel } : row
//       )
//     );
//   };

//   const updateColumn = (id, newLabel) => {
//     setColumns((prevColumns) =>
//       prevColumns.map((column) =>
//         column.id === id ? { ...column, defaultLabel: newLabel } : column
//       )
//     );
//   };

//   return (
//     <MatrixContext.Provider
//       value={{
//         rows,
//         columns,
//         addRow,
//         addColumn,
//         updateRow,
//         updateColumn,
//       }}
//     >
//       {children}
//     </MatrixContext.Provider>
//   );
// };

// export const useMatrix = () => useContext(MatrixContext);

/*

import React, { createContext, useState, useEffect, useContext } from "react";

const MatrixContext = createContext();

const loadStateFromLocalStorage = (key, defaultState) => {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : defaultState;
};

const saveStateToLocalStorage = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const MatrixProvider = ({ children }) => {
  const [rows, setRows] = useState(() =>
    loadStateFromLocalStorage("rows", [{ id: "row-1", defaultLabel: "Row 1" }])
  );
  const [columns, setColumns] = useState(() =>
    loadStateFromLocalStorage("columns", [
      { id: "col-1", defaultLabel: "Column 1" },
      { id: "col-2", defaultLabel: "Column 2" },
    ])
  );

  useEffect(() => {
    saveStateToLocalStorage("rows", rows);
  }, [rows]);

  useEffect(() => {
    saveStateToLocalStorage("columns", columns);
  }, [columns]);

  const addRow = (label) => {
    const newRow = {
      id: `row-${rows.length + 1}`,
      defaultLabel: label,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const addColumn = (label) => {
    const newColumn = {
      id: `col-${columns.length + 1}`,
      defaultLabel: label,
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const updateRow = (id, newLabel) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, defaultLabel: newLabel } : row
      )
    );
  };

  const updateColumn = (id, newLabel) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, defaultLabel: newLabel } : column
      )
    );
  };

  const updateRowOrder = (newOrder) => {
    setRows(newOrder);
  };

  const updateColumnOrder = (newOrder) => {
    setColumns(newOrder);
  };

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  useEffect(() => {
    console.log(columns);
  }, [columns]);

  return (
    <MatrixContext.Provider
      value={{
        rows,
        columns,
        addRow,
        addColumn,
        updateRow,
        updateColumn,
        updateRowOrder,
        updateColumnOrder,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => useContext(MatrixContext);
*/

import React, { createContext, useState, useEffect, useContext } from "react";

const MatrixContext = createContext();

const loadStateFromLocalStorage = (key, defaultState) => {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : defaultState;
};

const saveStateToLocalStorage = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const MatrixProvider = ({ children }) => {
  const [rows, setRows] = useState(() =>
    loadStateFromLocalStorage("rows", [{ id: "row-1", defaultLabel: "Row 1" }])
  );
  const [columns, setColumns] = useState(() =>
    loadStateFromLocalStorage("columns", [
      { id: "col-1", defaultLabel: "Column 1" },
      { id: "col-2", defaultLabel: "Column 2" },
    ])
  );

  useEffect(() => {
    saveStateToLocalStorage("rows", rows);
  }, [rows]);

  useEffect(() => {
    saveStateToLocalStorage("columns", columns);
  }, [columns]);

  const addRow = (label) => {
    const newRow = {
      id: `row-${rows.length + 1}`,
      defaultLabel: label,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const addColumn = (label) => {
    const newColumn = {
      id: `col-${columns.length + 1}`,
      defaultLabel: label,
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const updateRow = (id, newLabel) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, defaultLabel: newLabel } : row
      )
    );
  };

  const updateColumn = (id, newLabel) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, defaultLabel: newLabel } : column
      )
    );
  };

  const updateRowOrder = (newOrder) => {
    setRows(newOrder);
  };

  const updateColumnOrder = (newOrder) => {
    setColumns(newOrder);
  };

  return (
    <MatrixContext.Provider
      value={{
        rows,
        columns,
        addRow,
        addColumn,
        updateRow,
        updateColumn,
        updateRowOrder,
        updateColumnOrder,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => useContext(MatrixContext);
