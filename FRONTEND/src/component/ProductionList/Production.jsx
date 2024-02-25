import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import ProductionList from './ProductionList'
import './Production.css'

function Production() {
  return (
    <div className='container-fluid productionAll-cont'>
      
    <div className="productionAll_sidebar">
      <Sidebar />
    </div>
    <div className="productionAll_home">
       {/* <Home />  */}
      <ProductionList  />
    </div>
    
        </div>
  )
}

export default Production