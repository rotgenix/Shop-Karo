import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import "./createProduct.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { MdOutlineEventAvailable } from "react-icons/md";
import CategoryIcon from "@mui/icons-material/Category";
import { createProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { useAlert } from "react-alert";
import { CREATE_PRODUCT_RESET } from "../../constants/productConstant";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [productPreview, setProductPreview] = useState("/profile.png");
  const [productImg, setProductImg] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { error, loading, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }
    if (success) {
      alert.success("Product Created Successfully.");

      dispatch({ type: CREATE_PRODUCT_RESET });
      navigate("/admin/dashboard");
    }
  }, [error, loading, success, dispatch, navigate, alert]);

  const updateDataChange = (e) => {
    const files = Array.from(e.target.files);

    setProductImg([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductPreview(reader.result);
          setProductImg((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const createSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("stock", stock);
    productImg.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  return (
    <>
      <MetaData title="CREATE PRODUCT - admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="createProductContainer">
            <form
              className="updateForm"
              encType="multipart/form-data"
              onSubmit={createSubmit}
            >
              <h1>Create Product</h1>
              <div>
                <AccountCircleIcon />
                <input
                  type="text"
                  placeholder="Enter Your Product Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <DescriptionIcon />
                <input
                  type="text"
                  placeholder="Enter Product Description"
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <CurrencyRupeeIcon />
                <input
                  type="number"
                  placeholder="Enter Product Price"
                  value={price}
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <CategoryIcon />
                <input
                  type="text"
                  placeholder="Enter Product Category"
                  value={category}
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <MdOutlineEventAvailable />
                <input
                  type="number"
                  placeholder="Enter Stock Value"
                  value={stock}
                  name="stock"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div id="updateImage">
                <img src={productPreview} alt="product preview" />
                <input
                  type="file"
                  name="product"
                  accept="image/*"
                  onChange={updateDataChange}
                  required="true"
                  multiple
                />
              </div>

              <input
                type="submit"
                value="Create Product"
                className="signUpBtn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
