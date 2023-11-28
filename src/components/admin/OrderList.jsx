import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../../actions/orderAction";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { deleteOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, orders, error } = useSelector((state) => state.allOrder);
  const { loading: loadingDelete, success } = useSelector(
    (state) => state.updateOrder
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    if (success) {
      alert.success("Order Deleted successfully.");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAdminOrders());
  }, [dispatch, error, success]);

  return (
    <>
      {loading || loading === undefined || loadingDelete ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ALL Orders - ADMIN" />
          <div className="dashboard">
            <SideBar />
            <div className="rightSideBar">
              <div
                className="orderDetailsContainerSection-3"
                style={{
                  gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  font: "600 1rem roboto",
                }}
              >
                <div>OrderId</div>
                <div>ItemQty</div>
                <div>Status</div>
                <div>Amount</div>
                <div>Action</div>
              </div>
              <div className="orderDetailsBox">
                {orders &&
                  orders?.map((item, i) => (
                    <>
                      <div
                        className="orderDetailItems"
                        style={{
                          gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
                        }}
                      >
                        <div>
                          <p>{item?._id}</p>
                        </div>
                        <div className="productCode">
                          {item?.orderItems.length}
                        </div>
                        <div>{item?.orderStatus}</div>
                        <div>{item?.totalPrice}</div>
                        <div>
                          <Link
                            to={`${item?._id}`}
                            style={{ margin: "0 15px 0 0", padding: 0 }}
                          >
                            <EditIcon />
                          </Link>
                          <button
                            className="deleteProductIcon"
                            onClick={() => {
                              dispatch(deleteOrder(item?._id));
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
