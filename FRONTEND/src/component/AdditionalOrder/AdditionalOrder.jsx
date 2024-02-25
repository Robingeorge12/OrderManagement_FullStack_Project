import React, { useEffect, useState } from 'react'
import "./AdditionalOrder.css"
import { useDispatch, useSelector } from 'react-redux';
import { production_Quantity_Update } from '../../Redux/action';
import "bootstrap/dist/js/bootstrap.bundle.min";
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';

function AdditionalOrder({ data, setBool2 ,bool2}) {
  const dispatch = useDispatch();
  const [bool, setBool] = useState(false);
  const [order, setOrder] = useState({
    quantity: data?.production_quantity,
    product_id: data?.product_id,
    // production_item: null,
    // production_amount: null,
  });
  console.log(data);
  // console.log(order);



  useEffect(() => {
    // Find the modal element by ID and open it
    const modal = document.getElementById("exampleModal");
    if (modal) {
      const bootstrapModal = new bootstrapBundleMin.Modal(modal);
      bootstrapModal.show();
    }
  }, [data]);  

  const { failedReq, isError, isLoading, isAddProduct } = useSelector(
    (state) => state.item
  );
  
  const handlePost = () => {};
  const handleOrder = () => {
   
    if (order.quantity && order.product_id && order.quantity > 0) {
      
      dispatch(production_Quantity_Update(order));
      setBool2(!bool2);
    } else {
      alert("Quantity should be greater than 0");
      setBool2(!bool2);
    }
  };

  const refreshToast2 = () => {
    setBool(!false);
    window.location.reload();
  };

  if (Object.keys(failedReq)?.length) {
    return (
      <div className="toast-item loadingAd">
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
        className="ext-success lodAdd"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="">Loading...</span>
      </div>
    );
  }
  if (isAddProduct) {
    return (
      <div
        className="ext-success lodAdd"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="text-success">Success...,{isAddProduct}</span>
      </div>
    );
  }
    if (isError) {
      return (
        <h4 className="isError" style={{ color: "red.400" }}>
          {" "}
          Error ...
        </h4>
      );
    }

  return (
    <div className="">
      <button
        type="button"
        className="modal_but"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@getbootstrap"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-fast-forward-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" />
          <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" />
        </svg>{" "} */}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-color-info"
                id="exampleModalLabel"
                style={{ color: "chocolate" }}
              >
                PRODUCTION UPDATES
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="production-ip">
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    PRODUCT NAME:
                  </label>
                  <input
                    type="text"
                    defaultValue={data?.production_item}
                    className="form-control"
                    id="recipient-name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    SENT QUANTITY
                  </label>
                  <input
                    type="number"
                    onChange={(e) =>
                      setOrder({ ...order, quantity: e.target.value })
                    }
                    defaultValue={data?.production_quantity}
                    className="form-control"
                    placeholder="PLEASE ENTER QUANTITY REQUIRED"
                    id="recipient-name"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setBool2(!bool2)}
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleOrder}
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                PRODUCTION UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalOrder