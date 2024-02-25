import React from 'react'
import { useSelector } from 'react-redux'

function PrivillageRoute() {
    const {token} = useSelector((state) => state.user)
    let validToken = JSON.parse(localStorage.getItem("token"))
   
    console.log(token)
console.log(validToken)

if(validToken){
   return children
}

return <Navigate to="/login"/>

}

export default PrivillageRoute