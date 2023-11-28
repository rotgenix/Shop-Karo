// three imp part of redux are constant, reducer, action.

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  newProductReducer,
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  updateUserReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
  updateOrderReducer,
} from "./reducers/orderReducer";
import {
  adminReviewReducer,
  newReviewReducer,
  updateReviewReducer,
} from "./reducers/reviewReducer";

let intialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    allOrder: allOrderReducer,
    updateOrder: updateOrderReducer,
    allUsers: allUsersReducer,
    updateUser: updateUserReducer,
    userDetails: userDetailsReducer,
    allReviews: adminReviewReducer,
    updateReviews: updateReviewReducer,
  },
  preloadedState: intialState,
  middleware: [thunk],
});

export default store;
