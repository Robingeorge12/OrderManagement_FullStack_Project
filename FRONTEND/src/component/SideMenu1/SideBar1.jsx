import React, { useState } from 'react'
import "./SideBar1.css"
 
function SideBar1({ formData ,setFormData ,handleChange }) {

  // console.log(formData)
   
  
   
  return (
    <div className="sidebar1">
      <p className="filt-one"> ORDER</p>

      <div>
        <div className="d-flex dropdown-item gap-1 m-0 px-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value={"Ordered"}
              name="order_status"
              defaultChecked={formData.order_status === "Ordered"}
              onChange={handleChange}
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
              type="radio"
              value={"Delivered"}
              name="order_status"
              defaultChecked={formData.order_status === "Delivered"}
              onChange={handleChange}
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
              type="radio"
              value={"Return"}
              name="order_status"
              defaultChecked={formData.order_status === "Return"}
              onChange={handleChange}
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
              type="radio"
              value={"Cancelled"}
              name="order_status"
              defaultChecked={formData.order_status === "Cancelled"}
              onChange={handleChange}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Cancelled
            </label>
          </div>
        </div>
        <div className="d-flex dropdown-item gap-1 m-0 px-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="order_status"
              value=""
              defaultChecked={!formData.order_status}
              onChange={handleChange}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              None
            </label>
          </div>
        </div>
      </div>
      <p className="filt-one"> TRANSPORT</p>

      <div>
      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value={"Ordinary"}
            name="order_mode"
            defaultChecked={formData.order_mode === "Ordinary"}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Ordinary
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value={"FastTrack"}
            name="order_mode"
            defaultChecked={formData.order_mode === "FastTrack"}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
           
            FastTrack
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value={"Express"}
            name="order_mode"
            defaultChecked={formData.order_mode === "Express"}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Express
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="order_mode"
            value=""
            defaultChecked={!formData.order_mode}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            None
          </label>
        </div>
      </div>
      </div>

      <p className="filt-one"> PAYMENT</p>

      <div>
      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value={"COD"}
            name="order_paymentMode"
            defaultChecked={formData.order_paymentMode === "COD"}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            COD
          </label>
        </div>
      </div>
      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value={"UPI"}
            name="order_paymentMode"
            defaultChecked={formData.order_paymentMode === "UPI"}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            UPI
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value={"Bank"}
            name="order_paymentMode"
            defaultChecked={formData.order_paymentMode === "Bank"}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
      
            Bank
          </label>
        </div>
      </div>

      <div className="d-flex dropdown-item gap-1 m-0 px-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="order_paymentMode"
            value=""
            defaultChecked={!formData.order_paymentMode}
            onChange={handleChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            None
          </label>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SideBar1