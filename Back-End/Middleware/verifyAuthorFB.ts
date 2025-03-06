import User from "../Models/doctor.model";
import {Request , Response , NextFunction} from "express";
import Feedback from "../Models/feedback.model";

interface CustomRequest extends Request {
    user?: { email?:string, role?: string };
  }
const verifyAuthorFB = () =>{ 
    return async (req:CustomRequest,res:Response,next:NextFunction)=>{
        try{
            if(!req.user){
                res.status(403).send('Access denied');
                return; 
            }
            else if (req.user.role=="Admin") {
                next();
                return;
            }
            else {
                const myself=await User.findOne({email:req.user.email});
                if(!myself)
                {
                    res.status(403).send('Access denied');
                    return;
                }
                const feedback=await Feedback.findById(req.params.id)
                if(feedback?.userId==myself._id){
                    next();
                    return;
                }
                
            }
            next();
        }catch (err){
            res.status(500).send('Server error');
        }
    };
};
export default verifyAuthorFB;