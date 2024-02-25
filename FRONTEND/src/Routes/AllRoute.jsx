import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "../component/Signup/Signup";
import Login from "../component/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../component/Dashboard/Dashboard";
import Item from "../component/ItemPage/Item";

import Order from "../component/Order/Order";

import OrderListHome from "../component/OrderList/OrderListHome";
import UserPageHome from "../component/UserPage/UserPageHome";
import Production from "../component/ProductionList/Production";
import SellPage from "../component/SellPage/SellPage";
import SellList from "../component/SellPage/SellList";


function AllRoute() {
  const navigate = useNavigate();
  const [tokenVal, setTokenVal] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  // / JSON.parse(localStorage.getItem("token"))
  // console.log(tokenVal)
  return (
    <Routes>

      <Route path="/signup" element={<Signup />} />
      <Route
        path="/login"
        element={<Login tokenVal={tokenVal} setTokenVal={setTokenVal} />}
      />

      <Route path="/" element={<Dashboard />} />
      <Route
        element={<PrivateRoute tokenVal={tokenVal} setTokenVal={setTokenVal} />}
      >
        <Route path="/list_orders" element={<OrderListHome />} />
        <Route path="/user-order" element={<UserPageHome />} />

        <Route path="/items" element={<Item />} />
        <Route path="/order" element={<Order />} />
        <Route path="/production" element={<Production />} />
        <Route path="/sell" element={<SellPage />} />
        {/* <Route path="/sold" element={<SellList />} /> */}
      </Route>

      {/* <>
{tokenVal ? 
          <Route path="/" element={<Dashboard />} />
         : 
          <Navigate to="/login" />
        }
    </> */}
    </Routes>
  );
}

export default AllRoute;
