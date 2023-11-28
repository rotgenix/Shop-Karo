import React from "react";
import ReactStars from "react-rating-stars-component";
import avatar from "../../Images/avatar.png";
import "./reviewCard.css";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review?.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <>
      <div className="reviewCard">
        <div className="reviewCard-1">
          <img src={avatar} alt="avatar" />
          <div className="reviewCard-1-1">
            <div>{review.name}</div>
            <div>India</div>
          </div>
        </div>
        <div className="reviewCard-2">
          <ReactStars {...options} />
        </div>
        <div className="reviewCard-3">{review.comment}</div>
      </div>
    </>
  );
};

export default ReviewCard;
