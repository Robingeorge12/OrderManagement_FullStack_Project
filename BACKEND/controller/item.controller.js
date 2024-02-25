import mongoose from "mongoose";
import ItemModel from "../model/item.model.js";
import { UserSchema } from "../model/user.model.js";
import { OrderModel } from "../model/order.model.js";

export const addingItem = async (req, res) => {
  try {
    const { role_id } = req;
    let objectId = new mongoose.Types.ObjectId(role_id);
    let userId = objectId.toString();
    // console.log("user id", userId)
    const {
      product_name,
      product_price,
      product_category,
      product_brand,
      product_quantity,
      productId,
      product_date,
      description,
      product_url,
      product_count,
      seller,
    } = req.body;

    // const payload =  {product_name,product_price,product_category,product_brand,product_quantity,
    //   productId,product_gender,product_size,description,product_url,creator:userId}
    //  console.log(payload);
    //  console.log(payload.creator);

    let find_privilaged_user = await UserSchema.findOne(
      { _id: userId },
      "-password"
    );

    if (!find_privilaged_user) {
      return res
        .status(422)
        .send({ message: "You Can't Add Data, Please Contact Admin" });
    }
    // console.log(find_privilaged_user);
    const payload = {
      product_name,
      product_price,
      product_category,
      product_brand,
      product_quantity,
      productId,
      product_date,
      description,
      product_url,
      product_count,
      seller: userId,
    };

    let add_item = await ItemModel.create(payload);
    let saveItem = await add_item.save();
    // console.log("save", saveItem);
    return res.status(200).send({ message: "Product Added Successfully" });
  } catch (er) {
    res.status(500).send({ message: "Server Side Error For Adding Product" });
  }
};

// searching functionality .....................................................................
export const getAllItem = async (req, res) => {
  try {
    // {

    // "$or":[
    //   {product_brand:{$regex:req.params.type, $options:'i'}},
    //   {product_category:{$regex:req.params.type, $options:'i'}},
    //   {product_name:{$regex:req.params.type,$options:'i'}}
    // ]
    // }
    let get_product = await ItemModel.find();
    // console.log(get_product)
    res.status(200).send({ message: get_product });
  } catch (er) {
    res.status(500).send({ message: "Access Request Has Been Denied" });
  }
};

export const edit_item_data = async (req, res) => {
  try {
    // const {} = req
    const { id } = req.params;
    const { product_quantity, product_url, product_price, product_date } =
      req.body;

    // const {product_name,product_price,product_category,product_brand,product_quantity,
    //   productId,product_gender,product_size,description,product_url}= req.body;

    const updated_data = await ItemModel.findOne({ _id: id });
    // console.log(updated_data)

    const isCheck_creator = await UserSchema.findById(updated_data.creator);
    // console.log(isCheck_creator)

    if (isCheck_creator) {
      if (isCheck_creator.role !== "buyer") {
        updated_data.product_price = product_price;
        updated_data.product_quantity = product_quantity;
        //if send more url in image arry , we need to loop[i] and push
        // updated_data.product_url.image.push(product_url.image[0])
        // console.log(product_size)

        // updated_data.save()
        return res.status(200).send({ message: "Successfully Edit Data" });
      } else {
        return res
          .status(400)
          .send({ message: "Only Admin Or Seller can Edit The Data" });
      }
    }
    return res.status(400).send({ message: "You Can't Edit The Field" });
  } catch (er) {
    res.status(500).send({ message: "Server Error For Update Document", er });
  }
};

export const another_item_data = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_quantity, product_size, product_price } = req.body;

    const updated_data = await ClothModel.findById(id);

    if (!updated_data) {
      return res.status(404).send({ message: "Cloth not found" });
    }

    const isCheck_creator = await UserSchema.findById(updated_data.creator);

    if (!isCheck_creator) {
      return res.status(404).send({ message: "Creator not found" });
    }

    if (isCheck_creator.role !== "buyer") {
      // Check if the user is not a buyer
      // Update the product_quantity
      updated_data.product_quantity = product_quantity;
      updated_data.product_price = product_price;

      // Update the quant field for the specified size

      if (product_size && product_size.size && product_size.quant) {
        const sizeObj = updated_data.product_size.find(
          (obj) => obj.size === product_size.size
        );

        if (sizeObj) {
          sizeObj.quant = product_size.quant;
        } else {
          // If the size is not found, you may want to add it to the array
          updated_data.product_size.push({
            size: product_size.size,
            quant: product_size.quant,
          });
        }
      }

      await updated_data.save();
      return res
        .status(200)
        .send({ message: "Cloth data updated successfully" });
    } else {
      return res
        .status(403)
        .send({ message: "Only Admin or Seller can edit the data" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Server error for updating document", error });
  }
};

export const update_quantity = async (req, res) => {
  const { id } = req.params;
  const { authorize_id } = req;
  const { payload } = req.body;

  let isUser = await UserSchema.findOne({ _id: authorize_id });
  if (!isUser) {
    return res.status(422).send({ message: "You Are Not Authorized" });
  }
  let item = await ItemModel.findById(id);

  let newQuant = item.product_quantity - +payload.quantity;
  let newCount = item.product_count + +payload.quantity;

  // console.log("itu",item)

  item.product_quantity = newQuant;
  item.product_count = newCount;

  item.save();
  res.status(200).send({ message: "Updated With New Order Quantity" });
};

export const update_Cancel_quantity = async (req, res) => {
  const { id } = req.params;
  const { role_id } = req;
  let objectId = new mongoose.Types.ObjectId(role_id);
  let userId = objectId.toString();
  const { payload } = req.body;

  console.log("admin", payload);
  let isUser = await UserSchema.findOne({ _id: userId });
  if (!isUser || isUser.role === "buyer") {
    return res.status(422).send({ message: "You Are Not Authorized" });
  }

  let orderCheck = await OrderModel.find({ order_id: payload.order_id });

  if (
    orderCheck.order_status === "Cancelled" ||
    orderCheck.order_status === "Return"
  ) {
    console.log("orderck", orderCheck.order_status);
    return res
      .status(422)
      .send({ message: "Order is Already Cancelled or Returned" });
  }
  if (
    payload.order_status === "Cancelled" ||
    payload.order_status === "Return"
  ) {
    let item = await ItemModel.findById(id);
    let newQuant = item.product_quantity + +payload.quantity;
    let newCount = item.product_count - +payload.quantity;
    console.log("admicanl", item);
    item.product_quantity = newQuant;
    item.product_count = newCount;
    item.save();
    return res.status(200).send({ message: "Updated With New Order Quantity" });
  }
  // else if (payload.order_status ==="Delivered" || payload.order_status==="Ordered"){

  //   let item = await ItemModel.findById(id)

  //   let newQuant = item.product_quantity -( +payload.quantity);
  //   let newCount = item.product_count + (+payload.quantity);
  //   item.product_quantity = newQuant;
  //   item.product_count = newCount;

  //     item.save()
  // return res.status(200).send({message:"Updated With New Order Quantity"})

  // }

  res.status(400).send({ message: "Can't Update Quantity" });
};

export const update_Cancel_quantityByUser = async (req, res) => {
  const { id } = req.params;
  const { authorize_id } = req;
  const { payload } = req.body;

  let isUser = await UserSchema.findOne({ _id: authorize_id });
  if (!isUser || isUser.role !== "buyer") {
    return res.status(422).send({ message: "You Are Not Authorized" });
  }

  let orderCheck = await OrderModel.find({ order_id: payload.order_id });

  if (
    orderCheck.order_status === "Cancelled" ||
    orderCheck.order_status === "Return"
  ) {
    return res
      .status(422)
      .send({ message: "Order is Already Cancelled or Returned" });
  }

  if (
    payload.order_status === "Cancelled" ||
    payload.order_status === "Return"
  ) {
    let item = await ItemModel.findById(id);

    let newQuant = item.product_quantity + +payload.quantity;
    let newCount = item.product_count - +payload.quantity;

    console.log("usercanl", item);

    item.product_quantity = newQuant;
    item.product_count = newCount;

    item.save();
    return res.status(200).send({ message: "Updated With New Order Quantity" });
  }

  res.status(400).send({ message: "Can't Update Quantity" });
};

export const production_AddQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id } = req;
    let objectId = new mongoose.Types.ObjectId(role_id);
    let userId = objectId.toString();
    const payload = req.body;

  
  

   

    let isUser = await UserSchema.findOne({ _id: userId });
    if (!isUser || isUser.role === "buyer") {
      return res.status(422).send({ message: "You Are Not Authorized" });
    }
 
    try {
      
    let updated = await ItemModel.findByIdAndUpdate(id, {
      $inc: { product_quantity: payload.quantity },
    });
console.log("update",updated)
    if (!updated) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.status(200).send({ message: "Production Has Been Done" });

    } catch (er) {
       return res
         .status(400)
         .send({ message: err.message || "Error updating quantity" });
    }
  } catch (er) {
    console.log(er);
    res
      .status(500)
      .send({ message: "Server Side Error, Please Check Fields", er });
  }
};




export const delete_item = async (req, res) => {
  try {
    // const {} = req
    const { id } = req.params;
    console.log(id);
    const del = await ItemModel.deleteOne({ _id: id });
    res.status(200).send({ message: "Deleted Successfully" });
  } catch (er) {
    console.log(er);
    res
      .status(500)
      .send({ message: "Server Side Error, Please Check Fields", er });
  }
};
