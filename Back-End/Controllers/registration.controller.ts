import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../Models/user.model"
import dotenv from "dotenv";


exports.register = async (req: Request, res: Response) => {
    try {
        const{
            firstName,
            lastName,
            birthDate,
            gender,
            email,
            phone,
            password,
        } = req.body
        const user = new User({
            firstName: firstName,
            lastName:lastName,
            birthDate: birthDate,
            gender: gender,
            email: email,
            phone: phone,
            password: password,
            role:"Patient"
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

exports.login = async (req: Request, res: Response) => {
    try {
        const testPassword = "password123";  // The password you're testing
        const testHash = "$2b$12$uoDcEGdllq2nV/h1hobSxeydbLk10MF4nWJuBJMEkAzp3sqtzu0cG";      // The hashed password from your database

        const isMatch = await bcrypt.compare(testHash, testPassword);
        console.log("Password match result test:", isMatch);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        console.log("Login request received:", { email, password });

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        console.log("User found:", user);

        // Ensure password hash exists in user object
        console.log("User password from database:", user.password);

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user.userId, user.email, user.role);
        res.status(200).json({ message: "Logged in successfully", userDetails: user, token: token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
