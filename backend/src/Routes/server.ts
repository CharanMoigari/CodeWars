import express from 'express'
import { authRouter } from './authRouter/authRouter'
import { problemsRouter } from './problemsRoute/problemsRouter'
export const apiRouter=express.Router()
apiRouter.use("/auth",authRouter)
apiRouter.use("/admin",problemsRouter)
