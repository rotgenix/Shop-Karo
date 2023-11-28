import React, { useEffect, useState } from "react";
import "./products.css";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Slider } from "@material-ui/core";
import Rating from "@mui/material/Rating";

const Products = () => {
  const categories = ["Laptop", "Mobile", "EarPhones", "NeckBand", "Charger"];

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  const {
    loading,
    products,
    productsCount,
    error,
    resultPerPage,
    filterProductCount,
  } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [alert, dispatch, error, keyword, currentPage, price, category, rating]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products || ShopKaro" />
          <div className="productsContainer">
            <div className="productHeading">Products</div>
            <div className="productsStach">
              {products &&
                products.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}
            </div>
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              valueLabelDisplay="auto"
              aria-labelledby="range-slide"
              onChange={priceHandler}
              min={0}
              max={50000}
            />
            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category.toLowerCase())}
                >
                  {category}
                </li>
              ))}
            </ul>

            <Typography>Rating</Typography>
            <Rating
              value={rating}
              onChange={(e, newRating) =>
                setRating(Number(`${newRating === null ? 0 : newRating}`))
              }
            />
          </div>

          {filterProductCount > resultPerPage ? (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default Products;
