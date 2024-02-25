import React, { useEffect, useState } from "react";
import "./OrderList.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_Orders,
  editOrder,
  filter_Order,
  get_ALL_orders,
} from "../../Redux/orderAction";
import axios from "axios";
import SideBar1 from "../SideMenu1/SideBar1";
import SideSort from "../SideMenu1/SideSort";
import { UpdateQuantity_ByAdmin_Cancel } from "../../Redux/action";
import { toBeChecked } from "@testing-library/jest-dom/matchers";

function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [stateFilt, setStateFilt] = useState();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [sortVal, setSortVal] = useState("");
  const [sortOrderfilt, setSortOrderfilt] = useState("");
  const [sortValfilt, setSortValfilt] = useState("");
  const [formData, setFormData] = useState({
    order_status: "",
    order_mode: "",
    order_paymentMode: "",
  });

  // const [searchparam, setSearchParam] = useSearchParams()
  let role = JSON.parse(localStorage.getItem("user")).role;
  // console.log(role);
  const {
    orders,
    totalLength,
    totalLen,
    filterData,
    failedReq,
    isError,
    isLoading,
    isAddProduct,
  } = useSelector((state) => {
    return state.order;
  });

  // const [order,setOrder] = useState(...orders)

  const getAll = () => {
    dispatch(get_ALL_orders({ page, sortVal, sortOrder }));
  };
  const getFilt = () => {
    dispatch(filter_Order({ ...formData, page, sortValfilt, sortOrderfilt }));
  };


 

  useEffect(() => {
    if (
      formData.order_status ||
      formData.order_mode ||
      formData.order_paymentMode ||
      formData.sortValfilt ||
      formData.sortOrderfilt
    ) {
      getFilt();
    } else {
      getAll();
    }

    // if (
    //   formData.order_status ||
    //   formData.order_mode ||
    //   formData.order_paymentMode ||
    //   formData.sortValfilt ||
    //   formData.sortOrderfilt
    // ) {
    //   dispatch(filter_Order({ ...formData, page, sortValfilt, sortOrderfilt }));
    // } else {
    //   dispatch(get_ALL_orders({ page, sortVal, sortOrder }));
    // }
  }, [
    page,
    sortVal,
    sortOrder,
    sortValfilt,
    sortOrderfilt,
    formData,
    // dispatch,
  ]);

  //  useEffect(() => {
  //    dispatch(filter_Order(formData));
  //  }, [formData, dispatch]);

  //lazy loading
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);

      // dispatch( filter_Order({ page, sortVal, sortOrder }));
    }
  };
  const handleNextPage = () => {
    // if (totalLength > page) {
    //   setPage(page + 1);
    // }
    setPage(page + 1);

    // dispatch( filter_Order({ page, sortVal, sortOrder }));
  };

  const getClass = (stat) => {
    switch (stat) {
      case "Ordered":
        return "order-class";
      case "Delivered":
        return "delivered-class";
      case "Return":
        return "return-class";
      case "Cancelled":
        return "cancel-class";
      default:
        return "";
    }
  };

  const getTrans = (el) => {
    switch (el) {
      case "Ordinary":
        return "tranf-ord";
      case "FastTrack":
        return "tranf-fast";
      case "Express":
        return "tranf-express";
      default:
        return "";
    }
  };

  const handleChangeStatus = (order_status, el) => {
    // console.log(order_status)
    // console.log(el)
    if (role === "buyer") {
      return setBool(!bool);
    }

    let _id = el._id;
    let payload = {
      id: _id,
      order_status: order_status,
    };

    if (
      el.order_status === "Cancelled" ||
      el.order_status === "Return" ||
      el.order_status === "Delivered"
    ) {
      //  return dispatch(editOrder(payload));
      return "";
    } else {
      let payload2 = {
        id: el.productId,
        quantity: el.order_quantity,
        order_status: order_status,
        order_id: el.order_id,
      };

      dispatch(UpdateQuantity_ByAdmin_Cancel(payload2));
    }

    dispatch(editOrder(payload));
    //
  };

  // console.log(orders, totalLength);

  const handleSort = (sortOrder, sortVal) => {
    // let sortOrder = el === 'asc' ? 'desc' : 'asc'
    setSortOrder(sortOrder);
    setSortVal(sortVal);
    setPage(1);
    // let payload = {
    //   sortOrder: sortOrder,
    //   sortVal: sortVal,
    //   page: page,
    // };
    // console.log(e, el);
    // console.log({page:1, sortVal, sortOrder});

    if (
      formData.order_status ||
      formData.order_mode ||
      formData.order_paymentMode ||
      formData.sortValfilt ||
      formData.sortOrderfilt
    ) {
      // console.log(sortOrderfilt);

      dispatch(
        filter_Order({ ...formData, page: 1, sortValfilt, sortOrderfilt })
      );
    } else {
      dispatch(get_ALL_orders({ page: 1, sortVal, sortOrder }));
    }

    // dispatch(get_ALL_orders({ page: 1, sortVal, sortOrder }));
  };


  const handleChange = (e) => {
    setPage(1);

    const { name, value } = e.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    dispatch(
      filter_Order({
        ...formData,
        [name]: value,
        page,
        sortValfilt,
        sortOrderfilt,
      })
    );
  };

  console.log(formData);

  const handleDel = (id, el) => {
    console.log(id, el);
    dispatch(delete_Orders(id));
  };

  const refreshToast = () => {
    setBool(false);
    // window.location.reload()
  };

  if (bool) {
    return (
      <div className="toast-item">
        <div
          className="toast fade show toast-item-div"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body bg-warning-subtle">
            {"YOU CAN'T CHANGE ORDER STATUS"}
            <div className="mt-2 pt-2 border-top">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={refreshToast}
                data-bs-dismiss="toast"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const refreshToast2 = () => {
    setBool2(!false);
    window.location.reload();
  };

  if (Object.keys(failedReq).length) {
    return (
      <div className="toast-item">
        <div
          className="toast fade show toast-item-div"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body bg-danger bg-opacity-10">
            {failedReq.message}
            <div className="mt-2 pt-2 border-top">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={refreshToast2}
                data-bs-dismiss="toast"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="ext-success lod"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return <h4 style={{ color: "red.400" }}> Error ...</h4>;
  }

  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  

  // let obj = {
  //   order_mode: null,
  //   order_status: null,
  //   order_paymentMode: null,
  // };
  // const handleCheckTr = (e) => {
  //   let { value, checked } = e.target;

  //   obj.order_paymentMode = value;

  //   document.getElementsByName("order_mode").forEach((el) => {
  //     if (el.value !== value) {
  //       el.checked = false;
  //     }
  //   });
  //   console.log(obj);
  //   dispatch(filter_Order(obj));
  // };

  // const handleCheckBn = (e) => {
  //   let { value, checked } = e.target;
  //   obj.order_mode = value;

  //   document.getElementsByName("order_paymentMode").forEach((el) => {
  //     if (el.value !== value) {
  //       el.checked = false;
  //     }
  //   });

  //   console.log(obj);
  //   dispatch(filter_Order(obj));
  // };

  // const handleCheckSt = (e) => {
  //   const { value, checked } = e.target;

  //   obj.order_status = value;

  //   document.getElementsByName("order_status").forEach((el) => {
  //     if (el.value !== value) {
  //       el.checked = false;
  //     }
  //   });

  //   console.log(obj);
  //   dispatch(filter_Order(obj));
  // };

  return (
    <div className="orderlist-cont">
      <div className="orderlist-top">
        <h4 style={{ textAlign: "left", color: "darkblue" }}>ORDER LIST</h4>

        <div className="orderlist-top-display">
          <div
            className="page color-white"
            style={{
              color: "goldenrod",
              padding: "0px 8px",
              // border: "1px solid goldenrod",
              width: "auto",
              display: "flex",
            }}
          >
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              style={{
                marginRight: "10px",
                border: "none",
                color: "goldenrod",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px 2px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </span>
            </button>
            <button style={{ border: "none" }}>{page}</button>
            <button
              onClick={handleNextPage}
              disabled={totalLength ? page >= totalLength : totalLen >= page}
              // disabled={orders?.length === 0}
              style={{
                marginLeft: "10px",
                border: "none",
                color: "goldenrod",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px 2px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </span>
            </button>
          </div>


          
          <div className="newSort">
            <div className="dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                style={{ color: "goldenrod" }}
                role="button"
                aria-expanded="false"
              >
                <span style={{ padding: "0px 5px", color: "goldenrod" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    style={{ color: "goldenrod" }}
                    className="bi bi-filter-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1M5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
                  </svg>{" "}
                </span>
              </a>

              <div className="dropdown-menu drope-menu1" id="top-filter-drope">
                {
                  <SideSort
                    handleSort={handleSort}
                    sortOrder={sortOrder}
                    setSortValfilt={setSortValfilt}
                    setSortOrderfilt={setSortOrderfilt}
                  />
                }
              </div>
            </div>
          </div>

          
          
          <div className="dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ color: "goldenrod" }}
              role="button"
              aria-expanded="false"
            >
              <span style={{ padding: "0px 5px", color: "goldenrod" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-funnel-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                </svg>
              </span>
            </a>
            <div className="dropdown-menu drope-menu2">
              <span
                // onMouseEnter={() => setShow1(true)}
                // onMouseLeave={() => setShow1(true)}
                className="verySmall"
              >
                <span
                  onClick={() => setShow1(true)}
                  className="sp1"
                  style={{ color: "goldenrod", padding: "0px 8px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-funnel"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                  </svg>
                </span>
                {
                  <SideBar1
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    // onChange={onChange}
                  />
                }
              </span>
              <hr />
              <div className="sort-div">
                {/* <div className="sort-btn">ji</div> */}
                <div className=" sort-two">
                  <div className="d-flex dropdown-item gap-1 m-0 px-2">
                    <span className="">
                      <span style={{ color: "goldenrod", padding: "0px 8px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-down-up"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
                          />
                        </svg>
                      </span>
                      <SideSort
                        handleSort={handleSort}
                        sortOrder={sortOrder}
                        setSortValfilt={setSortValfilt}
                        setSortOrderfilt={setSortOrderfilt}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {orders?.map((el, i) => {
        return (
          <div key={i}>
            {" "}
            <div className="p-3 m-0 border-0 bd-example m-0 border-0 orderlist-body">
              <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-8 mb-3">
                  <div className="card d-flex justify-content-center">
                    <div className="d-flex align-items-center justify-content-center orderlist-body-img"></div>

                    <div className="orderitem-div">
                      <div
                        onClick={() => handleDel(el._id, el)}
                        className="orderitem-delIcon"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </div>

                      <div className="orderitem-p1">
                        <span className="orderlist-title1">CUSTOMER NAME</span>:
                        <span className="orderlist-title">{el.buyer_name}</span>
                      </div>
                      <hr />
                      {/* <span><button className="btn orderitem-del">icon</button></span> */}

                      <div className="orderitem-p1">
                        <span className="orderlist-title1">ADMIN MODE</span>:
                        <span className="orderlist-title">
                          <select
                            value={el.order_status}
                            onChange={(e) =>
                              handleChangeStatus(e.target.value, el)
                            }
                          >
                            {/* <option value={el.order_status}>Proceed</option> */}
                            <option value="Ordered">Ordered</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Return">Return</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </span>
                      </div>
                      <hr />
                      <div className={`orderitem-p1`}>
                        <span className={`orderlist-title1`}>ORDER STATUS</span>
                        :
                        <span className="orderlist-title">
                          <span
                            className={`${getClass(el.order_status)}`}
                            style={{ padding: "4px 10px" }}
                          >
                            {el.order_status}
                          </span>
                          {/* <select
                            value={el.order_status} */}
                          {/* // onChange={(e) => */}
                          {/* //   handleChangeStatus(e.target.value, el)
                            // } */}
                          {/* //   className={`${getClass(el.order_status)}`}
                          //   name=""
                          //   id="" */}
                          {/* // > */}
                          {/* <option value="Ordered">Ordered</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Return">Return</option>
                            <option value="Cancelled">Cancelled</option> */}
                          {/* </select> */}
                        </span>
                      </div>
                      <hr />
                      <div className="orderitem-p1">
                        <span className="orderlist-title1">TRANSPORT</span>:
                        <span
                          className={`${getTrans(el.order_mode)}`}
                          id="orderlist-title"
                        >
                          {el.order_mode}
                        </span>
                      </div>
                      <hr />
                      <div className="orderitem-p1">
                        <span className="orderlist-title1">PAYMENT MODE</span>:
                        <span className="orderlist-title">
                          {el.order_paymentMode}
                        </span>
                      </div>
                      <hr />
                      <div className="orderitem-p1">
                        <span className="orderlist-title1">DELIVERY DATE</span>:
                        <span className="orderlist-title">
                          {el.expected_delivery}
                        </span>
                      </div>
                      <hr />
                      <div className="orderitem-p1">
                        <span className="orderlist-title1">ORDER DATE</span>:
                        <span className="orderlist-title">{el.order_date}</span>
                      </div>
                      <hr />
                      <div className="orderitem-p1">
                        <span className="orderlist-title1">AMOUNT</span>:
                        <span className="orderlist-title">
                          {" "}
                          {el.order_amount}
                        </span>
                      </div>
                      <hr />
                    </div>
                    {/* <div className="card-body"></div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive table-cont">
              <table className="table table-info table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col"> ORDER ID</th>
                    <th scope="col">ORDER ITEM</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">PRICE/UNIT</th>
                    {/* <th scope="col">PRODUCT NAME</th> */}
                    <th scope="col">BUYER PHONE</th>
                    <th scope="col">BUYER PIN</th>
                    <th scope="col">BUYER STATE</th>
                    <th scope="col">BUY DIST</th>
                    <th scope="col">ADDRESS</th>
                  </tr>
                </thead>
                {/* {orders?.map((el, i) => {
              return ( */}
                <tbody>
                  <tr>
                    <th scope="row">@</th>
                    <td>{el.order_id}</td>
                    <td>{el.order_Item}</td>
                    <td>{el.order_quantity}</td>
                    <td>{el.product_price}</td>
                    {/* <td>{el.order_item}</td> */}
                    <td>{el.buyer_mob}</td>
                    <td>{el.buyer_pin}</td>
                    <td>{el.buyer_state}</td>
                    <td>{el.buyer_dist}</td>
                    <td>{el.buyer_address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderList;
