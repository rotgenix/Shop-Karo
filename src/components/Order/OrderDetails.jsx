import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./orderDetails.css";

const OrderDetails = () => {
  const { orderId: id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, orders } = useSelector((state) => state.orderDetails);
  const orderItems = orders?.orderItems;

  useEffect(() => {
    // if (error) {
    //   return alert.error("akash");
    // }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, id]);

  return (
    <>
      <MetaData title={`Order #${orders?._id}`} />
      {loading ? (
        <Loader />
      ) : (
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
                    <div className="productCode">{orderItems[i]?.product}</div>
                    <div>×{orderItems[i]?.quantity}</div>
                    <div>{orderItems[i]?.price}</div>
                  </div>
                  <hr />
                </>
              ))}
          </div>
          <div className="orderDetailsContainerSection-4">
            <div>Order Summary</div>
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
      )}
    </>
  );
};

export default OrderDetails;
