import React, { useEffect } from "react";
import "./cart.css";
import CartItemCard from "./CartItemCard";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../../Images/emptyCart.jpg";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  let totalBill = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <MetaData title="Shopping Cart - ShopKaro" />
      <div className="cartContainer">
        <div>
          <div className="cartSection1">
            <div className="cartTitle">
              <h1>Shopping Cart</h1>
              <p>Items {cartItems.length}</p>
            </div>
            <hr />
            <div className="cartItemSection">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItemCard item={item} key={item.product} />
                ))
              ) : (
                <img
                  src={emptyCart}
                  alt="gif"
                  style={{ width: "28vmax", marginLeft: "8rem" }}
                />
              )}
            </div>
            <button onClick={() => navigate("/")}>
              <KeyboardBackspaceIcon />
              Back To Home
            </button>
          </div>
          <div className="cartSection2">
            <div className="cartSummaryHeading">
              <h2>Summary</h2>
            </div>
            <hr />
            <div className="cartSection2_1">
              <p>ITEMS-{cartItems.length}</p>
              <p>&#8377;{totalBill}</p>
            </div>
            <div className="cartSection2_2">
              <p>Shipping Charges</p>
              <select>
                <option>Standard-Delivery- &#8377;100</option>
              </select>
            </div>
            <div className="cartSection2_2">
              <p>Coupon Code</p>
              <select>
                <option>Currently Not Available</option>
              </select>
            </div>
            <hr />
            <div className="cartSection2_3">
              <p>Total Price</p>
              <p>&#8377;{`${cartItems.length > 0 ? totalBill + 100 : 0}`}</p>
            </div>
            <button onClick={checkOutHandler}>CHECKOUT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
