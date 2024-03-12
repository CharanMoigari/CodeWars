import {Request,Response} from 'express'
import User from "../models/user";
import dotenv from "dotenv";
const jwt = require('jsonwebtoken');
import { OAuth2Client } from "google-auth-library"


dotenv.config()
const signature: any = process.env.SECRET_KEY
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

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
      )
      const userDetails={user,token}
      return res.status(200).json({ Data:userDetails });
   } catch (error) {
      console.error("Error while Logging in:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
   }
};
export const authGoogleLogin = async (req: Request, res: Response) => {
   try {
      const { token } = req.body;
      const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

      const response = await client.verifyIdToken({
          idToken: token,
          audience: GOOGLE_CLIENT_ID,
      });
      
      const payload = response.getPayload();
      if (!payload || !payload.email) {
         return res.status(400).json({ msg: "Invalid Request" });
      }
      
      const userEmail = payload.email;
      const user = await User.findOne({ email: userEmail });
      
      if (!user) {
         // Handle case when the user does not exist in the database
         return res.status(404).json({ msg: "User not found" });
      }

      const userDetails = { user, token };
      return res.status(200).json({ Data: userDetails });
   } catch (error) {
      console.log("error while handling google-login", error);
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
 