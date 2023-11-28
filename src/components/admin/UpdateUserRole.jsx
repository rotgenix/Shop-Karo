import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../constants/userConstant";

const UpdateUserRole = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [role, setRole] = useState("");

  const { loading, userDetails: user } = useSelector(
    (state) => state.userDetails
  );

  const {
    loading: loadingUpdate,
    success,
    error,
  } = useSelector((state) => state.updateUser);

  useEffect(() => {
    dispatch(getUserDetails(id));
    if (success) {
      alert.success("User Role updated successfully.");
      dispatch({ type: UPDATE_USER_RESET });
    }
    if (error) {
      alert.error(error);
    }
  }, [success, error,alert,dispatch]);

  function myFunction() {
    let x = document.getElementById("userRoleUpdate").value;
    if (x === "Choose User Role") {
    } else setRole(x);
  }

  const processRole = () => {
    if (!role) {
      alert.error("Please Choose a catergory.");
    } else {
      const myForm = new FormData();
      myForm.set("role", role.toLowerCase());
      dispatch(updateUser(id, myForm));
    }
  };

  return (
    <>
      <MetaData title={`Update Profile`} />
      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <div className="profile">
          <img src={user?.avatar?.url} alt="" />

          <div className="profileSection-2">
            <h3>User Information</h3>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
            <p className="user-number">9462880503</p>
            <p className="user-number">Role - {user?.role}</p>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <select
                style={{
                  width: "40%",
                  height: "30px",
                  margin: "10px",
                  backgroundColor: "#f1f1f1",
                }}
                onChange={(e) => myFunction()}
                id="userRoleUpdate"
                value={role}
              >
                <option>Choose User Role</option>
                <option>User</option>
                <option>Admin</option>
              </select>
              <button
                style={{ width: "40%", height: "30px", margin: "10px" }}
                onClick={() => processRole()}
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserRole;
