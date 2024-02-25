import React, { useEffect, useState } from 'react'
import "./ProductionList.css"
import { useDispatch, useSelector } from 'react-redux';
import { delete_production, get_production } from '../../Redux/productionAction';
import AdditionalOrder from '../AdditionalOrder/AdditionalOrder';

function ProductionList() {
const dispatch = useDispatch();
  const [bool, setBool] = useState(false)
   const [bool2, setBool2] = useState(false);
  const [data,setData] = useState()
const {product,isError,isLoading,isfail} = useSelector((state)=>state.production)
useEffect(()=>{

dispatch(get_production())
 
},[])

const handleDelete = (id)=>{

    dispatch(delete_production(id))
}
console.log(isfail)

const refreshToast = ()=>{
    // setBool(false)
    window.location.reload()
  }

  
  const handleAdditional = (val)=>{
    console.log(val)
    setBool2(!bool2)
    setData(val)
  }
  console.log(data)



  if(isfail){
  
    return <div className='toast-item'>
    
    <div className="toast fade show toast-item-div" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-body">
             {isfail.message}
            <div className="mt-2 pt-2 border-top">
             
              <button type="button" className="btn btn-secondary btn-sm" onClick={refreshToast} data-bs-dismiss="toast">Close</button>
            </div>
          </div>
        </div>
       
    
        </div>
  
  }

if(isLoading){

    return(
      <div className="spinner-border  text-success lod" style={{width: "5rem", height: "5rem"}} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    )
  }
  
  console.log(product)
  return (
    <div className="productionlist-cont">
      <h5 style={{ marginTop: "10px", color: "darkorange" }}>
        PRODUCTION REQUEST LIST
      </h5>
      {bool2 && <AdditionalOrder setBool2={setBool2} bool2={bool2} data={data} />}
      <div className="table-responsive table-cont">
        <table className="table table-striped table-hover">
          <thead>
            <tr style={{ backgroundColor: "lightcoral", color: "red" }}>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">REF-ID</th>
              <th scope="col">PRODUCT</th>

              <th scope="col">PRICE/UNIT</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">ORDER DATE</th>
              <th scope="col">AMOUNT</th>

              <th scope="col">**</th>
              <th scope="col">*</th>
            </tr>
          </thead>
          {product?.map((el, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{el.buyer_name}</td>
                  <td>{el.production__item_id}</td>
                  <td>@{el.production_item}</td>
                  <td>{el.production_price}</td>

                  <td>{el.production_quantity}</td>
                  <td>{el.production_order_date}</td>

                  <td>{el.production_amount}</td>

                  <td
                    onClick={() => handleAdditional(el)}
                    style={{ color: "green" }}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-fast-forward-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                      <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                    </svg>{" "}
                  </td>

                  <td
                    onClick={() => handleDelete(el._id)}
                    style={{ color: "maroon" }}
                    className="color-danger"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default ProductionList