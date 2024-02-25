import { UserSchema } from "../model/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    // check the _id is comming or not req.authorize_id
    const { authorize_id} = req;
    // console.log("req",req)
    console.log("id_",authorize_id);  
    const user_type = await UserSchema.findOne({ _id:authorize_id});

    if (!user_type) {
      return res.send({ message: "You can't Access" });
    } 

    if (user_type.role !== "buyer") {
      // we can use another coolection to store those who enter in to admin pannel
      req.role_id =  user_type._id
      return next();
    }
    return res.status(400).send({ message: "You are not allowed" });
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: er });
  }
};
