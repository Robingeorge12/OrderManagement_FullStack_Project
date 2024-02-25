import { createSlice } from "@reduxjs/toolkit";
import { UpdateQuantity, UpdateQuantity_ByAdmin_Cancel, del_single_Item, get_All_Item, get_user_item_data, post_New_Item, production_Quantity_Update } from "./action";

const initialState = {
    product: [],
  isLoading: false,
  isError: false, 
  isAddProduct:"",
  failedReq:{},
  order_buyer:[],
  order_product :[]
};

export const itemSlice = createSlice({
  name: "item",
  initialState: initialState,
  extraReducers:(builder)=>{

    builder.addCase(get_All_Item.pending,(state,action)=>{

      state.isLoading = true;
      state.isError = false;

    }).addCase(get_All_Item.fulfilled,(state,action)=>{

      state.isLoading = false;
      state.isError = false;
      console.log(action.payload)
      state.product = action.payload

    }).addCase(get_All_Item.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload.message.message)
      state.failedReq = {...state.failedReq,...action.payload.message.message}

    })


    builder.addCase(del_single_Item.pending,(state,action)=>{

      state.isLoading = true;
      state.isError = false;
      // console.log(action)

    } ).addCase(del_single_Item.fulfilled,(state,action)=>{

      state.isLoading = false;
      state.isError = false;
      console.log(action)

    } ).addCase(del_single_Item.rejected,(state,action)=>{

      state.isLoading = false;
      state.isError = false;
      console.log(action)

    } )





    builder.addCase(get_user_item_data.pending,(state,action)=>{

      state.isLoading = true;
      state.isError = false;
      // console.log(action.payload)

    } ).addCase(get_user_item_data.fulfilled,(state,action)=>{

      state.isLoading = false;
      state.isError = false;
      console.log(action.payload)
      let {buyer,product} = action.payload
      console.log(buyer,product)
      state.order_buyer = buyer;
      state. order_product = product

    } ).addCase(get_user_item_data.rejected,(state,action)=>{

      state.isLoading = false;
      state.isError = true;
      console.log(action.error)

    } )
 


    builder.addCase(UpdateQuantity.pending,(state,action)=>{

      state.isLoading = true;
      state.isError = false;
      // console.log(action.payload)

    } ).addCase(UpdateQuantity.fulfilled,(state,action)=>{

      state.isLoading = false;
      state.isError = false;
      console.log(action.payload)
    

    } ).addCase(UpdateQuantity.rejected,(state,action)=>{

      state.isLoading = false;
      state.isError = true;
      console.log(action.error)

    } )


    
    
    builder.addCase(post_New_Item.pending,(state,action)=>{

      state.isLoading = true;
      state.isError = false; 
      // console.log(action.payload)

    } ).addCase(post_New_Item.fulfilled,(state,action)=>{

      state.isLoading = false;
      state.isError = false;
      console.log(action.payload)
    

    } ).addCase(post_New_Item.rejected,(state,action)=>{

      state.isLoading = false;
      state.isError = true;
      console.log(action.error)

    } )


    builder.addCase(UpdateQuantity_ByAdmin_Cancel.pending,(state,action)=>{

      state.isLoading = true;
      state.isError = false; 
      // console.log(action.payload)

    } ).addCase(UpdateQuantity_ByAdmin_Cancel.fulfilled,(state,action)=>{

      state.isLoading = false;
      state.isError = false;
      console.log(action.payload)
      state.isAddProduct = action.payload
    

    } ).addCase(UpdateQuantity_ByAdmin_Cancel.rejected,(state,action)=>{

      state.isLoading = false;
      state.isError = true;
      console.log(action.error)
      state.failedReq = action.payload 

    } )




      builder
        .addCase(production_Quantity_Update.pending, (state, action) => {
          state.isLoading = true;
          state.isError = false;
          // console.log(action.payload)
        })
        .addCase(production_Quantity_Update.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          console.log(action.payload);

          state.isAddProduct = action.payload;
        })
        .addCase(production_Quantity_Update.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          console.log(action.payload);
          state.failedReq = action.payload.message;
        });

   

  }

})

export default itemSlice.reducer