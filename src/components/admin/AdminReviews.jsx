import React, { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { adminReviews } from "../../actions/reviewAction";
import { Link } from "react-router-dom";

const AdminReviews = () => {
  const dispatch = useDispatch();

  const { loading, products } = useSelector((state) => state.allReviews);

  useEffect(() => {
    dispatch(adminReviews());
  }, []);

  return (
    <>
      {loading || loading === undefined ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All reviewed products" />
          <div className="dashboard">
            <SideBar />
            <div className="rightSideBar">
              <div>click on product id to see reviews</div>
              <div
                className="orderDetailsContainerSection-3"
                style={{
                  gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  font: "600 1rem roboto",
                }}
              >
                <div>Product </div>
                <div>Product Id</div>
                <div>Product Name</div>
                <div>Description</div>
              </div>
              <div className="orderDetailsBox">
                {products &&
                  products?.map((item, i) => (
                    <>
                      <div
                        className="orderDetailItems"
                        style={{
                          gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                        }}
                      >
                        <div>
                          <img src={item?.images[0]?.url} alt="" />
                        </div>
                        <div>
                          <Link to={`${item?._id}`}>{item?._id}</Link>
                        </div>
                        <div>{item?.name}</div>
                        <div style={{ width: "80%", overflow: "scroll" }}>
                          {item?.description}
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

export default AdminReviews;
