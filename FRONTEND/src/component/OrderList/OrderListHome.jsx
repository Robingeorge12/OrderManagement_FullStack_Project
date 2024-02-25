import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import "./OrderListHome.css"
import OrderList from './OrderList'

function OrderListHome() {
  return (
    <div className='container-fluid orderlisthome-cont'>
      
    <div className="orderlisthome_sidebar">
      <Sidebar />
    </div>
    <div className="orderlisthome_home">
      
    <OrderList />
    </div>
    
        </div>
  )
}
 
export default OrderListHome