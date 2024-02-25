import React from 'react'
import "./UserPageHome.css" 
import Sidebar from '../SideBar/Sidebar'
import UserPage from './UserPage'
 
function UserPageHome() {
  return (
    <div className='container-fluid userhome-cont'>
      
    <div className="userhome_sidebar">
      <Sidebar />
    </div>
    <div className="userhome_home">
    
    < UserPage />
    </div>
    
        </div>
  )
}

export default UserPageHome