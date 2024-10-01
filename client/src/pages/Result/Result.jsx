import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { useCalculation } from "../../context/CalculationContext";
import "./result.css";

const Result = () => {
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
    <div className="result-container d-flex position-relative">
      <div
        className="position-absolute"
        style={{ bottom: "20px", left: "40px" }}
      >
        <button className="made-btn">
          <img src="./logo.png" alt="FORMER_LOGO" width="30px" />
          Made with Former
        </button>
      </div>
      <DynamicForm
        items={form.components}
        calculationResult={calculationResult}
      />{" "}
    </div>
  );
};

export default Result;
