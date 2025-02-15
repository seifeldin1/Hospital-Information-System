import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], unique: [true, "Email already exists"] },
    password: { type: String, required: [true, "Password is required"] },
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
