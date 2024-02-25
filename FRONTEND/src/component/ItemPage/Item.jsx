import React, { useEffect } from 'react'
import "./Item.css"
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { get_All_Item } from '../../Redux/action';
import Sidebar from '../SideBar/Sidebar';
import ProductList from './ProductList';

function Item() {
const navigate = useNavigate();
const dispatch = useDispatch();
const {product,failedReq, isError, isLoading,isAddProduct} = useSelector((state) => {
  return state.item
})

useEffect(()=>{
  
  dispatch(get_All_Item())

},[])

// console.log(product,failedReq)

  return (
    <div className='container-fluid item-cont'>
      
    <div className="item_sidebar">
      <Sidebar />
    </div>
    <div className="item_home">
       {/* <Home />  */}
      <ProductList product={product} failedReq={failedReq} isError={isError} isLoading={isLoading} isAddProduct={isAddProduct}  />
    </div>
    
        </div>
  )
}

export default Item