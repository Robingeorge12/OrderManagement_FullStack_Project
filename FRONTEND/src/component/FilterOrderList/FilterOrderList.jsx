import React from 'react'
import "./FilterOrderList.css";

function FilterOrderList({ handleChange, formData, setFormData, }) {
    
   

  return (
    <div>
      <div className="dropdown-menu drope-menu">
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
                id="flexCheckDefaults1"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults1">
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
                id="flexCheckDefaults2"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults2">
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
                id="flexCheckDefaults3"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults3">
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
                id="flexCheckDefaults4"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults4">
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
                id="flexCheckDefaults5"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults5">
                None
              </label>
            </div>
          </div>
        </div>
        {/* sd////////////////////////////////////////////////////////////// */}

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
                id="flexCheckDefaultt1"
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
                id="flexCheckDefaultt2"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {/* order_mode */}
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
                id="flexCheckDefaultt3"
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
                id="flexCheckDefaultt4"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                None
              </label>
            </div>
          </div>
        </div>
        {/* asd//////////////////////////////////////////////////////////////////////////////////// */}

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
                id="flexCheckDefaultp1"
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
                id="flexCheckDefaulp2"
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
                id="flexCheckDefaultp3"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {/* order_mode */}
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
                id="flexCheckDefaultp4"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                None
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterOrderList