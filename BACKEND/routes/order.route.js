import express from "express";
import { editOrders, cancelOrders,getOrders, get_buyer_item_data,
     postOrders, removeOrders, filter_order,userOnly_orders, filter_OnlyUser_order, getOrdersHome, removeByUSer } from "../controller/order.controller.js";
import { isAuth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/authorize.js";
// import { update_Cancel_quantity } from "../controller/item.controller.js";

export const orderRouter = express.Router()


orderRouter.get("/",getOrders)
orderRouter.get("/home",getOrdersHome)
orderRouter.get("/user_order_data",isAuth,userOnly_orders)
orderRouter.get("/:id",isAuth,get_buyer_item_data)
orderRouter.post("/filter_user",isAuth,filter_OnlyUser_order)
orderRouter.post("/add",isAuth,postOrders)
orderRouter.patch("/edit/:id",isAuth,isAdmin,editOrders)
orderRouter.patch("/cancel/:id",isAuth,cancelOrders)
orderRouter.delete("/remove/:id",isAuth,isAdmin,removeOrders)
// orderRouter.get("/user_order_data",isAuth,userOnly_orders)
orderRouter.delete("/removeByUSer/:id", isAuth, removeByUSer);
orderRouter.post("/filter", filter_order)
