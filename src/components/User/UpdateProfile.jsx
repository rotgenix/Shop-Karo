import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { loadUser, updateProfile } from "../../actions/userAction";
import "./updateProfile.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { EDIT_PROFILE_RESET } from "../../constants/userConstant";
import { useAlert } from "react-alert";
import MetaData from "../../components/layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const updateTab = useRef(null);
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url);
    }
    if (error) {
      alert.error(error);
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch({ type: EDIT_PROFILE_RESET });
    }
  }, [error, isUpdated, dispatch, alert, user, navigate]);

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <MetaData title="Update Profile" />
      {loading ? (
        <Loader />
      ) : (
        <div className="updateProfileContainer">
          <form
            ref={updateTab}
            className="updateForm"
            encType="multipart/form-data"
            onSubmit={updateSubmit}
          >
            <h1>Update Profile</h1>
            <div className="signUpName">
              <AccountCircleIcon />
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signUpEmail">
              <EmailIcon />
              <input
                type="email"
                placeholder="Enter Your Email Id"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="updateImage">
              <img src={avatarPreview} alt="avatar preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateDataChange}
              />
            </div>

            <input type="submit" value="update" className="signUpBtn" />
            <Link to="/reset/password">Update Password?</Link>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
