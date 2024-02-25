import express from "express";
import { get_Production, product_Del, product_Order } from "../controller/production.controller.js"
import { isAuth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/authorize.js";

export const productionRouter = express.Router()


productionRouter.get("/",get_Production)
productionRouter.post("/receive",isAuth,product_Order)
productionRouter.delete("/delete/:id",isAuth,isAdmin,product_Del)
// productionRouter.patch("/edit/:id",isAuth,isAdmin,product_Del)
 