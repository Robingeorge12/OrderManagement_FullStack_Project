import { configureStore } from '@reduxjs/toolkit'
import  itemSlice  from './item.js'
import  authSlice  from './auth.js'
import  orderSlice  from './order.js'
import productionSlice from "./production.js"


export const store = configureStore({

    reducer :{

     
        item: itemSlice,
        user:authSlice,
        order:orderSlice,
        production:productionSlice
       
    },
})
// const store = configureStore({ reducer: rootReducer })