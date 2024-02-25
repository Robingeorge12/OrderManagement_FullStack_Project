import mongoose, { mongo } from "mongoose";

const OrderSchema = mongoose.Schema({
  buyer_id: { type: mongoose.Schema.ObjectId, trim: true, ref: "UserSchema" },
   buyer_name :{type:String,required:true, trim:true},
   buyer_email:{type:String,required:true, trim:true},
  buyer_address: { type: String, required: true, trim: true },

  buyer_pin: { type: String, required: true, trim: true },
  buyer_mob: { type: Number, required: true, trim: true },
  buyer_state: { type: String, required: true, trim: true },
  buyer_dist: { type: String, required: true, trim: true },
  productId:{type: String, required: true, trim: true},
  product_price:{type: Number, default: 0, required: true, trim: true},
  order_id: {
    type: String, 
    trim: true,
    default: function () {
      let randomDigit = Math.floor(100000 + Math.random() * 9000);
      return randomDigit
    },
    unique: true,
  }, //uuid
  order_amount: { type: Number, required: true, trim: true },
  order_Item: { type: String, required: true, trim: true },
  order_quantity: { type: Number, required: true, trim: true },

  order_mode: {
    type: String,
    enum: ["Ordinary", "FastTrack", "Express"],
    default: "Ordinary",
  },
  order_status: { 
    type: String,
    default: "Ordered",
    enum: ["Ordered", "Delivered", "Return", "Cancelled"],
    trim: true,
  }, 
  order_paymentMode: {
    type: String,
    enum: ["COD", "Bank", "UPI"],
    default: "COD",
  },
  expected_delivery: { type: Date },
  order_date: { type:Date, default:new Date() },
});

export const OrderModel = mongoose.model("order", OrderSchema);
