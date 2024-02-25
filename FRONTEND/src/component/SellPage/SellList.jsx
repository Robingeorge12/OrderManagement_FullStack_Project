import React from "react";
import "./SellList.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { post_New_Item } from "../../Redux/action";
import * as Yup from "yup";

function SellList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  let userData = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_price: "",
      product_category: [""],
      product_brand: "",
      product_quantity: "",
      product_url: "",
      seller: userData._id,
    },
    validationSchema: Yup.object({
      // Define validation rules for each field
      product_name: Yup.string().required("Product name is required"),
      product_price: Yup.number()
        .positive()
        .required("Product price is required"),
      product_category: Yup.string().required("Product category is required"),
      product_brand: Yup.string().required("Product brand is required"),
      product_quantity: Yup.number()
        .positive()
        .required("Product quantity is required"),
      product_url: Yup.string().required("Product url is required"),
      seller: Yup.string().required("Seller is required"),
      // Add validation rules for other fields
    }),
    onSubmit: async (values, { resetForm }) => {
      // Check if form is valid before dispatching
      if (formik.isValid) {
        await dispatch(post_New_Item(values));
        resetForm();
      }
    },
  });

  return (
    <div className="d-flex selllist-cont d-flex align-items-center">
      <h1
        className="text-left text-danger w-100 text-start px-3 sellist-head"
        style={{ display: "flex", gap: "15px", alignItems: "center" }}
      >
        PRODUCT ADD PAGE{" "}
        <span
          style={{ fontSize: "14px", color: "magenta", fontFamily: "fantasy" }}
        >
          {userData.role}
        </span>{" "}
        <span style={{ fontSize: "14px", color: "red", fontFamily: "fantasy" }}>
          {userData.name}
        </span>
      </h1>
      <div className="p-3 m-0 border-0 bd-example m-0 border">
        <form
          onSubmit={formik.handleSubmit}
          className="p-3 m-0 border bd-example m-0 border-0 rounded borderRadius-1"
        >
          <h1
            className="text-left w-100 text-start pb-4 selllist-title"
            style={{ color: "darkblue" }}
          >
            PRODUCT FORM
          </h1>

          <div className="row ">
            <div className="mb-3 col-sm-12 bg-info-subtle col-md-12 col-lg-12 ">
              <label
                htmlFor="exampleInputName"
                className="form-label col-lg-2 col-md-4 col-sm-6 d-flex justify-content-start"
              >
                PRODUCT NAME
              </label>
              <div className="col-lg-12 col-md-12 col-sm-12">
                {" "}
                <input
                  type="text"
                  name="product_name"
                  value={formik.values.product_name}
                  onChange={formik.handleChange}
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>

            <div className="mb-3 bg-info-subtle col-sm-12 col-md-12 col-lg-12">
              <label
                htmlFor="exampleInputCategory"
                className="form-label col-lg-2 col-md-4 col-sm-6 d-flex justify-content-start"
              >
                PRODUCT CATEGORY
              </label>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input
                  type="text"
                  name="product_category"
                  value={formik.values.product_category}
                  onChange={formik.handleChange}
                  className="form-control"
                  id="exampleInputCategory"
                />
              </div>
            </div>

            <div className="mb-3 bg-info-subtle col-sm-12 col-md-12 col-lg-12">
              <label
                htmlFor="exampleInputBrand"
                className="form-label col-lg-2 col-md-4 col-sm-6 d-flex justify-content-start"
              >
                PRODUCT BRAND
              </label>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input
                  type="text"
                  name="product_brand"
                  value={formik.values.product_brand}
                  onChange={formik.handleChange}
                  className="form-control"
                  id="exampleInputBrand"
                />
              </div>
            </div>

            <div className="mb-3 bg-info-subtle col-sm-12 col-md-12 col-lg-12">
              <label
                htmlFor="exampleInputPrice"
                className="form-label col-lg-2 col-md-4 col-sm-6 d-flex justify-content-start"
              >
                PRODUCT PRICE
              </label>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input
                  type="Number"
                  name="product_price"
                  value={formik.values.product_price}
                  onChange={formik.handleChange}
                  className="form-control"
                  id="exampleInputPrice"
                />
              </div>
            </div>

            <div className="mb-3 bg-info-subtle col-sm-12 col-md-12 col-lg-12">
              <label
                htmlFor="exampleInputQuantity"
                className="form-label col-lg-2 col-md-4 col-sm-6 d-flex justify-content-start"
              >
                QUANTITY
              </label>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input
                  type="Number"
                  name="product_quantity"
                  value={formik.values.product_quantity}
                  onChange={formik.handleChange}
                  className="form-control"
                  id="exampleInputQuantity"
                />
              </div>
            </div>

            <div className="mb-3 bg-info-subtle col-sm-12 col-md-12 col-lg-12">
              <label
                htmlFor="exampleInputurl"
                className="form-label col-lg-2 col-md-4 col-sm-6 d-flex justify-content-start"
              >
                URL
              </label>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input
                  type="text"
                  name="product_url"
                  value={formik.values.product_url}
                  onChange={formik.handleChange}
                  className="form-control"
                  id="exampleInputurl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center"
              id="sellbtn"
              disabled={userData.role === "buyer" ? true : false}
            >
              ADD NEW PRODUCT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellList;
