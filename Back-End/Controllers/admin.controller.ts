import User from "../Models/doctor.model";
import {Request , Response , NextFunction} from "express";

export const RetireDoctor=async (req:Request, res:Response,next:NextFunction) => {
    try {
        const doctorId = req.params.id;
        if(!doctorId)
            return res.status(400).json({message:"No Doctor Id provided!"});
        else{
            await User.findByIdAndDelete({ userId: doctorId });
            res.status(200).json('Doctor Retired Successfully!');
        }
    } catch (err) {
       next(err);
    }
}