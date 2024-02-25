import express from "express";
// import { postUserData } from "../controller/user.controller";
// const userRoute = express.Router();
import { Router } from "express";
import { signUp, signin } from "../controller/user.controller.js";
const userRoute = Router();

userRoute.post("/add_user",signUp);
userRoute.post("/signin",signin)

export default userRoute;