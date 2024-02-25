import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import cors from "cors"
import {connection} from "./db/db.js" 
import userRoute from "./routes/user.route.js"
import { itemRouter } from './routes/item.route.js';
import { orderRouter } from './routes/order.route.js';
import { productionRouter } from './routes/production.route.js';


const app = express()
app.use(cors())
app.use(express.json())

let PORT = process.env.PORT || 8900




app.use("/signup",userRoute)
app.use("/item",itemRouter )
app.use("/order",orderRouter)
app.use("/production",productionRouter)



app.listen(PORT,async()=>{

    try{
        await connection
        console.log(PORT)
    }catch(er){
        console.log(er)
    }
  
})

let currentDate = new Date();
console.log(currentDate);

// Modify the date
currentDate.setDate(currentDate.getDate() + 26);

// Convert to string if needed
let modifiedDate = currentDate.toString();
// console.log(modifiedDate);
