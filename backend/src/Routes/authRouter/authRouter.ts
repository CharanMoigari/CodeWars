import express from"express"
import { authLogin, authSignUp } from "../../controllers/authRouteController"
export const authRouter=express.Router()
authRouter.post("/login",authLogin)
authRouter.post("/signup",authSignUp)