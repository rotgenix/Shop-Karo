import React, { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  adminProductReviewes,
  deleteReviews,
} from "../../actions/reviewAction";
import { useAlert } from "react-alert";
import { DELETE_REVIEW_RESET } from "../../constants/reviewConstant";
import { useParams } from "react-router-dom";

const AdminProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { loading, reviews } = useSelector((state) => state.allReviews);
  const {
    loading: loadingDelete,
    success,
    error,
  } = useSelector((state) => state.updateReviews);

  useEffect(() => {
    dispatch(adminProductReviewes(id));
    if (success) {
      alert.success("Review Deleted Successfully.");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    if (error) {
      alert.error(error);
    }
  }, [success, error]);

  return (
    <>
      {loading || loading === undefined || loadingDelete ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Product reviews " />
          <div className="dashboard">
            <SideBar />
            <div className="rightSideBar">
              <div
                className="orderDetailsContainerSection-3"
                style={{
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  font: "600 1rem roboto",
                }}
              >
                <div>Reviewer Name</div>
                <div>Rating</div>
                <div>Comment</div>
                <div>Action</div>
              </div>
              <div className="orderDetailsBox">
                {reviews &&
                  reviews?.map((item, i) => (
                    <>
                      <div
                        className="orderDetailItems"
                        style={{
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        }}
                      >
                        <div
                          className="productCode"
                          style={{ overflow: "scroll" }}
                        >
                          {item?.name}
                        </div>
                        <div>{item?.rating}</div>
                        <div style={{ overflow: "scroll", width: "80%" }}>
                          {item?.comment}
                        </div>
                        <div>
                          <button
                            className="deleteProductIcon"
                            onClick={() => {
                              dispatch(deleteReviews(id, item?._id));
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

export default AdminProductReviews;
