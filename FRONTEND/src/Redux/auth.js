import {createSlice} from "@reduxjs/toolkit"
import { signup } from "./action"
import { login } from "./action"

const init = {
 users:{},
 isLoading:false,
 isError:false,
 failHints:null,
 token:null,
 loginSucc:""

}
// token

export const authSlice = createSlice({

    name:"user",
    initialState:init,
    extraReducers:(builder)=>{

        builder.addCase(signup.pending,(state,action)=>{
            state.isLoading = true;
            state.isError = false;

        }).addCase(signup.fulfilled,(state,action)=>{

            state.isLoading = false;
            state.isError = false;
            console.log(action.payload)
            state.users = action.payload
        }).addCase(signup.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            console.log(action.payload.message)
            state.failHints = action.payload.message
        })



        builder.addCase(login.pending,(state,action)=>{

            state.isError = false;
            state.isLoading = true;

        }).addCase(login.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            console.log(action.payload)
           let token = action.payload.token;
            state.loginSucc = action.payload.message;
            state.token = action.payload.token;
            state.users = action.payload.login_user;
            console.log(action.payload.login_user)
            localStorage.setItem("user",JSON.stringify(action.payload.login_user))
            localStorage.setItem("token",JSON.stringify(token))

            
        }).addCase(login.rejected,(state,action)=>{
            
            state.isError = true;
            state.isLoading = false;
            console.log(action.payload.message.message)
            state.failHints = action.payload.message.message

        })

    }

})

export default authSlice.reducer