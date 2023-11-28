import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import "./updateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/userAction";

const ResetPassword = () => {
  const alert = useAlert();
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const updateSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(newPassword, confirmNewPassword, resetToken));
  };

  const { isAuthenticated } = useSelector((state) => state.user);
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
    if (error) {
      alert.error(error);
    }

    if (message) {
      alert.success(message);
      navigate("/login");
    }
  }, [error, loading, message, isAuthenticated]);

  return (
    <>
      <MetaData title="Reset Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="updateProfileContainer">
          <form
            className="updateForm"
            encType="multipart/form-data"
            onSubmit={updateSubmit}
          >
            <h1>Recover Password</h1>
            <div className="signUpName">
              <KeyOffIcon />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="Enter Your New Password"
                name="name"
                value={newPassword}
              />
            </div>
            <div className="signUpEmail">
              <KeyOffIcon />
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

export default ResetPassword;
