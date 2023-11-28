import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const increaseQty = (id, quantity, stock) => {
    if (stock <= quantity) {
      alert.error("Maximum Quantity Choosen.");
      return;
    }
    dispatch(addItemToCart(id, quantity + 1));
  };

  const decreaseQty = (id, quantity) => {
    if (quantity <= 1) {
      alert.error("Quantity Can Not Be Less Than 1.");
      return;
    }
    dispatch(addItemToCart(id, quantity - 1));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
    alert.success("Item Successfully Removed From Cart");
  };

  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt="" />
        <div>
          <div>
            <p>{item.category}</p>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
          </div>
          <div>
            <p>Price</p>
            <p>&#8377;{item.price * item.quantity}</p>
          </div>
          <div className="cartInput ">
            <button
              onClick={() => decreaseQty(item.product, item.quantity)}
              style={{ backgroundColor: "white", border: "none" }}
            >
              -
            </button>
            <input type="number" readOnly value={item.quantity} />
            <button
              onClick={() =>
                increaseQty(item.product, item.quantity, item.stock)
              }
              style={{ backgroundColor: "white", border: "none" }}
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.product)}
            style={{ backgroundColor: "white", border: "none" }}
          >
            <ClearIcon />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItemCard;
