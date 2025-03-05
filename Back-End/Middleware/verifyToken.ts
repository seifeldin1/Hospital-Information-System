import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();
interface CustomRequest extends Request {
    user?: { id: string; role?: string };
  }
const verifyToken =(req:CustomRequest,res:Response,next:NextFunction):void=>{
        const token=req.cookies.token|| req.headers['authorization'];
        if (!token){
            res.status(403).send('A token is required for authentication');
            return;
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.user = decoded as { id: string; role?: string };
        } catch (err) {
            res.status(401).send('Invalid Token');
            return;
        }
    
    next();
} 
export default verifyToken;