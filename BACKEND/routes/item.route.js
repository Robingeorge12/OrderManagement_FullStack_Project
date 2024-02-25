import express from "express"
import { isAuth } from "../middleware/auth.js"
import { isAdmin } from "../middleware/authorize.js"
import { addingItem, delete_item, edit_item_data, getAllItem, production_AddQuantity, update_Cancel_quantity, update_Cancel_quantityByUser, update_quantity } from "../controller/item.controller.js"
 

export const itemRouter = express.Router()

itemRouter.get("/",isAuth,getAllItem)
itemRouter.post("/add_item",isAuth,isAdmin,addingItem)
itemRouter.patch("/update/:id",isAuth,isAdmin,edit_item_data)
itemRouter.patch("/updateQty/:id",isAuth,update_quantity)
itemRouter.patch("/editCancel_quant/:id",isAuth,isAdmin,update_Cancel_quantity)
itemRouter.patch("/editCancel_userQuant/:id",isAuth,update_Cancel_quantityByUser)
itemRouter.patch("/production_Quantity/:id",isAuth,isAdmin,production_AddQuantity);
itemRouter.delete("/remove/:id", isAuth, isAdmin, delete_item)   
;