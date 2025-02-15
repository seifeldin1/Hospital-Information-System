import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  gender: string;
  phone: number;
  birthDate: Date;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: { 
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (this: any,val: string) {
        return val === this.password;
      },
    },
  },
  role: { type: String, required: [true, "Role is required"], enum: ["admin", "doctor", "patient"] },
  gender: { type: String, required: [true, "Gender is required"], enum: ["male", "female"] },
  phone: { type: Number, required: [true, "Phone is required"] },
  birthDate: { type: Date, required: [true, "Birth date is required"] },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined as unknown as string;
  next();
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
