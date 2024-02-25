import React from "react";
import "./UserFilter.css";

function UserFilter({ handleCheck }) {
  return (
    <div className="userfilter-cont">
      <p className="filt-one"> ORDER</p>
      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            // value={"Ordered"}
            defaultValue={"Ordered"}
            onClick={handleCheck}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Ordered
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            // value={"Delivered"}
            defaultValue={"Delivered"}
            onClick={handleCheck}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Delivered
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            // value={"Return"}
            defaultValue={"Return"}
            onClick={handleCheck}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Return
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            // value={"Cancelled"}
            defaultValue={"Cancelled"}
            onClick={handleCheck}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Cancelled
          </label>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
}

export default UserFilter;
