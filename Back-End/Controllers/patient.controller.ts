import Patient from "../Models/patient.model";
import User from "../Models/user.model";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

exports.getPatient= async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const patientData = await Patient.find();
    res.status(200).json({
      status: "success",
      data: patientData,
    });
  } catch (error) {
    next(error);
  }
};
exports.editPatient= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName,password,birthDate, email, phoneNumber } = req.body;
    const patientId = req.params.id; 
    const updateFields: any = {};

    // Check if email is already in use
    if (email) {
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient && existingPatient._id instanceof mongoose.Types.ObjectId && existingPatient._id.toString() !== patientId) {
            return res.status(400).json({ message: "Email is already in use" });
        }
        updateFields.email = email;
    }

    // Check if phone number is already in use
    if (phoneNumber) {
        const existingPatient = await Patient.findOne({ phone: phoneNumber });
        if (existingPatient && existingPatient._id instanceof mongoose.Types.ObjectId && existingPatient._id.toString() !== patientId) {
            return res.status(400).json({ message: "Phone number is already in use" });
        }
        updateFields.phone = phoneNumber;
    }

    if (firstName){
      updateFields.firstName = firstName;
    }
    if (lastName){
      updateFields.lastName = lastName;
    }
    if (password){
      updateFields.password = await bcrypt.hash(password, 12);
    }
    if (birthDate) {
        updateFields.birthDate = birthDate;
    }

    // Update the Patient in the database
    const updatedPatient = await User.findByIdAndUpdate(
      patientId, 
        { $set: updateFields }, 
        { new: true }
    );

    if (!updatedPatient) {
        return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient info updated successfully!", data: updatedPatient });
  } catch (error) {
    next(error);
  }
}


