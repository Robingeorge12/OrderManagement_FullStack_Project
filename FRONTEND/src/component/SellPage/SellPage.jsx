import React from 'react'
import "./SellPage.css"
import Sidebar from '../SideBar/Sidebar'
import SellList from './SellList'

function SellPage() {

  // if (isLoading) {
  //   return (
  //     <div
  //       className="spinner-border  text-success lod"
  //       style={{ width: "5rem", height: "5rem" }}
  //       role="status"
  //     >
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //   );
  // }


  return (
    <div className='container-fluid sellpage-cont'>
      
    <div className="sellpage_sidebar">
      <Sidebar />
    </div>
    <div className="sellpage_home">
       <SellList /> 
     
    </div>
    
        </div>
  )
}

export default SellPage