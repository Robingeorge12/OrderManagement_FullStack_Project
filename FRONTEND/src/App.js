import { useState } from "react";
import "./App.css";
import AllRoute from "./Routes/AllRoute";
import Dashboard from "./component/Dashboard/Dashboard";
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";
import Sidebar from "./component/SideBar/Sidebar";
import Footer from "./component/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoute />
      <Footer />
    </div>
  );
}

export default App;
