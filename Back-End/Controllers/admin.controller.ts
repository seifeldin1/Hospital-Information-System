import User from "../Models/doctor.model";
import Patient from "../Models/patient.model";
import {Request , Response , NextFunction} from "express";

exports.retireDoctor= async (req:Request, res:Response,next:NextFunction): Promise<Response | void> => {
    try {
        const doctorId = req.params.id;
        if(!doctorId)
            return res.status(400).json({message:"No Doctor Id provided!"});
        else{
            await User.findByIdAndDelete( doctorId );// used only if we are using ids of mongo not user defined ids
            // await User.deleteOne({ userId: doctorId });//if we will use the user defined ids we will use this function
            res.status(200).json('Doctor Retired Successfully!');
        }
    } catch (err) {
        next(err);
    }
},
exports.removePatient=async(req:Request, res:Response,next:NextFunction): Promise<Response | void> => {
    try {
        const patientId = req.params.id;
        if(!patientId)
            return res.status(400).json({message:"No patient Id provided!"});
        else{
            await User.findByIdAndDelete( patientId );
            // await User.deleteOne({ userId: patientId });
            res.status(200).json('Patient removed successfully!!');
        }
    } catch (err) {
    next(err);
    }
}
exports.getAllPatients=async(req:Request, res:Response,next:NextFunction): Promise<Response | void> => {
    try {
        const patients=await Patient.find({ role: "Patient" });
        console.log(patients);
        res.status(200).json(patients);
    } catch (err) {
    next(err);
    }
}