import React from "react";
import "./success.css";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="order-confirm">
      <img
        src={
          "https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-1486.jpg?w=740&t=st=1699353741~exp=1699354341~hmac=d2f612f25364adf8e6b36b2ee48caba2db3f4a56643f74e78d390b0bc9f97dff"
        }
        alt=""
      />
      <button className="order-btn" onClick={() => navigate("/orders")}>
        Orders
      </button>
    </div>
  );
};

export default Success;
