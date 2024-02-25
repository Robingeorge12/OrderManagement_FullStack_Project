import { createSlice } from "@reduxjs/toolkit"
import { delete_production, get_production, post_production } from "./productionAction";

const initialState = {
    product:[],
    isLoading:false,
    isError:false,
    isfail:""
}

const productionSlice = createSlice({
    name:"production",
    initialState:initialState,
    extraReducers:(builder)=>{



        builder.addCase(get_production.pending,(state,action)=>{

            state.isLoading = true;
            state.isError = false;
          
          }).addCase(get_production.fulfilled,(state,action)=>{
          
            state.isLoading = false;
            state.isError = false;
            console.log(action.payload)
            state.product = action.payload
            // window.location.reload()
            // state.singleUser = action.payload;
          
            
          }).addCase(get_production.rejected,(state,{payload})=>{
            state.isLoading = false;
            state.isError = true;
          console.log(payload)
             
          })



          builder.addCase(post_production.pending,(state,action)=>{

            state.isLoading = true;
            state.isError = false;
          
          }).addCase(post_production.fulfilled,(state,action)=>{
          
            state.isLoading = false;
            state.isError = false;
            console.log(action.payload)
            // state.product = action.payload
            // window.location.reload()
            // state.singleUser = action.payload;
          
            
          }).addCase(post_production.rejected,(state,{payload})=>{
            state.isLoading = false;
            state.isError = true;
          console.log(payload)
             
          })





          builder.addCase(delete_production.pending,(state,action)=>{

            state.isLoading = true;
            state.isError = false;
          
          }).addCase(delete_production.fulfilled,(state,action)=>{
          
            state.isLoading = false;
            state.isError = false;
            console.log(action)
            // state.product = action.payload
            // window.location.reload()
            // state.singleUser = action.payload;
           
            
          }).addCase(delete_production.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
          console.log(action.payload)
          state.isfail = action.payload
             
          })


    }
})


export default productionSlice.reducer 