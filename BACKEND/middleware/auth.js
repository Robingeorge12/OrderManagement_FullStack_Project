import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const isAuth = async (req, res,next) => {

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI5ZTAyZmQyM2QyMDYzM2NjYjNhZmMiLCJlbWFpbCI6ImRAZ21haWwuY29tIiwiaWF0IjoxNzA2NjgxMjY0LCJleHAiOjE3MDY2ODEyNjR9.lvwFNSCDH8F-wg_mY9ctJ35b29Fh76R-dQaP9l9YinY
    const token = req.headers.authorization;
    // console.log("token-1",token)
    if (!token) {
      return res
        .status(400)
        .send({ message: "Unauthorized , token is not provided" });
    }

  try {


    try {
      const decode = await jwt.verify(token, process.env.SECRET_KEY);
    //   console.log("decod", decode)
      if (!decode.email && !decode.userId) {
        return res.status(400).send({ message: "You are not authenticated" });
      }
      // res.status(200).send({ message: "user login id",user:`${decode.email}` })
      // here below i wrote "req._id" , this is going into authorization's req,
      // so here prefix must be "req" ,next name we can put anything , authorize we can destructure
      // this req._id with any name eg {_id} = req or  req.authorize_id will be {authorize_id} = req
      req.authorize_id = decode.userId 
    //   console.log("decod", req.authorize_id)
      next();
      

    } catch (er) {
    //   console.log(er);
      //if expiration happend
      res.status(400).send({ message: "Authentication failed", er });
    }
  } catch (er) {
    console.log(er);
    res
      .status(500)
      .send({ message: "Authentication Error From Server Side", er });
  }
};
