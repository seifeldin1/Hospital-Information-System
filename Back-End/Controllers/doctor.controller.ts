import Doctor from "../Models/doctor.model";
import {Request , Response , NextFunction} from "express"

export const editDoctorInfo = async(req:Request , res:Response , next:NextFunction)=>{
    try{
        const {
            birthDate, 
            email , 
            phoneNumber} = req.body
        const doctorId = req.params.doctorID
        if (!doctorId)
            return res.status(400).json({message: "Doctor ID is required"})
        const updateFields: any = {}
        if(email){
            const existingDoctor = await Doctor.findOne({email: email})
            if(existingDoctor && existingDoctor.doctorID.toString() !== doctorId)
                return res.status(400).json({message: "Email is already in use"})
            updateFields.email = email;
        }
        if(phoneNumber){
            const existingDoctor = await Doctor.findOne({phone: phoneNumber})
            if(existingDoctor && existingDoctor.doctorID.toString() !== doctorId)
                return res.status(400).json({message: "Phone Number is already in use"})
            updateFields.phone = phoneNumber
        }
        if(birthDate)
            updateFields.birthDate = birthDate
        const updatedDoctor = await Doctor.findOneAndUpdate({doctorID:doctorId}, updateFields, { new: true });
        if (!updatedDoctor) 
            return res.status(404).json({ message: "Doctor not found" })
        res.status(200).json({message: "Doctor Info Updated Successfully", data: updatedDoctor})
    }catch(err){
        next(err)
    }
}


export const addDoctor = async(req:Request , res:Response , next:NextFunction)=>{
    try{
        const {dEmail , phoneNumber , birthDate , Fname , Lname , gender , expLevel , password} = req.body
        if(!dEmail)
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
        const existingEmail = await Doctor.findOne({email: dEmail})
        if(existingEmail)
            return res.status(400).json({message: "Email is already in use"})
        const existingPhone = await Doctor.findOne({phone: phoneNumber})
        if(existingPhone)
            return res.status(400).json({message: "Phone Number is already in use"})

        const newDoctor = new Doctor({
            email: dEmail ,
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
        next(err)
    }
}

export const deleteDoctor = async (req:Request , res:Response , next:NextFunction)=>{
    try{
        const id = req.params.doctorID
        const doctor = await Doctor.findOneAndDelete({doctorID:id})
        if(!doctor)
            return res.status(404).json({message: "Doctor not found"})
        return res.status(200).json({message: "Doctor Deleted Successfully"})
    }catch(err){
        next(err)
    }
}


export const getDoctor = async(req:Request , res:Response , next:NextFunction)=>{
    try{
        const id = req.params.doctorID
        const doctor = await Doctor.findOne({doctorID:id})
        if(!doctor)
            return res.status(404).json({message: "Doctor not found"})
        return res.status(200).json({doctor:doctor})
    }catch(err){
        next(err)
    }
}

export const getAllDoctors = async(req:Request , res:Response , next:NextFunction)=>{
    try{
        const doctors = await Doctor.find()
        return res.status(200).json({doctors:doctors})
    }catch(err){
        next(err)
    }
}


