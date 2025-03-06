import User from "../Models/doctor.model";
import {Request , Response , NextFunction} from "express";

interface CustomRequest extends Request {
    user?: { email?:string, role?: string };
  }
const verifyRole = (roles: string[] = []) =>{ 
    return async (req:CustomRequest,res:Response,next:NextFunction)=>{
        try{
            if (!req.user) {
                res.status(403).send('Access denied');
                return;
            }
            // const userId= req.user._id;
            // console.log(userId);
            // const user = await User.findById(userId);
            // if (!user ) {
            //     res.status(403).send('Access denied, user not found');
            //     return;
            // }
            else if( !roles.includes(req.user.role||"")){
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