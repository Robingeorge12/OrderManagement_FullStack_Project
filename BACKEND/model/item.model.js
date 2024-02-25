import mongoose from "mongoose";
 
const CreateItemSchema = mongoose.Schema({
  product_name: { type: String, required: true, trim: true },
  product_price: { type: Number, required: true, trim: true },
  product_category: [{ type: String, required: true, trim: true }],
  product_brand: { type: String, required: true, trim: true },
  product_quantity: { type: Number, required: true, trim: true },
  productId: { type: String, trim: true,default:function(){
    const randomDigit = Math.floor(100000+Math.random()*8000)
    return randomDigit.toString(); 
  } },//uuid 
  product_date: { type: Date, default: Date() },
  description: { type: String, trim: true, trim: true },
  product_url: {type: String, trim: true},
  product_count: { type: Number, trim: true,default:0 },
  seller:{type: String,ref:"UserSchema"},
  buyer:[{type: String,ref:"OrderModel"}]
});
 
const ItemModel = mongoose.model("item", CreateItemSchema);

export default ItemModel;


//product_size:{type:String,enum:["S","M","L","XL","XXL"],default:"L"}

//product_S_No:{type:Number,required:[true,"Must have a Quantity"]}
//product_M_No:{type:Number,required:[true,"Must have a Quantity"]}
//product_L_No:{type:Number,required:[true,"Must have a Quantity"]}
//product_XL_No:{type:Number,required:[true,"Must have a Quantity"]}
//product_XXL_No:{type:Number,required:[true,"Must have a Quantity"]}

//product_image_url:{type:String,required:true}
//product_thumb_url :[{type:String}]

// product_size
// "product_size"=[{
//     "size":M,
//     "quant":20
// },
// {
//     "size":L,
//     "quant":30
// }
// ]

