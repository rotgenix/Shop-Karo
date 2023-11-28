import React, { useEffect, useState } from "react";
import "./forgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { forgotPassword } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();

  const forgotSubmit = () => {
    if (!email) return alert.error("Please Enter Email Id First.");
    dispatch(forgotPassword(email));
  };

  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
    if (message) {
      alert.success(message);
      navigate("/login");
    }

    if (error && !message) {
      alert.error(error);
    }
  }, [isAuthenticated, error, loading, message, alert, dispatch]);

  return (
    <>
      <MetaData title="Forgot Password" />
      {loading ? (
        <Loader />
      ) : (
        <div class="forgotPasswordContainer">
          <h1>Forgot Password</h1>
          <h6 class="information-text">
            Enter your registered email to reset your password.
          </h6>
          <div class="form-group">
            <p>
              <label for="username">Email</label>
            </p>
            <input
              type="email"
              name="user_email"
              id="user_email"
              placeholder="Enter Your Registered Email Id"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={forgotSubmit}>Reset Password</button>
          </div>
          <div class="footer">
            <h5>
              New here? <Link to="/login">Sign Up.</Link>
            </h5>
            <h5>
              Already have an account? <Link to="/login">Sign In.</Link>
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
