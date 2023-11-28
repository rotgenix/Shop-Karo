import React from "react";
import notFound from "../../Images/notFound.jpg";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="order-confirm">
        <img src={notFound} alt="" />
        <button className="order-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
