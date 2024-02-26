import { createSlice } from "@reduxjs/toolkit";
import {  get_user_item_data,post_Order } from "./action";
import {
  Only_User_orderFilter, UserOnly_order,
  cancelOrder_Byuser, delete_Orders, editOrder,
  filter_Order, get_ALL_orders, get_home
} from "./orderAction";

const initialState = {
  orders: [],
  totalLength: 0,
  // page: 1;
    homeData:[],
    filterData:[],
  isLoading: false,
  isError: false, 
  isAddProduct:"",
  isOrderStatus:"",
  failedReq:{},
  order_buyer:[],
  order_product :[],
  singleUser:[]
};

export const orderSlice = createSlice({
    name:"order",
    initialState:initialState,
    extraReducers:(builder)=>{


        builder.addCase(post_Order.pending,(state,action)=>{

            state.isLoading = true;
            state.isError = false;
      
          }).addCase(post_Order.fulfilled,(state,action)=>{
      
            state.isLoading = false;
            state.isError = false;
            console.log(action.payload)
            state.isAddProduct = "Successfully Ordered"
            // state.product = action.payload
      
          }).addCase(post_Order.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            console.log(action.payload)
            // state.failedReq = {...state.failedReq,...action.payload.message.message}
      
          })
      


builder.addCase(get_ALL_orders.pending,(state,action)=>{

  state.isLoading = true;
  state.isError = false;

}).addCase(get_ALL_orders.fulfilled,(state,action)=>{

  state.isLoading = false;
  state.isError = false;
  // console.log(action.payload)
  state.totalLength = action.payload.totalLength
  state.orders = action.payload.message
  
}).addCase(get_ALL_orders.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError = true;
    // state.failedReq = {...state.failedReq,...action.payload.message.message}
})

      
      
      
      
builder
  .addCase(filter_Order.pending, (state, action) => {
    state.isLoading = true;
    state.isError = false;
  })
  .addCase(filter_Order.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    // console.log(action.payload);
    state.totalLength = action.payload.totalLen;
    state.orders = action.payload.message;
    state.filterData = action.payload.message;
    // state.filterData = action.payload;

    // can i store it in order (actual array) or like this in different page
    // window.location.reload()
  })
  .addCase(filter_Order.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    // state.failedReq = {...state.failedReq,...action.payload.message.message}
  });
      
      
      

builder.addCase(get_home.pending,(state,action)=>{

  state.isLoading = true;
  state.isError = false;

}).addCase(get_home.fulfilled,(state,action)=>{

  state.isLoading = false;
  state.isError = false;
  // console.log(action.payload)
  state.homeData = action.payload
  
}).addCase(get_home.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError = true;
    // state.failedReq = {...state.failedReq,...action.payload.message.message}
})




builder.addCase(editOrder.pending,(state,action)=>{

  state.isLoading = true;
  state.isError = false;

}).addCase(editOrder.fulfilled,(state,action)=>{

  state.isLoading = false;
  state.isError = false;
  console.log(action.payload)
  state.isOrderStatus = "Order Status Has Been Changed"
  window.location.reload()
  
}).addCase(editOrder.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError = true;
    // state.failedReq = {...state.failedReq,...action.payload.message.message}
})






builder.addCase(UserOnly_order.pending,(state,action)=>{

  state.isLoading = true;
  state.isError = false;

}).addCase(UserOnly_order.fulfilled,(state,action)=>{

  state.isLoading = false;
  state.isError = false;
  console.log(action.payload)
  state.singleUser = action.payload;

  
}).addCase(UserOnly_order.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError = true;
    // state.failedReq = {...state.failedReq,...action.payload.message.message}
})



builder.addCase(Only_User_orderFilter.pending,(state,action)=>{

  state.isLoading = true;
  state.isError = false;

}).addCase(Only_User_orderFilter.fulfilled,(state,action)=>{

  state.isLoading = false;
  state.isError = false;
  console.log(action.payload)
  state.singleUser = action.payload;

  
}).addCase(Only_User_orderFilter.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError = true;
    // state.failedReq = {...state.failedReq,...action.payload.message.message}
})



builder.addCase(cancelOrder_Byuser.pending,(state,action)=>{

  state.isLoading = true;
  state.isError = false;

}).addCase(cancelOrder_Byuser.fulfilled,(state,action)=>{

  state.isLoading = false;
  state.isError = false;
  console.log(action.payload)
  state.failedReq = action.payload
  window.location.reload()
  // state.singleUser = action.payload;

  
}).addCase(cancelOrder_Byuser.rejected,(state,{payload})=>{
  state.isLoading = false;
  state.isError = true;
console.log(payload)
    state.failedReq = payload
})



builder.addCase(delete_Orders.pending,(state,action)=>{

  state.isLoading = true;
  state.isError = false;

}).addCase(delete_Orders.fulfilled,(state,action)=>{

  state.isLoading = false;
  state.isError = false;
  console.log(action.payload)
  state.failedReq = action.payload
  window.location.reload()
  // state.singleUser = action.payload;

  
}).addCase(delete_Orders.rejected,(state,{payload})=>{
  state.isLoading = false;
  state.isError = true;
console.log(payload)
    state.failedReq = payload
})

    }
})

export default orderSlice.reducer