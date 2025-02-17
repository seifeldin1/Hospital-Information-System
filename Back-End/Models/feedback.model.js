"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const feedbackSchema = new mongoose_1.default.Schema({
    feedback: { type: String, required: [true, "Feedback is required"] },
    rating: { type: Number, required: [true, "Rating is required"] },
});
const Feedback = mongoose_1.default.model("Feedback", feedbackSchema);
exports.default = Feedback;
