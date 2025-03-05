import User from "../Models/user.model";
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
        console.log(`Received patientId: ${patientId}`); 
        if(!patientId)
            return res.status(400).json({message:"No patient Id provided!"});
        else{
            const pat= await User.findOne({_id:patientId});
            console.log(pat);
            const deletedPatient=await User.findByIdAndDelete( patientId );
            // await User.deleteOne({ userId: patientId });
            if (!deletedPatient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.status(200).json({message:'Patient removed successfully!!'});
        }
    } catch (err) {
    next(err);
    }
}
exports.getAllPatients=async(req:Request, res:Response,next:NextFunction): Promise<Response | void> => {
    try {
        const patients=await User.find({ role: "Patient" });
        console.log(patients);
        res.status(200).json(patients);
    } catch (err) {
    next(err);
    }
}