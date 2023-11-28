import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      alert.error("Please Login To See Orders");
      navigate("/login");
    } else {
      dispatch(getOrders());
    }
  }, [isAuthenticated]);

  return <div>Order</div>;
};

export default Order;
