import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import "./updateProfile.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import PasswordIcon from "@mui/icons-material/Password";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import { updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmNewPassword", confirmNewPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      navigate("/me/update");
    }
    if (error && !isUpdated) {
      alert.error(error);
    }
  }, [isUpdated, error, alert, dispatch]);

  return (
    <>
      <MetaData title="Update Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="updateProfileContainer">
          <form
            className="updateForm"
            encType="multipart/form-data"
            onSubmit={updateSubmit}
          >
            <h1>Reset Password</h1>
            <div className="signUpName">
              <KeyOffIcon />
              <input
                onChange={(e) => setOldPassword(e.target.value)}
                type="text"
                placeholder="Enter Your Old Password"
                name="name"
                value={oldPassword}
              />
            </div>
            <div className="signUpEmail">
              <PasswordIcon />
              <input
                type="password"
                placeholder="Enter Your New Password"
                value={newPassword}
                name="email"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="signUpEmail">
              <PasswordIcon />
              <input
                type="password"
                placeholder="Confirm Your New Password"
                value={confirmNewPassword}
                name="email"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="update" className="signUpBtn" />
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
