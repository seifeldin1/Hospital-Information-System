import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const mongooseSequence = require("mongoose-sequence")(mongoose)

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  phone: number;
  birthDate: Date;
  userId:number
}

const userSchema = new mongoose.Schema({
    userID: { 
        type: Number, 
        unique: true 
    },
    FirstName: { 
        type: String, 
        required: [true, "First Name is required"] 
    },
    SecondName: { 
        type: String, 
        required: [true, "Second Name is required"] 
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        validate: [validator.isEmail, "Invalid email format"],
    },
    password: { 
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    role: { 
        type: String, 
        required: [true, "Role is required"], 
        enum: ["admin", "doctor", "patient"] 
    },
    gender: { 
        type: String, 
        required: [true, "Gender is required"], 
        enum: ["male", "female"] 
    },
    phone: { 
        type: Number, 
        required: [true, "Phone is required"] 
    },
    birthDate: { 
        type: Date, 
        required: [true, "Birth date is required"] 
    },
});

// Define a virtual property for 'name'
userSchema.virtual('name').get(function() {
  return `${this.FirstName} ${this.SecondName}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.plugin(mongooseSequence, { inc_field: "userID" })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
