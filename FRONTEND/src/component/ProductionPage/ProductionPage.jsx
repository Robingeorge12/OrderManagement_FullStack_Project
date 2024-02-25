import React from 'react'
import "./ProductionPage.css"
import { useDispatch } from 'react-redux';
import { post_production } from '../../Redux/productionAction';

function ProductionPage({data,setData}) {
    const dispatch = useDispatch();

console.log(data)
    // post_production
    const handlePost = (val)=>{

        setData({
          ...data,
          production_quantity:val,
          production_amount:val*data.production_price
        })
    }

const handleOrder = ()=>{

    console.log(data)
    dispatch(post_production(data))
}


    // console.log(data)
  return (
    <div className=''>
       
       <button type="button" className="modal_but" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">WANT MORE </button>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: "none"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-color-info" id="exampleModalLabel" style={{color:"chocolate"}}>PRODUCTION REQUEST</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="production-ip">

            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">PRODUCT NAME:</label>
                <input type="text" value={data.production_item}  className="form-control" id="recipient-name" />
              </div>

              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">REQUIRED QUANTITY</label>
                <input type="number" onChange={(e)=>handlePost(e.target.value)} className="form-control" placeholder='PLEASE ENTER QUANTITY REQUIRED' id="recipient-name" />
              </div>
            
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
            <button type="button" onClick={handleOrder}  data-bs-dismiss="modal" className="btn btn-primary">ORDER</button>
          </div>
        </div>
      </div>
    </div>


        </div>
  )
}

export default ProductionPage