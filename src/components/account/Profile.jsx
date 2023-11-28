import React, { useEffect } from "react";
import "./profile.css";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title={`${user?.name}'s Profile`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="profile">
          <img src={user?.avatar?.url} alt="" />

          <div className="profileSection-2">
            <h3>User Information</h3>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
            <p className="user-number">9462880503</p>
            <Link to="/me/update" className="edit-profile">
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
