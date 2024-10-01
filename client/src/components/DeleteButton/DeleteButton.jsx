import React, { useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useItems } from "../../context/itemContext";
import "./Delete.css";

const deleteButton = ({ id }) => {
  const { items, setItems } = useItems();

  const options = JSON.parse(localStorage.getItem("items"));

  useEffect(() => {
    console.log(items);
  }, [items]);

  const handleDelete = () => {
    options?.forEach((item) => {
      if (item?.id === id) {
        console.log("option:", item);
      }
    });
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      console.log("Updated items:", updatedItems); // Log the updated items
      return updatedItems;
    });
  };

  return (
    <div className="delete_">
      <RiDeleteBin5Line onClick={handleDelete} />
    </div>
  );
};

export default deleteButton;
