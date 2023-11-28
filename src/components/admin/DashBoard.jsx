import React, { useEffect } from "react";
import "./dashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
} from "chart.js";
import SideBar from "./SideBar";
import { getAdminProducts } from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { adminUsers } from "../../actions/userAction";
import { getAdminOrders } from "../../actions/orderAction";

Chart.register(
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const DashBoard = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const alert = useAlert();

  const { users } = useSelector((state) => state.allUsers);
  const { orders } = useSelector((state) => state.allOrder);

  let totalSells = 0;

  orders?.forEach((element) => {
    totalSells += element.totalPrice;
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(adminUsers());
    dispatch(getAdminOrders());

    if (loading === false && user?.role != "admin") {
      alert.error("Only admins are allowed to access dashboard.");
      navigate("/login");
    }
  }, [user, loading]);

  const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [2, 10],
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <SideBar />
            <div className="rightSideBar">
              <div className="dashboardSummary">
                <div style={{ backgroundColor: "#6366f1" }}>
                  <h2>Total Products</h2>
                  <p>{products?.length}</p>
                </div>
                <div style={{ backgroundColor: "#f79009" }}>
                  <h2>Total Users</h2>
                  <p>{users?.length}</p>
                </div>
                <div style={{ backgroundColor: "#f04438" }}>
                  <h2>Total Sells</h2>
                  <p> &#8377; {totalSells}</p>
                </div>
                <div style={{ backgroundColor: "#10b981" }}>
                  <h2>Orders</h2>
                  <p>{orders?.length}</p>
                </div>
              </div>
              <div className="chartSection">
                <div className="lineChart">
                  <Line data={data} />
                </div>
                <div className="doughnutChart">
                  <Doughnut data={doughnutState} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashBoard;
