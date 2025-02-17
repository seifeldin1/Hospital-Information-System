"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackController = void 0;
const feedback_model_1 = __importDefault(require("../Models/feedback.model"));
exports.feedbackController = {
    createFeedback: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { feedback, rating } = req.body;
            const feedbackData = yield feedback_model_1.default.create({ feedback, rating });
            res.status(201).json({
                status: "success",
                data: feedbackData,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getFeedback: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const feedbackData = yield feedback_model_1.default.find();
            res.status(200).json({
                status: "success",
                data: feedbackData,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
