import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../Models/user.model"
import dotenv from "dotenv";


export const register = async (req: Request, res: Response) => {
    try {
        const{
            firstName,
            lastName,
            birthDate,
            gender,
            email,
            phone,
            password,
            role
        } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName: firstName,
            lastName:lastName,
            birthDate: birthDate,
            gender: gender,
            email: email,
            phone: phone,
            password: hashedPassword
        })

        const existingUser = await User.findOne({email: email})

        if(existingUser){
            return res.status(400).json({message: "Email already exists"})
        }
        
        const savedUser = await user.save()
        res.status(201).json({message: "User created successfully", user: savedUser})

    }catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
}

dotenv.config();
const jwtKey = process.env.JWT_SECRET

const generateToken= (id:number , email:string , role:string) =>{
    if (!jwtKey) {
        throw new Error("JWT_SECRET is not defined.");
    }
    const token = jwt.sign(
        {id, email, role}, 
        jwtKey, 
        {expiresIn:"1h"})
        return token


}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email" })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" })
        }
        generateToken(user.userId, user.email, user.role)
        res.status(200).json({ message: "Logged in successfully"  , userDetails: user})
    }catch(err){
            console.log(err)
            res.status(500).json({message:err})
    }
}
