import express from"express"
import { createProblem, getProblem } from "../../controllers/problemRoutesController"
import { get } from "mongoose"
export const problemsRouter=express.Router()
problemsRouter.post("/createProblem",createProblem)
problemsRouter.get("/problems",getProblem)