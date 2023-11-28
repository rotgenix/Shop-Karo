import React from "react";
import "./confirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.cart);

  const { pincode, address, city, state, country } = shippingInfo;

  let totalBill = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const proceedToPayment = () => {
    const data = {
      subtotal: totalBill,
      shippingCharges: 100,
      tax: 0,
      totalPrice: totalBill + 100,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderSection">
        <div className="confirmOrderBox">
          <div className="confirmOrderSection-1">
            <div className="confirmAddress">
              <div className="confirmAddressSection-1">
                <div>
                  Deliver to: <span>Akash Naruka, {pincode} </span>{" "}
                  <button style={{ backgroundColor: "" }}>Home</button>
                </div>
                <div>
                  {address}, {city}
                </div>
              </div>
              <div className="confirmAddressSection-2">
                <button onClick={() => navigate("/shipping")}>Change</button>
              </div>
            </div>
            <hr style={{ width: "100%" }} />
            <div className="confirmOrderItems">
              {cartItems.map((item) => (
                <CartItemCard item={item} key={item.product} />
              ))}
            </div>

            <div className="BackToHomeBtn">
              <button onClick={() => navigate("/")}>
                <KeyboardBackspaceIcon />
                Back To Home
              </button>
            </div>
          </div>
          <div className="confirmOrderSection-2">
            <div className="cartSection2" style={{ width: "80%", height: "" }}>
              <div className="cartSummaryHeading">
                <h2>Order Summary</h2>
              </div>
              <hr />
              <div className="cartSection2_1">
                <p>Total Items - {cartItems.length}</p>
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
              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
