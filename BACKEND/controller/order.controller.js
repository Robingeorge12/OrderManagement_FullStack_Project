import mongoose, { Mongoose } from "mongoose";
import ItemModel from "../model/item.model.js";
import { OrderModel } from "../model/order.model.js";
import { UserSchema } from "../model/user.model.js";

export const getOrders = async (req, res) => {
  try {
    let { page, sortVal, sortOrder } = req.query;
    // let page = req.body.payload
    // console.log("body", page, sortVal, sortOrder);
    // console.log("qury",req.query)
    const limit = 5;
    page =  page!==undefined ? page : 1;
    let sortOption = {}; 
// console.log("page",page)
    if (sortVal && sortOrder) {
      sortOption["order_amount"] = sortOrder === "asc" ? 1 : -1;
      // console.log("sp1", sortOption);
    }
    //  else {
    //   const randomSortOrder = Math.random() > 0.5 ? 1 : -1;
    //   sortOption['order_amount'] = randomSortOrder;
    // }
    // console.log("sp", sortOption);

    const list_orders = await OrderModel.find()
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!list_orders) {
      return res
        .status(201)
        .send({ message: "no order available", list_orders });
    }
    const list_orders2 = await OrderModel.find();
    let length = list_orders2.length;
    let totalLen = Math.ceil(length / limit)
    // console.log("len",totalLen)
    return res.status(200).send({ message: list_orders, "totalLength":totalLen });
  } catch (er) {
    console.log(er);
  }
};

export const filter_order = async (req, res) => {
  try {
      let { page, sortValfilt, sortOrderfilt } = req.query;
    const { order_status, order_mode, order_paymentMode } = req.body;
    console.log("filterOrdr", order_status, order_mode, order_paymentMode);
  

    let limit = 5
    console.log("filPage", page, sortValfilt, sortOrderfilt);
    let query = {};
    if (order_status) {
      query.order_status = order_status;
      console.log(query)

      // console.log(query.order_status = {...order_status});
    }
    if (order_mode) {
      query.order_mode = order_mode;
    }
    if (order_paymentMode) {
      query.order_paymentMode = order_paymentMode; 
    }

    // console.log("qq",query)
    // if (query) {
    let sortObj = {}
    
    if (sortOrderfilt && sortValfilt) {
      sortObj[sortValfilt] = sortOrderfilt === "asc" ? 1 : -1;
      console.log("filterSort", sortObj);
    } 

      let order = await OrderModel.find(query)
        .sort(sortObj)
        .skip((page - 1) * limit)
        .limit(limit);


    let length = order.length;
    let totalLen = Math.ceil(length / limit); 
      console.log(totalLen)
      return res.status(200).send({ message: order, "totalLen": totalLen });
      
    // }
//     else {
//       let order = await OrderModel.find()
//         .skip((page - 1) * limit)
//         .limit(limit);;
//  let length = order.length;
//  let totalLen = Math.ceil(length / limit);
//  console.log(totalLen);
//  return res.status(200).send({ message: order, totalLen: totalLen });

//     }

    // res.status(200).send({ message: "data" });
  } catch (er) {
    console.log(er);
  }
};


export const getOrdersHome = async (req, res) => {
  try {
    const list_orders = await OrderModel.find();

    if (!list_orders) {
      return res
        .status(201)
        .send({ message: "no order available", list_orders });
    }
    const list_orders2 = await OrderModel.find();
    let length = list_orders2.length;
    return res.status(200).send({ message: list_orders, length });
  } catch (er) {
    console.log(er);
  }
};

export const get_buyer_item_data = async (req, res) => {
  try {
    const { authorize_id } = req;
    const { id } = req.params;

    const buyer = await UserSchema.find({ _id: authorize_id });
    const item = await ItemModel.find({ _id: id });

    const result = {
      buyer: buyer,
      product: item,
    };
    console.log(result);
    res.status(200).send({ message: result });
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: er });
  }
};

export const postOrders = async (req, res) => {
  try {
    const { authorize_id } = req;

    const {
      buyer_email,
      buyer_address,
      buyer_pin,
      buyer_mob,
      buyer_state,
      buyer_dist,
      productId,
      product_price,
      order_id,
      order_amount,
      order_Item,
      order_brand,
      order_quantity,
      order_mode,
      order_status,
      order_paymentMode,
      order_date,
      expected_delivery,
    } = req.body;
    console.log("order page", product_price);
    const buyer = await UserSchema.findById({ _id: authorize_id });
    console.log(buyer);

    if (buyer) {
      const defaultValues = {
        order_mode: order_mode || "Ordinary",
        order_status: order_status || "Ordered",
        order_paymentMode: order_paymentMode || "COD",
        order_id:
          order_id || Math.floor(100000 + Math.random() * 9000).toString(),
        order_date: order_date || new Date(),
      };

      console.log(defaultValues.order_mode);

      let cal_delivery = new Date();
      let modifiedDate;
      if (defaultValues.order_mode === "Ordinary") {
        cal_delivery.setDate(cal_delivery.getDate() + 4);
        modifiedDate = cal_delivery.toString();
        console.log(modifiedDate);
      } else if (defaultValues.order_mode === "FastTrack") {
        cal_delivery.setDate(cal_delivery.getDate() + 3);
        modifiedDate = cal_delivery.toString();
      } else if (defaultValues.order_mode === "Express") {
        cal_delivery.setDate(cal_delivery.getDate() + 1);
        modifiedDate = cal_delivery.toString();
      }

      const payload = {
        buyer_id: authorize_id,
        buyer_name: buyer.name,
        buyer_email: buyer.email,
        buyer_address,
        buyer_pin,
        product_price,
        buyer_mob,
        buyer_state,
        buyer_dist,
        productId,
        order_id,
        order_amount,
        order_Item,
        order_brand,
        order_quantity,
        expected_delivery: modifiedDate,
        ...defaultValues,
      };
      // console.log(payload);
      const update_order = await OrderModel.create(payload);
      update_order.save();
      res.status(200).send({ message: update_order });
    }
  } catch (er) {
    console.log(er);
  }
};

export const userOnly_orders = async (req, res) => {
  try {
    console.log("user_id");
    const { authorize_id } = req;
    console.log(authorize_id);
    // const userId = new Mongoose.Types.ObjectId(authorize_id)
    // let user_id = userId.toString()

    const user = await UserSchema.findById(authorize_id);
    console.log(user);

    if (!user) {
      res
        .status(400)
        .send({ message: "Unauthorized User , This User doesn't exist" });
    }

    const id = user._id;
    const getAll_order_ofUser = await OrderModel.find({ buyer_id: id });
    console.log(getAll_order_ofUser);
    res.status(200).send({ message: getAll_order_ofUser });
  } catch (er) {
    res.status(500).send({ message: "Server Error", er });
  }
};

export const editOrders = async (req, res) => {
  try {
    const { role_id } = req;
    let userId = new mongoose.Types.ObjectId(role_id);
    let id_user = userId.toString();
    const { id } = req.params;

    let order_details = await OrderModel.findById(id);
    // console.log(order_details)
    let user_check = await UserSchema.findById(id_user);

    // console.log(user_check)
    if (!user_check) {
      res.status(400).send("message:", "User does't exists");
    }

    if (user_check.role !== "buyer") {
      let order_details = await OrderModel.findById(id);

      // order_details.order_status =
      // let updateOrder = await OrderModel.findOneAndUpdate({_id:role_id},)
      order_details.order_status = req.body.order_status;
      order_details.save();
      res.status(200).send({ message: "updated order status" });
    }
  } catch (er) {
    console.log(er);
    res.status(500).send("message:", "server error", er);
  }
};

export const cancelOrders = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("param",id)
    console.log("req bosdy", req.body);
    if (req.body.order_status == "") {
      return res.status(404).send({ message: "Wrong Request" });
    }

    let order_details = await OrderModel.findById(id);
    // console.log(order_details)

    // let updateOrder = await OrderModel.findOneAndUpdate({_id:role_id},)
    order_details.order_status = req.body.order_status;
    order_details.save();
    res.status(200).send({ message: "Updated Order Status By CUSTOMER" });
  } catch (er) {
    console.log(er);
    res.status(500).send("message:", "server error", er);
  }
};


export const filter_order2 = async (req, res) => {
  try {
    // const {order_mode,order_paymentMode} = req.body
    // if (order_mode) {
    //   querry =
    // }

    // let orerlis = await OrderModel.find(query)

    // if (filters.order_status && filters.order_status.length > 0) {
    //   query.order_status = { $in: filters.order_status };
    // }

    // if (filters.order_mode && filters.order_mode.length > 0) {
    //   query.order_mode = { $in: filters.order_mode };
    // }

    // if (filters.order_paymentMode && filters.order_paymentMode.length > 0) {
    //   query.order_paymentMode = { $in: filters.order_paymentMode };
    // }

    console.log(req.body);
    let payload = req.body.payload;
    {
      //order_mode:["Ordinary", "FastTrack", "Express"]
      // order_status:["Ordered", "Delivered", "Return", "Cancelled"]
      //order_paymentMode:["COD", "Bank", "UPI"]
      let orders = await OrderModel.find();
    }

    let x = await OrderModel.find();

    orders.filter((el) => {
      if (
        el.order_mode === payload ||
        el.order_status === payload ||
        el.order_paymentMode === payload
      ) {
      }
    });
    console.log(req.body.payload);

    // if((&Order) & (&Return) & (&Delivery)){
    //   //action

    //   }
    // if(order){
    //   let x  = await OrderModel.find({"order_paymentMode":})

    // }else if(return){

    // }
    //       if(order || return || delivery){
    //         //action
    //       let x  = await OrderModel.find({})

    //         }

    //         if (order || return || delivery) {
    //           // action
    //         }

    let pipe = [];

    payload.map((el) => {
      pipe.push({ order_mode: el });
      pipe.push({ order_status: el });
      pipe.push({ order_paymentMode: el });
    });
    console.log("pp filr", pipe);
    if (pipe.length === 0) {
      console.log("enter");
      let data = await OrderModel.find();
      return res.status(200).send({ message: data });
    }

    let data = await OrderModel.find({ $or: pipe });
    //  console.log("filter",data)
    res.status(200).send({ message: data });
  } catch (er) {
    console.log(er);
  }
};

export const filter_OnlyUser_order = async (req, res) => {
  try {
    const payload = req.body;
    console.log("status",payload.order_status)
    let { authorize_id } = req; 
   

    let userOrder = await OrderModel.find({ buyer_id: authorize_id });
   

    let query = {};

    if (payload.order_status === "") {
      query["order_status"] = "";
    } else {
      query["order_status"] = payload.order_status;
    }
    
 
 

      if (!payload.order_status) {
        let data = await OrderModel.find({ buyer_id: authorize_id });
       
        return res.status(200).send({ message: data });
      }

    const data = await OrderModel.find({
      buyer_id: authorize_id,
      order_status: payload.order_status,
    });
   
    res.status(200).send({ message: data });
   
  } catch (er) {
   

    res.status(500).send({ message: er });
  }
};

export const removeOrders = async (req, res) => {
  try {
    // console.log("yes");
    let { id } = req.params;
    let { role_id } = req;
    let userId = new mongoose.Types.ObjectId(role_id);
    let true_id = userId.toString();
    // console.log("tr", true_id);
    // console.log("del", id);

    let isCheckUserValid = await UserSchema.findById(true_id);

    if (!isCheckUserValid) {
      res.status(400).send("message:", "User does't exists");
    }
    let delOrder = await OrderModel.deleteOne({ _id: id });
    if (delOrder.deletedCount === 0) {
      return res.status(404).send("Order not found");
    }

    return res.status(200).send("Order Deleted");
  } catch (er) {
    console.log(er);
     return res.status(500).send("Order Cant Delete",er);
  }
};

export const removeByUSer =  async (req, res) => {
  try {
    console.log("yesUser");
    let { id } = req.params;
    let { authorize_id } = req;
    // let userId = new mongoose.Types.ObjectId(role_id);
    // let true_id = userId.toString();
    console.log("usertr", authorize_id);
    console.log("userdel", id);

    let isCheckUserValid = await UserSchema.findById(authorize_id);

    if (!isCheckUserValid) {
      res.status(400).send("message:", "User does't exists");
    }
    let delOrder = await OrderModel.deleteOne({ _id: id });
    if (delOrder.deletedCount === 0) {
      return res.status(404).send("Order not found");
    }

    return res.status(200).send("Order Deleted");
  } catch (er) {
    console.log(er);
     return res.status(500).send("Order Cant Delete", er);
  }
};
 