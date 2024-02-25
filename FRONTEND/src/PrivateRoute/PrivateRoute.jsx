import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute({tokenVal,setTokenVal}) {
    // const navigate = useNavigate()
    const [val,setVal] = useState(tokenVal || null)
    // const {token} = useSelector((state) => state.user)
    let validToken = JSON.parse(localStorage.getItem("token"))
    const token = useSelector((state) => state.user.token);

    if (validToken) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }

}

export default PrivateRoute