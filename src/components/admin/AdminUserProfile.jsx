import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/userAction";

const AdminUserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, []);

  const { loading, userDetails: user } = useSelector(
    (state) => state.userDetails
  );

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
            <p className="user-email">userRole - {user?.role}</p>
            <p className="user-number">9462880503</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserProfile;
