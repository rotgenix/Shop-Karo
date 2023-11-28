import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminUsers, deleteUser } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import SideBar from "./SideBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_USER_RESET } from "../../constants/userConstant";

const AdminUserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, users } = useSelector((state) => state.allUsers);
  const { loading: loadingDelete, success } = useSelector(
    (state) => state.updateUser
  );

  useEffect(() => {
    dispatch(adminUsers());
    if (success) {
      alert.success("Users Deleted successfully");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, success]);

  return (
    <>
      {loading || loading === undefined || loadingDelete ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ALL USERS - ADMIN" />
          <div className="dashboard">
            <SideBar />
            <div className="rightSideBar">
              <div
                className="orderDetailsContainerSection-3"
                style={{
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  font: "600 1rem roboto",
                }}
              >
                <div>UserId</div>
                <div>UserName</div>
                <div>UserMail</div>
                <div>UserRole</div>
                <div>Action</div>
              </div>
              <div className="orderDetailsBox">
                {users &&
                  users?.map((item, i) => (
                    <>
                      <div
                        className="orderDetailItems"
                        style={{
                          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                        }}
                      >
                        <div>
                          <Link
                            to={`profile/${item?._id}`}
                            style={{ margin: 0, padding: 0 }}
                          >
                            <p>{item?._id}</p>
                          </Link>
                        </div>
                        <div className="productCode">{item?.name}</div>
                        <div>{item?.email}</div>
                        <div
                          style={{
                            color: `${
                              item?.role === "admin" ? "red" : "green"
                            } `,
                          }}
                        >
                          {item?.role}
                        </div>
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
                              dispatch(deleteUser(item?._id));
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

export default AdminUserList;
