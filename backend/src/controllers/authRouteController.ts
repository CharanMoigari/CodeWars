import {Request,Response} from 'express'
import User from "../models/user";
const jwt = require('jsonwebtoken');

export const authLogin=async(req:Request,res:Response)=>{
   try {
      let { email, password } = req.body;
      
      const user = await User.findOne({ email });
      const value=user?.password
      if(value!==password){
         return res.status(404).json({Message:"Incorrect Password"})
      }
      const token= await jwt.sign(
         {email:user?.email},
         process.env.SECRET_KEY,
         {
            expiresIn: 360000,
          })
      const userDetails={user,token}
      return res.status(200).json({ userDetails });
   } catch (error) {
      console.error("Error while Logging in:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
   }
};


export const authSignUp = async (req: Request, res: Response) => {
    try {
       let { userName, email, password } = req.body;
       
       const user = await User.findOne({ email });
       if (user) {
          return res.status(400).json({ msg: "User already exists" });
       }
       
       const newUser = await User.create({
          userName: userName,
          email: email,
          password: password
       });
       console.log(newUser)
       
       return res.status(200).json({ Data: newUser });
    } catch (error) {
       console.error("Error while signing up:", error);
       return res.status(500).json({ msg: "Internal Server Error" });
    }
 };
 