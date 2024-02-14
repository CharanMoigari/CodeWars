import express from 'express'
import { authRouter } from './authRouter/authRouter'
export const apiRouter=express.Router()
apiRouter.use("/auth",authRouter)
