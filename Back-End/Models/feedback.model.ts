import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
  feedback: string;
  rating: number;
}

const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: [true, "Feedback is required"] },
  rating: { type: Number, required: [true, "Rating is required"] },
});

const Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;

