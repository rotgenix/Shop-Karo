import React, { useEffect } from "react";
import { AiFillDownCircle } from "react-icons/ai";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../actions/productAction.jsx";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.jsx";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home | ShopKaro" />
          <div className="banner">
            <p>Welcome to ShopKaro</p>
            <h1>A collection of antique products all over the world.</h1>

            <a href="#container">
              <button>
                CheckOut <AiFillDownCircle />
              </button>
            </a>
          </div>

          <h2 className="homeheading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
