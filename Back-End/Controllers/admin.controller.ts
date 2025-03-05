import User from "../Models/doctor.model";
import {Request , Response , NextFunction} from "express";

// exports.adminController = {
    exports.retireDoctor= async (req:Request, res:Response): Promise<Response | void> => {
        try {
            const doctorId = req.params.id;
            if(!doctorId)
                return res.status(400).json({message:"No Doctor Id provided!"});
            else{
                await User.findByIdAndDelete({ userId: doctorId });
                res.status(200).json('Doctor Retired Successfully!');
            }
        } catch (err) {
        
        }
    },
    exports.removePatient=async(req:Request, res:Response,next:NextFunction): Promise<Response | void> => {
        try {
            const patientId = req.params.id;
            if(!patientId)
                return res.status(400).json({message:"No patient Id provided!"});
            else{
                await User.findByIdAndDelete({ userId: patientId });
                res.status(200).json('Patient rmoved successfully!!');
            }
        } catch (err) {
        next(err);
        }
    }
    exports.getAllPatients=async(req:Request, res:Response,next:NextFunction): Promise<Response | void> => {
        try {
            const doctors=await User.find({ role: 'patient' });
            res.status(200).json(doctors);
        } catch (err) {
        next(err);
        }
    }
// }