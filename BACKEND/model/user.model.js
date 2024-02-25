import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchemaCreator = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: [true, "A user must have Name"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Enter Valid Password"],
    trim: true,
  },
    role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "buyer",
  },
  date:{type:Date, default:new Date()}


});

const UserSchema = mongoose.model("user_list", userSchemaCreator);

export  {UserSchema}
















// module.exports = UserSchema

  // mobileNo: {
  //   type: Number,
  //   required: [true, "Enter user Mobile Number"],
  //   unique: true,
  //   trim: true,
  // },
  // role: {
  //   type: String,
  //   enum: ["buyer", "seller", "admin"],
  //   default: "buyer",
  // },
  // address: {
  //   type: String,
  //   required: true,
  // },