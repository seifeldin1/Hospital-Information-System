import User from "../Models/doctor.model";
import {Request , Response , NextFunction} from "express";

interface CustomRequest extends Request {
    user?: { id: string; role?: string };
  }
const verifyRole = (roles: string[] = []) =>{ 
    return async (req:CustomRequest,res:Response,next:NextFunction)=>{
        try{
            if (!req.user) {
                res.status(403).send('Access denied');
                return;
            }
            const userId= req.user.id;
            const user = await User.findById(userId);
            if (!user || !roles.includes(user.role)) {
                res.status(403).send('Access denied');
                return;
            }
            next();
        }catch (err){
            res.status(500).send('Server error');
        }
    };
};
export default verifyRole;