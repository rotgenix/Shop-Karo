import {
  ADMIN_REVIEWS_FAIL,
  ADMIN_REVIEWS_REQUEST,
  ADMIN_REVIEWS_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAIL,
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_RESET,
  WRITE_REVIEW_SUCCESS,
} from "../constants/reviewConstant";

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case WRITE_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case WRITE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload.data.success,
        message: action.payload.data.message,
      };
    case WRITE_REVIEW_FAIL:
      return {
        loading: false,
        success: false,
      };

    case WRITE_REVIEW_RESET:
      return {
        success: false,
      };

    default:
      return state;
  }
};

export const adminReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ADMIN_REVIEWS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ADMIN_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.data.reviews,
        products: action.payload.data.products,
      };
    case ADMIN_REVIEWS_FAIL:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export const updateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload.data.success,
      };
    case DELETE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        success: false,
      };

    default:
      return state;
  }
};
