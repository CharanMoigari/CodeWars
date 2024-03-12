import express from 'express'
import cors from "cors"
import connectToMongo from './src/configs/db'
import dotenv from 'dotenv'
import {apiRouter} from "./src/Routes/server"
dotenv.config()

const app=express()

app.use(express.json())
app.use(cors())
connectToMongo()
app.use("/api",apiRouter)
app.listen(4000,()=>{
    console.log("Listening to Port:4000");
})