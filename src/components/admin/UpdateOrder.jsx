import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  UPDATE_CLEAR_ERROR,
  UPDATE_ORDER_RESET,
} from "../../constants/orderConstants";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { getOrderDetails, updateOrder } from "../../actions/orderAction";

const UpdateOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("");
  const { loading, success, error } = useSelector((state) => state.updateOrder);
  const { orders, loading: loadingUpdate } = useSelector(
    (state) => state.orderDetails
  );
  const orderItems = orders?.orderItems;
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
      dispatch({ type: UPDATE_CLEAR_ERROR });
    }
    if (success) {
      alert.success("order updated successfully.");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }
  }, [success, dispatch, error, navigate, alert, loading]);

  const processOrder = () => {
    if (!orderStatus || orderStatus === "Choose a status") {
      alert.error("Please Choose a catergory.");
    } else {
      const myForm = new FormData();
      myForm.set("status", orderStatus);
      dispatch(updateOrder(id, myForm));
    }
  };

  function myFunction() {
    let x = document.getElementById("mySelect").value;
    setOrderStatus(x);
  }

  return (
    <>
      <MetaData title={"Update order - admin"} />
      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="createProductContainer">
            <div className="orderDetailsContainer">
              <div className="orderDetailsContainerSection-1">
                Order #{orders?._id}
              </div>

              <span className="orderDetailsContainerSection-2">
                Order Details({orderItems?.length})
              </span>

              <div className="orderDetailsContainerSection-3">
                <div>Product Name</div>
                <div>Product Code</div>
                <div>Quantity</div>
                <div>Price</div>
              </div>
              <div className="orderDetailsBox">
                {orderItems &&
                  orderItems?.map((item, i) => (
                    <>
                      <div className="orderDetailItems">
                        <div>
                          <img src={orderItems[i]?.image} alt="itemImage" />
                          <p>{orderItems[i]?.name}</p>
                        </div>
                        <div className="productCode">
                          {orderItems[i]?.product}
                        </div>
                        <div>×{orderItems[i]?.quantity}</div>
                        <div>{orderItems[i]?.price}</div>
                      </div>
                      <hr />
                    </>
                  ))}
              </div>
              <div className="orderDetailsContainerSection-4">
                <div>
                  <div>Order Summary</div>
                  <div style={{ margin: "15px 0" }}>
                    <select
                      style={{
                        width: "170px",
                        height: "30px",
                        font: "600 1rem roboto",
                      }}
                      id="mySelect"
                      onChange={(e) => myFunction()}
                    >
                      <option>Choose a status</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                  <button
                    style={{
                      width: "170px",
                      height: "30px",
                      font: "500 1.1rem roboto",
                    }}
                    onClick={() => processOrder()}
                  >
                    Process Order
                  </button>
                </div>
                <div>
                  <div>
                    <p>subtotal</p>
                    <p>&#8377;{orders?.itemsPrice}</p>
                  </div>
                  <div>
                    <p>Shipping Fee</p>
                    <p>&#8377;{orders?.shippingPrice}</p>
                  </div>
                  <div>
                    <p>Tax</p>
                    <p>&#8377;{orders?.taxPrice}</p>
                  </div>
                  <div>
                    <p>Total</p>
                    <p>&#8377;{orders?.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateOrder;
