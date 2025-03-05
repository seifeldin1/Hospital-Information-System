import Doctor from "../Models/doctor.model";
import  User from "../Models/user.model";
import mongoose from "mongoose";

import {Request , Response , NextFunction} from "express"



exports.editDoctorInfo = async (req: Request, res: Response) => {
    try {
        const { birthDate, email, phoneNumber } = req.body;
        const doctorId = req.params.id; // Use MongoDB _id from URL

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid doctor ID" });
        }

        const updateFields: any = {};

        // Check if email is already in use
        if (email) {
            const existingDoctor = await Doctor.findOne({ email });
            if (existingDoctor && existingDoctor._id instanceof mongoose.Types.ObjectId && existingDoctor._id.toString() !== doctorId) {
                return res.status(400).json({ message: "Email is already in use" });
            }
            updateFields.email = email;
        }

        // Check if phone number is already in use
        if (phoneNumber) {
            const existingDoctor = await Doctor.findOne({ phone: phoneNumber });
            if (existingDoctor && existingDoctor._id instanceof mongoose.Types.ObjectId && existingDoctor._id.toString() !== doctorId) {
                return res.status(400).json({ message: "Phone number is already in use" });
            }
            updateFields.phone = phoneNumber;
        }

        if (birthDate) {
            updateFields.birthDate = birthDate;
        }

        // Update the doctor in the database
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId, 
            { $set: updateFields }, 
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor info updated successfully", data: updatedDoctor });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


exports.getDoctor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid doctor ID" });
        }

        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        return res.status(200).json({ doctor });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


exports.addDoctor = async(req:Request , res:Response )=>{
    try{
        const {email , phoneNumber , birthDate , Fname , Lname , gender , expLevel , password} = req.body
        if(!email)
            return res.status(400).json({message: "Email is required"})
        if(!phoneNumber)
            return res.status(400).json({message: "Phone Number is required"})
        if(!Fname)
            return res.status(400).json({message: "First Name is required"})
        if(!Lname)
            return res.status(400).json({message: "Last Name is required"})
        if(!gender)
            return res.status(400).json({message: "Gender is required"})
        if(!expLevel)
            return res.status(400).json({message: "Expertise Level is required"})
        if(!password)
            return res.status(400).json({message: "Password is required"})
        if(password.length < 8)
            return res.status(400).json({message: "Password must be at least 8 characters"})
        const existingEmail = await Doctor.findOne({email:email})
        if(existingEmail)
            return res.status(400).json({message: "Email is already in use"})
        const existingPhone = await Doctor.findOne({phone: phoneNumber})
        if(existingPhone)
            return res.status(400).json({message: "Phone Number is already in use"})

        const newDoctor = new Doctor({
            email: email ,
            phone: phoneNumber ,
            birthDate:birthDate ,
            firstName:Fname ,
            lastName:Lname ,
            gender:gender ,
            ExpertiseLevel:expLevel ,
            password:password, 
            role:"Doctor",
        })
        const doctor =  await newDoctor.save()
        return res.status(201).json({
            message: "Doctor Added Successfully",
            doctor:doctor,
        })
    } catch(err){
        res.status(500).json({error: err})
    }
}

exports.deleteDoctor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid doctor ID" });
        }

        const doctor = await Doctor.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        return res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


exports.getAllDoctors = async(req:Request , res:Response )=>{
    try{
        const doctors = await Doctor.find()
        return res.status(200).json({doctors:doctors})
    }catch(err){
        res.status(500).json({error: err})
    }
}


