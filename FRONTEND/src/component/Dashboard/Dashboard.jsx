import React from 'react'
import "./Dashboard.css"
import Sidebar from '../SideBar/Sidebar'
import Home from '../Home/Home'
import Item from '../ItemPage/Item'

function Dashboard() {
  // d-flex align-items-center justify-content-center gap-2
  return (
    <div className='container-fluid dash-cont'>
      
<div className="dash_sidebar">
  <Sidebar />
</div>
<div className="dash_home">
   <Home /> 
  {/* <Item /> */}
</div>

    </div>
  )
}

export default Dashboard