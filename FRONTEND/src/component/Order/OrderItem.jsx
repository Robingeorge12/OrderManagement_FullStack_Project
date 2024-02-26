import React, { useEffect, useState } from "react";
import "./OrderItem.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateQuantity, get_user_item_data, post_Order } from "../../Redux/action";
import ProductionPage from "../ProductionPage/ProductionPage";

function OrderItem() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(null);
  const [data, setData] = useState([]);
  const [quant, setQuant] = useState({});
  const navigate = useNavigate();
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false);

  const { order_buyer, order_product, isLoading, isError } = useSelector(
    (state) => {
      return state.item;
    }
  );
  const [buy, setBuy] = useState(order_buyer[0] || {});
  const [pro, setPro] = useState(order_product[0] || {});
  console.log(pro)

  const [order, setOrder] = useState({
    buyer_id: buy?._id,
    buyer_name: buy?.name,
    buyer_email: buy?.email,
    buyer_address: "",
    buyer_mob: "",
    buyer_pin: "",
    buyer_state: "",
    buyer_dist: "",
    order_amount: null,
    order_Item: pro?.product_name,
    order_quantity: "",
    productId: pro?._id,
    product_price: pro?.product_price,
    order_id: "",
    order_mode: "Ordinary",
    order_status: "Ordered",
    order_paymentMode: "COD",
    order_date: "",
    expected_delivery: "",
  });
  // console.log(pro.product_price)

  const handleCal = (qty, product, buyer) => {

    if (pro.product_quantity >= +qty) {
      const sum = pro.product_price * +qty;
      setAmount(sum);
      setOrder({
        ...order,
        order_quantity: qty,
        order_amount: sum,
      });

      setQuant({
        ...quant,
        quantity: qty,
        id: pro._id,
      });

      if (pro.product_quantity == +qty) {
        setData({
          buyer_id: buyer?._id,
          buyer_name: buyer?.name,
          product_id: pro?._id,
          production_quantity: null,
          production_price: pro?.product_price,
          production_item: pro?.product_name,
          production_amount: null,
        });

        setQuant({
          ...quant,
          quantity: qty,
          id: pro._id,
        });
      } else {
        setData({
          buyer_id: null,
          buyer_name: null,
          product_id: null,
          production_quantity: null,
          production_price: null,
          production_item: null,
          production_amount: null,
        });
      }
    } else {
      setAmount("");
      setOrder({
        ...order,
        order_quantity: qty,
        order_amount: "",
      });

      // setquant({ ...quant, [pro._id]: qty });

      setData({
        buyer_id: buyer?._id,
        buyer_name: buyer?.name,
        product_id: pro?._id,
        production_quantity: null,
        production_price: pro?.product_price,
        production_item: pro?.product_name,
        production_amount: null,
      });
    }
  };

  // console.log(data.product_id);
  let role = JSON.parse(localStorage.getItem("user")).role;
  

  const handleOrder = (val) => {
    console.log(val);

    if (
      order.buyer_id &&
      order.order_quantity &&
      order.order_amount &&
      order.order_status &&
      order.order_Item &&
      order.productId &&
      order.order_paymentMode &&
      order.order_mode &&
      order.buyer_address &&
      order.buyer_mob &&
      order.buyer_email &&
      order.buyer_name &&
      order.buyer_pin &&
      order.buyer_state &&
      order.buyer_dist &&
      order.product_price
    ) {
      if (role !== "buyer") {
        setBool(!bool);
        return;
      }
      dispatch(post_Order(val));
      dispatch(UpdateQuantity(quant));
      navigate("/user-order");
    } else {
      alert("Should fill All Filed");
    }
  };

 
  

  const refreshToast2 = () => {
    setBool(!false);
    // window.location.reload();
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
          <div className="toast-body bg-danger bg-opacity-10">
            {"ONLY BUYER CAN PLACE ORDER"}
            <div className="mt-2 pt-2 border-top">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={()=>setBool(!bool)}
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
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container orderItem">
      <div className="orderItem-buyer">
        <h4 style={{ color: "green" }}>ORDER</h4>
        <div className="card d-flex flex-row align-items-center justify-content-evenly orderItem-card">
          <div className="card-body d-flex flex-column align-items-start t1">
            <p style={{ overflowX: "auto", marginTop: "0px" }}>
              EMAIL:<span style={{ padding: "0px 5px" }}></span>
              {buy?.email}
            </p>
            <p>
              NAME:<span style={{ padding: "0px 5px" }}></span>
              {buy?.name}
            </p>

            <p style={{ color: "rgb(32 218 129)", fontWeight: "700" }}>
              MAX-QTY:
              <span style={{ padding: "0px 5px", color: "maroon" }}></span>
              {pro?.product_quantity}
            </p>

            <div className="item-production">
              {data.buyer_name && (
                <ProductionPage data={data} setData={setData} />
              )}
            </div>
          </div>
          <div className="card-body d-flex flex-column align-items-end t2">
            <p>
              PRODUCT:<span style={{ padding: "0px 5px" }}></span>
              {pro?.product_name}
            </p>
            {/* <p>
              COMPANY:<span style={{ padding: "0px 5px" }}></span>
              {order_product.brand}
            </p> */}
            <p>
              REF ID:<span style={{ padding: "0px 5px" }}></span>
              {pro?.productId}
            </p>
          </div>
        </div>

        <div className="table-responsive mt-3 orderItem-product">
          <table className="table table-info table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>BRAND</th>
                <th>$PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            {
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{pro.product_name}</td>
                  <td>{pro.product_brand}</td>
                  <td>{pro.product_price}</td>
                  <td>
                    <input
                      onChange={(e) => handleCal(e.target.value, pro, buy)}
                      placeholder="Enter quantity required"
                      style={{ borderRadius: "4px" }}
                    />
                  </td>
                  <td>{amount}</td>
                </tr>
              </tbody>
            }
          </table>

          <div className="d-flex flex-column orderItem-address">
            <h5
              style={{
                color: "rgb(35 15 125)",
                textAlign: "left",
                padding: "10px 0px 0px 8px",
              }}
            >
              CUSTOMER ADDRESS
            </h5>

            <div className="d-flex flex-column gap-2 ">
              <div className="d-flex flex-row ustify-content-between align-items-center px-2 pt-3 item-sel">
                <label className="formLabel">STATE</label>
                <span span style={{ padding: "0px 5px" }}></span>
                <select
                  onChange={(e) =>
                    setOrder({ ...order, buyer_state: e.target.value })
                  }
                  className="orderItem-sel"
                  name=""
                  id=""
                >
                  <option value="">Select State</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="TamilNadu">TamilNadu</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>

              <div className="d-flex flex-row justify-content-between align-items-center px-2 pt-3">
                <label className="formLabel">DISTRICT</label>
                <span style={{ padding: "0px 5px" }}></span>
                <input
                  onChange={(e) =>
                    setOrder({ ...order, buyer_dist: e.target.value })
                  }
                  className="ip1"
                  type="text"
                />
              </div>

              <div className="d-flex flex-row  gap-sm-3 px-2 pt-3">
                <label className="formLabel">PIN CODE</label>
                <span style={{ padding: "0px 5px" }}></span>
                <input
                  onChange={(e) =>
                    setOrder({ ...order, buyer_pin: e.target.value })
                  }
                  className="ip1"
                  type="text"
                />
              </div>

              <div className="d-flex flex-row px-2 pt-3">
                <label className="formLabel">MOBILE NO</label>
                <span style={{ padding: "0px 5px" }}></span>
                <input
                  onChange={(e) =>
                    setOrder({ ...order, buyer_mob: e.target.value })
                  }
                  className="ip1"
                  type="number"
                />
              </div>

              <div className="d-flex flex-row px-2 pt-3 item-sel">
                <label className="formLabel">DELIVERY MODE</label>
                <span style={{ padding: "0px 5px" }}></span>
                <select
                  onChange={(e) =>
                    setOrder({ ...order, order_mode: e.target.value })
                  }
                  className="orderItem-sel"
                  name=""
                  id=""
                >
                  {/* <option value="">Select delivery mode</option> */}
                  <option value="Ordinary">Ordinary</option>
                  <option value="FastTrack">FastTrack</option>
                  <option value="Express">Express</option>
                </select>
              </div>

              <div className="d-flex flex-row px-2 pt-3 item-sel">
                <label className="formLabel">ORDER STATUS</label>
                <span style={{ padding: "0px 5px" }}></span>

                <select
                  onChange={(e) =>
                    setOrder({ ...order, order_status: e.target.value })
                  }
                  className="orderItem-sel"
                  name=""
                  id=""
                >
                  <option value="Ordered">Ordered</option>
                  {/* <option value="Delivered">Delivered</option>
    <option value="Return">Return</option>
    <option value="Cancelled">Cancelled</option>  */}
                </select>
              </div>

              <div className="d-flex flex-row px-2 pt-3">
                <label className="formLabel">ADDRESS</label>
                <span style={{ padding: "0px 5px" }}></span>
                <textarea
                  onChange={(e) =>
                    setOrder({ ...order, buyer_address: e.target.value })
                  }
                  className="ip1"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="orderItem-item">
        <img src={pro?.product_url} className="orderItem-img" alt="pic" />

        <h5
          style={{
            padding: "0px 5px",
            textAlign: "left",
            color: "darkblue",
            marginTop: "10px",
          }}
        >
          TOTAL AMOUNT<span span style={{ padding: "0px 5px" }}></span>:{amount}
        </h5>

        <div className="d-flex flex-row px-2 gap-2 item-sel">
          <label className="formLabel-2">PAYMENT MODE</label>
          <span style={{ padding: "0px 5px" }}></span>
          <select
            onChange={(e) =>
              setOrder({ ...order, order_paymentMode: e.target.value })
            }
            className="orderItem-sel"
            name=""
            id=""
          >
            <option value="COD">COD</option>
            <option value="Bank">Bank</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
        <button onClick={() => handleOrder(order)} className="orderitem-btn">
          ORDER
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
