import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { MdOutlineEventAvailable } from "react-icons/md";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateProduct } from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import Loader from "../layout/Loader/Loader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const navigate = useNavigate();
  const [productPreview, setProductPreview] = useState("/profile.png");
  const [productImg, setProductImg] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { loading, success, error } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success) {
      alert.success("Product Updated Successfully.");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
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

  const editSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    if (name != "") myForm.set("name", name);
    if (description != "") myForm.set("description", description);
    if (price) myForm.set("price", price);
    if (category != "") myForm.set("category", category);
    if (stock) myForm.set("stock", stock);
    if (productImg.length > 0) {
      productImg.forEach((image) => {
        myForm.append("images", image);
      });
    }
    dispatch(updateProduct(id, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="createProductContainer">
            <form
              className="updateForm"
              encType="multipart/form-data"
              onSubmit={editSubmit}
            >
              <h1>Edit Product</h1>
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
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <CategoryIcon />
                <input
                  type="text"
                  placeholder="Enter Product Category"
                  name="category"
                  value={category}
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
                  multiple
                />
              </div>

              <input
                type="submit"
                value="Update Product"
                className="signUpBtn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
