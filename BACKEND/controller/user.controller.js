import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchema } from "../model/user.model.js";



// "name":"John George",
// "password":"61", prv=60
// "email":"john@gmail.com",
// "mobileNo":3765490,
// "role":"buyer",
// "address":"Texas, street_02, House 12A/9BN"


export const signUp = async (req, res) => {
  try {
    const { name, password, email, role, date } = req.body;
    const isCheck_user_signup = await UserSchema.findOne({
      email: req.body.email,
    });

    if (isCheck_user_signup) {
      console.log(isCheck_user_signup);
      return res.status(422).send({
        message: `${isCheck_user_signup.name} is already signedup Please signIn`,
      });
    }

    let hashed_password = await bcrypt.hash(password, 12);

    let payload = {
      name,
      password: hashed_password,
      email,
      role,
      date,
    };
console.log(payload)

 try{
  const add_signup_data = await UserSchema.create(payload);
  let result = add_signup_data.save()
  // console.log(result);
  res.status(201).send({ message: "user signedup successfully" });
 }catch(er){
  res.status(422).send({ message: "user signedup failed",er });
 }

    //how to use session ........
  } catch (er) {
    console.log("er", er);
  }
};

export const signin = async (req, res) => {
  try {
    const payload = req.body;
    console.log("log",payload);

    const login_user = await UserSchema.findOne({ email: payload.email });
    console.log(login_user);

    if (!login_user) {
      return res.status(422).send({
        message: `This email and password are incorrect, if not signedUp Please signUp first`,
      });
    }

    let isUser_Exist = await bcrypt.compare(
      payload.password,
      login_user.password
    );

    if (isUser_Exist) {
      const token = await jwt.sign(
        { userId: login_user._id, email: login_user.email },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      // res.cookie("accessToken", token, {
      //   expire: new Date() + 86400000,
      // });

      return res.status(200).send({ message: "user SignedIn successfully",token ,login_user});
    } else {
      return res.status(400).send({ message: "Email and password are wrong" });
    }
  } catch (er) {
    // console.log(er);
    return res.status(500).send({ message: "login backend error",er });

  }
};


export const signout = async (req,res)=>{
//     try{
//   await res.clearCookie("accessToken")
// res.status(200).send({message:"user signout successfully"})

//     }catch(er){
//         console.log(er)
//     }

}

