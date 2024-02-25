import React, { useEffect } from "react";
import "./Home.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import ChartPage from "../Chart/ChartPage";
import { useDispatch, useSelector } from "react-redux";
import { get_ALL_orders, get_home } from "../../Redux/orderAction";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from "react-chartjs-2";
import { get_production } from "../../Redux/productionAction";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { homeData, isLoading } = useSelector((state) => state.order);
  const { product } = useSelector((state) => state.production);

  ///https://steph-ordermanagement.onrender.com

  useEffect(() => {
    dispatch(get_home());
  }, []);
  useEffect(() => {
    dispatch(get_production());
  }, []);
  // console.log(homeData)
  //

  let cancelOrder = homeData.reduce((acc, el) => {
    if (el.order_status === "Cancelled") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  let delOrder = homeData.reduce((acc, el) => {
    if (el.order_status === "Delivered") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  let orderNew = homeData.reduce((acc, el) => {
    if (el.order_status === "Ordered") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  let orderRet = homeData.reduce((acc, el) => {
    if (el.order_status === "Return") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);
  const handleItemPage = () => {
    navigate("/items");
  };

  if (isLoading) {
    return (
      <div
        class="spinner-border  text-success lodHome"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column d-flex align-items-center
     justify-content-center home-cont"
    >
      <div className="top-bar">
        {userData ? (
          <>
            <div
              className="mx-4"
              style={{
                fontWeight: "bold",
                fontSize: "20px",

                color: "chocolate",
                fontStyle: "italic",
              }}
            >
              {" "}
              {userData.role}
            </div>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "darkblue",
              }}
            >
              {userData.name}
            </div>
          </>
        ) : null}

        <button
          onClick={handleItemPage}
          style={{ color: "cyan", backgroundColor: "rgb(35 15 125)" }}
          className="btn p-2 mx-4"
        >
          {" "}
          <span className="px-2" style={{ color: "cyan" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-folder-plus"
              viewBox="0 0 16 16"
            >
              <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
              <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5" />
            </svg>
          </span>
          Create Order
        </button>
      </div>

      <div className="row middle-bar">
        <div className="col-sm-12 col-md-6 col-lg-4 mb-md-3 mb-sm-3 mb-lg-2">
          <div className="card border-start border-4 border-primary border-top-0 border-bottom-0 border-end-4">
            <div className="card-body border border-primary d-flex justify-content-center align-items-center">
              <div className="middle-content">
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  TOTAL ORDER
                </h5>
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  {homeData.length}
                </h5>
              </div>
              <div className="middle-icon">
                <div className="middle-img">
                  <span style={{ color: "#387de1" }} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-database-fill-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1" />
                      <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 mb-md-3 mb-sm-3 mb-lg-2">
          <div className="card border-start border-4 border-primary border-top-0 border-bottom-0 border-end-4">
            <div className="card-body border border-primary d-flex justify-content-center align-items-center">
              <div className="middle-content">
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  TOTAL DELIVERED
                </h5>
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  {delOrder}
                </h5>
              </div>
              <div className="middle-icon">
                <div className="middle-img">
                  <span style={{ color: "cyan" }} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-truck-front-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0A2.5 2.5 0 0 0 1 2.5v9c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2v-9A2.5 2.5 0 0 0 12.5 0zM3 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.9c0 .625-.562 1.092-1.17.994C10.925 7.747 9.208 7.5 8 7.5s-2.925.247-3.83.394A1.008 1.008 0 0 1 3 6.9zm1 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2m8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-5-2h2a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 mb-md-3 mb-sm-3 mb-lg-2">
          <div className="card border-start border-4 border-primary border-top-0 border-bottom-0 border-end-4">
            <div className="card-body border border-primary d-flex justify-content-center align-items-center">
              <div className="middle-content">
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  NEW ORDERS
                </h5>
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  {orderNew}
                </h5>
              </div>
              <div className="middle-icon">
                <div className="middle-img">
                  <span style={{ color: "#1fe81fd4" }} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-house-add-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0v-1h-1a.5.5 0 1 1 0-1h1v-1a.5.5 0 0 1 1 0" />
                      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                      <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 mb-md-3 mb-sm-3 mb-lg-2">
          <div className="card border-start border-4 border-primary border-top-0 border-bottom-0 border-end-4">
            <div className="card-body border border-primary d-flex justify-content-center align-items-center">
              <div className="middle-content">
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  PRODUCTION
                </h5>
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  {product.length}
                </h5>
              </div>
              <div className="middle-icon">
                <div className="middle-img">
                  <span style={{ color: "rgb(251 246 29 / 83%)" }} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-clipboard2-data-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                      <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 mb-md-3 mb-sm-3 mb-lg-2">
          <div className="card border-start border-4 border-primary border-top-0 border-bottom-0 border-end-4">
            <div className="card-body border border-primary d-flex justify-content-center align-items-center">
              <div className="middle-content">
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>RETURN</h5>
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  {orderRet}
                </h5>
              </div>
              <div className="middle-icon">
                <div className="middle-img">
                  <span style={{ color: "#de4fde" }} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-arrow-left-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 mb-md-3 mb-sm-3 mb-lg-2">
          <div className="card border-start border-4 border-primary border-top-0 border-bottom-0 border-end-4">
            <div className="card-body border border-primary d-flex justify-content-center align-items-center">
              <div className="middle-content">
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>CANCEL</h5>
                <h5 style={{ color: "#0a50b6", fontWeight: "bold" }}>
                  {cancelOrder}
                </h5>
              </div>
              <div className="middle-icon">
                <div className="middle-img">
                  <span style={{ color: "#dc3545" }} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-x-octagon-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <ChartPage data={homeData} />
      </div>
    </div>
  );
}

export default Home;
