import React, { useState } from "react";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WebFont from "webfontloader";
import Home from "./components/Home/Home";
import ProductDetails from "./components/product/ProductDetails";
import RateProduct from "./components/product/RateProduct";
import Products from "./components/product/Products";
import "./app.css";
import LoginSignUp from "./components/userAuthentication/Login";
import { loadUser } from "./actions/userAction";
import { useDispatch } from "react-redux";
import Profile from "./components/account/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import Success from "./components/Cart/Success";
import Order from "./components/Order/MyOrder";
import OrderDetails from "./components/Order/OrderDetails";
import DashBoard from "./components/admin/DashBoard";
import AdminProductList from "./components/admin/AdminProductsList.jsx";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateOrder from "./components/admin/UpdateOrder";
import OrderList from "./components/admin/OrderList";
import AdminUserList from "./components/admin/AdminUserList";
import AdminUserProfile from "./components/admin/AdminUserProfile";
import UpdateUserRole from "./components/admin/UpdateUserRole";
import AdminReviews from "./components/admin/AdminReviews.jsx";
import AdminProductReviews from "./components/admin/adminProductReviews.jsx";
import PageNotFound from "./components/layout/PageNotFound.jsx";

const App = () => {
  const dispatch = useDispatch();

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  //   console.log(data.stripeApiKey);
  // }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
    // getStripApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/write/review/:id" Component={RateProduct} />
        <Route path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />

        <Route path="/login" Component={LoginSignUp} />
        <Route path="/profile" Component={Profile} />
        <Route path="/me/update" Component={UpdateProfile} />
        <Route path="/reset/password" Component={UpdatePassword} />
        <Route path="/password/forgot" Component={ForgotPassword} />
        <Route
          path="/password/recovery/:resetToken"
          Component={ResetPassword}
        />
        <Route path="/cart" Component={Cart} />
        <Route path="/shipping" Component={Shipping} />
        <Route path="/process/payment" Component={Payment} />
        <Route path="/success" Component={Success} />
        <Route path="/orders" Component={Order} />
        <Route path="/order/confirm" Component={ConfirmOrder} />
        <Route path="/order/:orderId" Component={OrderDetails} />
        <Route path="/admin/dashboard" Component={DashBoard} />
        <Route path="/admin/products" Component={AdminProductList} />
        <Route path="/admin/products/:id" Component={UpdateProduct} />
        <Route path="/admin/create/product" Component={CreateProduct} />
        <Route path="/admin/orders" Component={OrderList} />
        <Route path="/admin/orders/:id" Component={UpdateOrder} />
        <Route path="/admin/users" Component={AdminUserList} />
        <Route path="/admin/users/profile/:id" Component={AdminUserProfile} />
        <Route path="/admin/users/:id" Component={UpdateUserRole} />
        <Route path="/admin/reviews" Component={AdminReviews} />
        <Route path="/admin/reviews/:id" Component={AdminProductReviews} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
