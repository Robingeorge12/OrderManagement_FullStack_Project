import React from 'react'
import "./Order.css"
import Sidebar from '../SideBar/Sidebar'
import OrderItem from './OrderItem'

function Order() {

    
  return (
    <div className='container-fluid order-cont'>
      
    <div className="order_sidebar">
      <Sidebar />
    </div>
    <div className="order_home">
       {/* <Home />  */}
      <OrderItem   />
    </div>
    
        </div>
  )
}

export default Order