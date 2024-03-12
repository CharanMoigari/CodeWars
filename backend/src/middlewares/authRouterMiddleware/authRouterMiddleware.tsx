import { NextFunction, Request, Response } from "express"
import User from "../../models/user"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secret: any = process.env.SECRET_KEY
export const privateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) return res.status(401).json({ msg: "Unauthorized" })
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload
        if (!decoded) return res.status(404).json({ msg: "Invalid Token", success: false })
        req["user"] = decoded.user
        return next()
    } catch (err) {
        return res.status(500).json({ msg: "Invalid Request" })
    }
}