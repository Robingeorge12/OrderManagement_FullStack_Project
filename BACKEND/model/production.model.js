import mongoose from "mongoose";

const ProductionShema = mongoose.Schema({

    buyer_id:{type: String,ref:"UserSchema"},
    buyer_name:{type: String, trim: true,required:true},
    product_id:{type: String, trim: true,ref:"ItemModel" },


    production_quantity: { type: Number, required: true, trim: true },
    production_price: { type: Number, required: true, trim: true },
production_item:{type: String, trim: true,required:true},

production_amount:{type: Number, required: true, trim: true},


    production__item_id: { type: String, default:function(){
     let RandId = Math.floor( 100000+ Math.random()*7000)
     return RandId.toString();
    },trim: true },//uuid
 

    production_order_date :{type:Date, default:new Date()},
    production_supply_date :{type:Date}

})

export const ProductionModel = mongoose.model("production",ProductionShema)