import express from"express"
import { authGoogleLogin, authLogin, authSignUp } from "../../controllers/authRouteController"
export const authRouter=express.Router()
authRouter.post("/login",authLogin)
authRouter.post("/signup",authSignUp)
authRouter.post("/google-login",authGoogleLogin)
