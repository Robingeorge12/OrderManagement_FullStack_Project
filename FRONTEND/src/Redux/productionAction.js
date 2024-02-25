import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const post_production = createAsyncThunk("production/post_production",async(payload,options)=>{


    try{
        console.log(payload)

        const token = JSON.parse(localStorage.getItem("token"))
        let auth = {
          headers:{
            Authorization:token,
          }
        } 
        // console.log(auth.headers)
    
            const res = await axios.post(
              `https://steph-ordermanagement.onrender.com/production/receive`,
              payload,
              auth
            );
            console.log(res.data.message)
        
            return res.data.message
        
    
      }catch(er){ 
    
    const {rejectWithValue} = options
    console.log(er)
    return rejectWithValue({message:er})
      }


})


export const get_production = createAsyncThunk("production/get_production",async(payload,options)=>{


        try{
       
      
          // console.log(token)
      let res = await axios.get(
        `https://steph-ordermanagement.onrender.com/production`
      );
      console.log(res.data.message)
        return res.data.message
        }catch(er){
      
      
          const { rejectWithValue } = options;
          console.log(er);
          return rejectWithValue({ message: er });
      
        }
      
   
    

})

export const delete_production = createAsyncThunk("production/delete_production",async(payload,options)=>{
    
    try{
        console.log(payload)
   
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;
    const token = JSON.parse(localStorage.getItem("token"));
let auth = {
  headers: { Authorization: token },
};
      
        // console.log(token)
    let res = await axios.delete(
      `https://steph-ordermanagement.onrender.com/production/delete/${payload}`,
      { ...auth, role }
    );
    console.log(res.data.message)
      return res.data.message
      }catch(er){
    
    
        const { rejectWithValue } = options;
        console.log(er.response.data.message);
        return rejectWithValue({ message:er.response.data.message });
    
      }

})