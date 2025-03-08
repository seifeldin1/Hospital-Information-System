import User from "../Models/user.model";
import {Request , Response , NextFunction} from "express";

interface CustomRequest extends Request {
    user?: { email?:string, role?: string };
  }
const authorizePatient = async (req:CustomRequest,res:Response,next:NextFunction)=>{
        try{
            if(!req.user){
                res.status(403).send('Access denied');
                return; 
            }
            else {
                const myself=await User.findOne({email:req.user.email});
                if(!myself)
                {
                    res.status(403).send('Access denied');
                    return;
                }
                if(req.params.id==myself._id){
                    next();
                    return;
                }
                else{
                    res.status(403).send('Access denied');
                    return;
                }
            }
        }catch (err){
            res.status(500).send('Server error');
        }
    
};
export default authorizePatient;