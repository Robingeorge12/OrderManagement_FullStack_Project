import React, { useEffect, useState } from "react";
import "./UserPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDeleteRow } from "react-icons/ai";
import {
  Only_User_orderFilter,
  UserOnly_order,
  cancelOrder_Byuser,
  delete_OrdersByUser,
  get_ALL_orders,
} from "../../Redux/orderAction";
import UserFilter from "../UserFilterBar/UserFilter";
import {
  UpdateQuantity_ByAdmin_Cancel,
  UpdateQuantity_ByUser_Cancel,
} from "../../Redux/action";

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const [bool, setBool] = useState(false);
  const [stateFilt, setStateFilt] = useState();
  let role = JSON.parse(localStorage.getItem("user")).role;
  // console.log(role);
  const {
    orders,
    filterData,
    singleUser,
    failedReq,
    isError,
    isLoading,
    isAddProduct,
  } = useSelector((state) => {
    return state.order;
  });

  let userName = JSON.parse(localStorage.getItem("user")).name;

  useEffect(() => {
    dispatch(get_ALL_orders());
  }, []);

  useEffect(() => {
    dispatch(UserOnly_order());
  }, []);

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

  // const handleChangeStatus = (order_status, el) => {
  //   // console.log(order_status)
  //   // console.log(el)
  //   if (role === "buyer") {
  //     alert("Only seller can change order status");
  //     return;
  //   }

  //   let _id = el._id;
  //   let payload = {
  //     id: _id,
  //     order_status: order_status,
  //   };

  //   dispatch(editOrder(payload));
  // };
  const handleOrderCancel = (status, el) => {
    console.log(status);
    console.log(el);
    if (role !== "buyer") {
      setBool(!bool);
    }

    let _id = el._id;

    let payload = {
      id: _id,
      order_status: status,
    };

    if (
      el.order_status === "Cancelled" ||
      el.order_status === "Return"
     
    ) {
      return "";
    } else {
      let payload2 = {
        id: el.productId,
        quantity: el.order_quantity,
        order_status: status,
        order_id: el.order_id,
      };
      dispatch(UpdateQuantity_ByUser_Cancel(payload2));
    }

    console.log(payload);
    dispatch(cancelOrder_Byuser(payload));
  };

  // console.log(singleUser)
  const [state, setState] = useState({
    order_status:""
  });
  let ar = [];
  const handleCheck = (e) => {
    const { value, name } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }) )

    // if (checked) {
    //   ar.push(value);
    // } else {
    //   let ind = ar.indexOf(value);
    //   if (ind !== -1) {
    //     ar.splice(ind, 1);
    //   }
    // }
    // console.log(ar);
console.log(state)
    dispatch(Only_User_orderFilter({...state,[name]:value}));
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
          <div className="toast-body bg-warning-info">
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

  if (isLoading) {
    return (
      <div
        className="spinner-border  text-success lod"
        // style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const handleRemoveByUser = (el) => {
    console.log(el._id);
    dispatch(delete_OrdersByUser(el._id));
  }

  return (
    <div className="userpage-cont">
      <div className="userpage-top">
        <h4 style={{ textAlign: "left", color: "darkmagenta" }}>
          USER ORDER{" "}
          <span
            style={{ padding: "0px 5px", fontSize: "15px", color: "magenta" }}
          >
            {userName}
          </span>
        </h4>
        <div className="userpage-top-all">
          <div className="userpage-top-filter">
            <div className="dropdown ">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <span style={{ padding: "0px 5px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-funnel"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                  </svg>{" "}
                </span>{" "}
                FILTER
              </a>
              {/*  .................................................start */}

              <div className="dropdown-menu drope-menu">
                <div className="d-flex dropdown-item gap-1 m-0 px-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="order_status"
                      value={"Ordered"}
                      defaultChecked={state.order_status === "Ordered"}
                      onClick={handleCheck}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Ordered
                    </label>
                  </div>
                </div>

                <div className="d-flex dropdown-item gap-1 m-0 px-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="order_status"
                      value={"Delivered"}
                      defaultChecked={state.order_status === "Delivered"}
                      onClick={handleCheck}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Delivered
                    </label>
                  </div>
                </div>

                <div className="d-flex dropdown-item gap-1 m-0 px-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={"Return"}
                      name="order_status"
                      defaultChecked={state.order_status === "Return"}
                      onClick={handleCheck}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Return
                    </label>
                  </div>
                </div>

                <div className="d-flex dropdown-item gap-1 m-0 px-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={"Cancelled"}
                      name="order_status"
                      defaultChecked={state.order_status === "Cancelled"}
                      onClick={handleCheck}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Cancelled
                    </label>
                  </div>
                </div>

                <div className="d-flex dropdown-item gap-1 m-0 px-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={""}
                      name="order_status"
                      defaultChecked={!state.order_status}
                      onClick={handleCheck}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      All
                    </label>
                  </div>
                </div>

                {/* <div className="d-flex dropdown-item gap-1 m-0 px-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      // value={"Cancelled"}
                      defaultValue={"FastTrack"}
                      onClick={handleCheck}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                     
                      FastTrack
                    </label>
                  </div>
                </div>

                <div className="d-flex dropdown-item gap-1 m-0 px-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                    
                      defaultValue={"COD"}
                      onClick={handleCheck}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                     
                      COD
                    </label>
                  </div>
                </div> */}
              </div>

              {/* ...............................................................end */}
            </div>
          </div>

          {/* <div className="userpage-top-sort">SORT</div>
          <div className="userpage-top-pagination">pagination</div> */}
        </div>

        <div className="userpage-top-display">
          {/* <div className="page color-white" style={{color:"goldenrod", padding:"0px 8px",border:"1px solid goldenrod",width:"70%"}}>pagination</div> */}
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
                {<UserFilter handleCheck={handleCheck} />}
              </span>
              <hr />
              <div className="d-flex dropdown-item gap-1 m-0 px-2">
                {/* <span className="">
                  <span
                    style={{ color: "goldenrod", padding: "0px 8px" }}
                  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                </svg></span> */}
                {/* <SideSort /> */}

                {/* </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {singleUser?.map((el, i) => {
        return (
          <div key={i}>
            {" "}
            <div className="p-3 m-0 border-0 bd-example m-0 border-0 userpage-body">
              <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-8 mb-3">
                  <div className="card d-flex justify-content-center">
                    <div className="d-flex align-items-center justify-content-center userpage-body-img"></div>

                    <div className="userpage-div">
                      <span
                        onClick={() => handleRemoveByUser(el)}
                        className="userDelete"
                      >
                        <AiOutlineDeleteRow
                          className="userDelete-icon"
                          // style={{ color: "red" }}
                        />
                      </span>
                      <div className="userpage-p1">
                        <span className="userpage-title1">CUSTOMER NAME</span>:
                        <span className="userpage-title">{el.buyer_name}</span>
                      </div>
                      <hr />
                      <div className="userpage-p1">
                        <span className="userpage-title1">CUSTOMER MODE</span>:
                        <span className="userpage-title">
                          <select
                            onChange={(e) =>
                              handleOrderCancel(e.target.value, el)
                            }
                          >
                            <option value="">Proceed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Return">Return</option>
                            {/* <option value="Express">Express</option> */}
                          </select>
                        </span>
                      </div>
                      <hr />

                      <div className={`userpage-p1`}>
                        <span className={`userpage-title1`}>ORDER STATUS</span>:
                        <span className="userpage-title">
                          <span
                            value={el.order_status}
                            // onChange={(e) =>
                            //   handleChangeStatus(e.target.value, el)
                            // }
                            className={`${getClass(el.order_status)}`}
                            style={{ padding: "5px 10px" }}
                          >
                            {el.order_status}
                          </span>
                          {/* <select
                        
                            name=""
                            id=""
                          > */}
                          {/* <option value="Ordered">Ordered</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Return">Return</option>
                            <option value="Cancelled">Cancelled</option> */}
                          {/* </select> */}
                        </span>
                      </div>
                      <hr />

                      <div className="userpage-p1">
                        <span className="userpage-title1">TRANSPORT</span>:
                        <span
                          className={`${getTrans(el.order_mode)}`}
                          id="userpage-title"
                        >
                          {el.order_mode}
                        </span>
                      </div>
                      <hr />

                      <div className="userpage-p1">
                        <span className="userpage-title1">PAYMENT MODE</span>:
                        <span className="userpage-title">
                          {el.order_paymentMode}
                        </span>
                      </div>
                      <hr />
                      <div className="userpage-p1">
                        <span className="userpage-title1">DELIVERY DATE</span>:
                        <span className="userpage-title">
                          {el.expected_delivery}
                        </span>
                      </div>
                      <hr />
                      <div className="userpage-p1">
                        <span className="userpage-title1">ORDER DATE</span>:
                        <span className="userpage-title">{el.order_date}</span>
                      </div>
                      <hr />
                      <div className="userpage-p1">
                        <span className="userpage-title1">AMOUNT</span>:
                        <span className="userpage-title">
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
      {/* {} */}
    </div>
  );
}

export default UserPage;
