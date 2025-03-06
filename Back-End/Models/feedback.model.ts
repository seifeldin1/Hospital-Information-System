import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model"; 

export interface IFeedback extends Document {
  feedback: string;
  rating: number;
  userId: IUser["_id"];
}

const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: [true, "Feedback is required"] },
  rating: { type: Number, required: [true, "Rating is required"] },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;

