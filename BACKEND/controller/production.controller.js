import { ProductionModel } from "../model/production.model.js";
import mongoose from "mongoose";
import { UserSchema } from "../model/user.model.js";

export const product_Order = async (req, res) => {
  try {
    const payload = req.body;
    const { authorize_id } = req;
    const buyer = await UserSchema.find({ _id: authorize_id });

    console.log(buyer);
    if (!buyer) {
      return res
        .status(400)
        .send({ message: `Production Request Has Been Declined` });
    }

    if (!payload) {
      return res
        .status(400)
        .send({
          message: `Production Request Has Been Rejected By Inapropriate Data`,
        });
    }

    let add = await ProductionModel.create(payload);
    add.save();
    res.status(200).send({ message: `Production Request Has Been sent` });
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: "Server Side Error For Adding Product" });
  }
};

export const get_Production = async (req, res) => {
  try {
    const all_Production = await ProductionModel.find();
    res.status(200).send({ message: all_Production });
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: "Server Side Error For Adding Product" });
  }
};

export const product_Del = async (req, res) => {
  try {
    const { role_id } = req;
    const userId = new mongoose.Types.ObjectId(role_id)
    const Uid = userId.toString()
    const { id } = req.params;
    console.log("p",Uid)
    const ischeck = await UserSchema.findOne({ _id: Uid });

    console.log("ck",ischeck)

    if (ischeck.role === "buyer") {
      return res.status(400).send({ message: "Only Admin Can Delete Product" });
    }
 
    const del_Production = await ProductionModel.deleteOne({ _id: id });
    res.status(200).send({ message: "Removed production Item" });
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: "Server Side Error For Adding Product" });
  }
};
