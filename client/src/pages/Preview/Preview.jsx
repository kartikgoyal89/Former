import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { useCalculation } from "../../context/CalculationContext";
import { FaDesktop } from "react-icons/fa";
import { FaTabletAlt } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import "./Preview.css";

const Preview = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const publishUrl = `http://localhost:5000/assets/${formId}.json`;

  const { calculationResult } = useCalculation();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(publishUrl);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [publishUrl]);

  useEffect(() => {
    console.log(calculationResult);
  }, [calculationResult]);

  if (!form) return <div>Loading...</div>;
  return (
    <>
      <div className="header">
        <div className="devices">
          <button className="device">
            <FaDesktop />
            &nbsp;&nbsp;Desktop
          </button>
          <button className="device">
            <FaTabletAlt />
            &nbsp;&nbsp; Tablet
          </button>
          <button className="device">
            <FaTabletAlt />
            &nbsp;&nbsp; Mobile
          </button>
        </div>
      </div>
    </>
  );
};

export default Preview;
