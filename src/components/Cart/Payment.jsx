import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: { id: 12455555, status: "success" },
  };

  const placeOrder = (e) => {
    e.preventDefault();

    dispatch(createOrder(order));

    alert.success("Order Placed Successfully");

    navigate("/success")
  };

  useEffect(() => {
    alert.error(error);
  }, [error]);

  return (
    <>
      <MetaData title="Delivery Info - ShopKaro" />
      <CheckoutSteps activeStep={2} />
      <button
        style={{
          color: "white",
          backgroundColor: "tomato",
          margin: "200px 40%",
          padding: "20px 50px",
        }}
        onClick={placeOrder}
      >
        Place Order
      </button>
    </>
  );
};

export default Payment;
