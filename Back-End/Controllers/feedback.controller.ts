import Feedback from "../Models/feedback.model";
import { Request, Response, NextFunction } from "express";

export const feedbackController = {
  createFeedback: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { feedback, rating } = req.body;
      const feedbackData = await Feedback.create({ feedback, rating });
      res.status(201).json({
      status: "success",
      data: feedbackData,
    });
    } catch (error) {
      next(error);
    }
  },
  getFeedback: async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const feedbackData = await Feedback.find();
      res.status(200).json({
        status: "success",
        data: feedbackData,
      });
    } catch (error) {
      next(error);
    }
  },
};




