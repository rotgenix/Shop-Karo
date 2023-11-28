import React, { useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./rateProduct.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addNewReview } from "../../actions/reviewAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { WRITE_REVIEW_RESET } from "../../constants/reviewConstant";

const RateProduct = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [ratingMsg, setRatingMsg] = useState("");

  const { id } = useParams();

  const { loading, success, error, message } = useSelector(
    (state) => state.newReview
  );

  const reviewMsgTab = useRef(null);

  const options = {
    color: "rgba(20,20,20,0.2)",
    activeColor: "#ffe11b",
    value: rating,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const reviewSubmitHandler = () => {
    if (!rating || !reviewComment) {
      alert.error("Please Give rating and write comment.");
      return;
    }

    setRating(0);
    setReviewComment("");

    dispatch(addNewReview(rating, reviewComment, id));
  };

  useEffect(() => {
    if (success) {
      alert.success(message);
      dispatch({ type: WRITE_REVIEW_RESET });
      navigate(-1);
    }
    if (error) {
      alert.error(error);
    }
  }, [success, error]);

  const RatingManager = (e) => {
    setRating(e);
    switch (e) {
      case 1:
        {
          setRatingMsg("Very Bad");
          reviewMsgTab.current.classList = "";
          reviewMsgTab.current.classList.add("redText");
        }
        return;

      case 2:
        {
          setRatingMsg("Bad");
          reviewMsgTab.current.classList = "";
          reviewMsgTab.current.classList.add("yellowText");
        }
        return;

      case 3:
        {
          reviewMsgTab.current.classList = "";
          reviewMsgTab.current.classList.add("greenText");
          setRatingMsg("Good");
        }
        return;

      case 4:
        {
          setRatingMsg("Very Good");
          reviewMsgTab.current.classList = "";
          reviewMsgTab.current.classList.add("greenText");
        }
        return;

      case 5:
        {
          reviewMsgTab.current.classList = "";
          reviewMsgTab.current.classList.add("greenText");
          setRatingMsg("Excellent");
        }
        return;

      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="writeReviewContainer">
            <div>
              <div className="writeReviewSection-1">
                <div>Rate this product</div>
                <div>
                  <div className="reviewStars">
                    <ReactStars
                      {...options}
                      onChange={(e) => RatingManager(e)}
                    />
                    <div
                      style={{
                        marginLeft: "10px",
                        font: "600 1rem roboto",
                        letterSpacing: "0.8px",
                      }}
                      ref={reviewMsgTab}
                    >
                      {ratingMsg}
                    </div>
                  </div>
                  <div>{rating > 0 ? "Your rating has been saved" : ""}</div>
                </div>
              </div>
              <hr />
              <div className="writeReviewSection-2">
                <div className="writeReviewSection-2-1">Review the product</div>
                <div className="writeReviewSection-2-2">
                  <div>Description</div>
                  <hr />
                  <textarea
                    placeholder="Description...."
                    id="reviewCommentBox"
                    cols="30"
                    rows="10"
                    onChange={(e) => setReviewComment(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <hr />
              <div className="writeReviewSection-3">
                <button onClick={reviewSubmitHandler}>Submit </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RateProduct;
