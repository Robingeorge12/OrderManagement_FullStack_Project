import React from 'react'
import "bootstrap/dist/js/bootstrap.bundle.min";
import { GiFeatheredWing } from "react-icons/gi";
import "./Navbar.css"
import { Link } from 'react-router-dom';

function Navbar() {

  let userData = JSON.parse(localStorage.getItem("user"));
  const logOut = () => {

     localStorage.removeItem("user");
     localStorage.removeItem("token");
    window.location.reload();
  }
  console.log(userData)

  return (
    <div className="p-3 m-0 border-0 bd-example m-0 border">
      <nav className="navbar navbar-expand-lg bg-info-subtle">
        <div className="container-fluid">
          <a
            className="navbar-brand d-flex align-items-center justify-content-center nav-head"
            href="/"
          >
            <span className="nav-icon">
              <GiFeatheredWing
                className="tt"
                style={{ color: "cyan", width: "50px", height: "50px" }}
              />
            </span>
            <span className=" nav-h1">ODRMAT</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/"
                  style={{ color: "#230F7D", fontWeight: "600" }}
                >
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/items"
                  style={{ color: "#230F7D", fontWeight: "600" }}
                >
                  PRODUCT
                </a>
              </li>
              {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/sell" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            SELL
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/">HOME</a></li>
            <li><a className="dropdown-item" href="/items">PRODUCT</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="/sell">SELL</a></li>
          </ul>
        </li> */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/sell"
                  style={{ color: "#230F7D", fontWeight: "600" }}
                >
                  SELL
                </a>
              </li>
            </ul>
            <form className="d-flex gap-2 align-items-center justify-content-center" role="search">
              {userData ? 
             <> <div
                className="nav-log mt-2"
                style={{ color: "#230F7D", fontWeight: "600" }}
              >
                <img
                  src="data:image/jpeg;base64,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"
                  className="rounded-circle bor"
                  alt=""
                />

                {userData?.name}
              </div>
              <button
                className="btn rounded-pill mt-2 h6"
                type="submit"
                onClick={logOut}
                style={{ color: "darkorange", border: "1px solid darkorange" }}
              >
                LOGOUT
              </button> </>:<> <button className="btn border border-success-subtle">
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "darkgreen",
                    fontWeight: "600",
                  }}
                >
                  LOGIN
                </Link>
              </button> </>}
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar