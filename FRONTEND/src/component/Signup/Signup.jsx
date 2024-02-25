import React from 'react'
import "./Signup.css"
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../Redux/action'
import "bootstrap/dist/js/bootstrap.bundle.min";

function Signup() {

    const dispatch = useDispatch();
    const { users, isLoading, isError,failHints } = useSelector((state) => {
        return state.user;
      });

// console.log(failHints)
// console.log(failHints)
const formik = useFormik({
    initialValues:{
        name:"",
        email:"",
        password:"",
        role:"buyer"
    },
    onSubmit: async(value)=>{
// must use async await
        //  console.log(value)
        await dispatch(signup(value))
         formik.resetForm();
    }
})

const refreshToast = ()=>{
    window.location.reload();
}

if(failHints){

    return <div className='toast-div'>

<div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-body">
         {failHints}
        <div className="mt-2 pt-2 border-top">
         
          <button type="button" className="btn btn-secondary btn-sm" onClick={refreshToast} data-bs-dismiss="toast">Close</button>
        </div>
      </div>
    </div>
   

    </div>
}



  return (
    <div className='container-sm d-flex justify-content-center align-items-center signup-cont'>
        
{/* 
{ failHints && <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-body">
         {failHints}
        <div className="mt-2 pt-2 border-top">
         
          <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
        </div>
      </div>
    </div>
   
} */}

        <form  onSubmit={formik.handleSubmit} className ='my-5 p-3 d-flex flex-column justify-content-start rounded-2 form-cont'>
  <div className="mb-3 d-flex flex-column justify-content-start align-items-start">
   
    <label htmlFor="exampleInputName1" className="form-label">Name</label>
    <input type="text" value={formik.values.name} name="name" onChange={formik.handleChange} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
    
  </div>


  <div className="mb-3 d-flex flex-column justify-content-start align-items-start">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
      </div>

  <div className="mb-3 d-flex flex-column justify-content-start align-items-start">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange}  className="form-control" id="exampleInputPassword1" />
  </div>


  <div className="mb-3 d-flex flex-column justify-content-start align-items-start">
          <label htmlFor="exampleSelect" className="form-label">Role</label>
          <select name="role" value={formik.values.role} onChange={formik.handleChange}  className="form-select">
            <option value={"buyer"}>Buy</option>
            <option value={"admin"}>Admin</option>
            <option value={"seller"}>Seller</option>
          </select>
        </div>

<div className='mb-3 d-flex align-items-start py-2 justify-content-start signup-text'>

<p className='m-0'>Already have an account?</p>
<p className='m-0'><Link className='text-warning fw-bold' style={{textDecoration:"none",paddingLeft:"10px"}} to="/login">login</Link></p> 

</div>
 
  <button type="submit" className="btn btn-info text-white fw-bold signup-btn">Signup</button>

  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</form>

    </div>
  )
}

export default Signup