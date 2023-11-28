import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAdminProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import "./adminProductList.css";
import { useAlert } from "react-alert";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const AdminProductsList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products } = useSelector((state) => state.products);
  const {
    loading: loadingDelete,
    success,
    error,
  } = useSelector((state) => state.newProduct);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      return;
    }
    if (success) {
      alert.success("Product Deleted Successfully.");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [alert, dispatch, success, error]);

  return (
    <>
      {loading || loading === undefined || loadingDelete ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ALL PRODUCTS - ADMIN" />
          <div className="dashboard">
            <SideBar />
            <div className="rightSideBar">
              <div
                className="orderDetailsContainerSection-3"
                style={{
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  backgroundColor: "#f1f1f1",
                  color: "black",
                  font: "600 1rem roboto",
                }}
              >
                <div>Product Name</div>
                <div>Product Code</div>
                <div>Stock</div>
                <div>Price</div>
                <div>Action</div>
              </div>
              <div className="orderDetailsBox">
                {products &&
                  products?.map((item, i) => (
                    <>
                      <div
                        className="orderDetailItems"
                        style={{
                          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                        }}
                      >
                        <div>
                          <p>{item?.name}</p>
                        </div>
                        <div className="productCode">{item?._id}</div>
                        <div>{item?.stock}</div>
                        <div>{item?.price}</div>
                        <div>
                          <Link to={`${item?._id}`}>
                            <EditIcon />
                          </Link>
                          <button
                            className="deleteProductIcon"
                            onClick={() => {
                              dispatch(deleteProduct(item?._id));
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminProductsList;
