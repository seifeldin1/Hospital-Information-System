import Feedback from "../Models/feedback.model";
import { Request, Response, NextFunction } from "express";

export const feedbackController = {
  createFeedback: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { feedback, rating,userId } = req.body;
      const feedbackData = await Feedback.create({ feedback, rating,userId });
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
  deleteFeedback: async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const feedbackId = req.params.id;
      console.log(`Received patientId: ${feedbackId}`); 
      if(!feedbackId)
      {
        res.status(400).json({message:"No Feedback Id provided!"});
        return;
      }
      else{
          const feedback= await Feedback.findOne({_id:feedbackId});
          console.log(feedback);
          const deletedFeedback=await Feedback.findByIdAndDelete( feedbackId );
          if (!deletedFeedback) {
              res.status(404).json({ message: "Feedback not found" });
              return;
          }
          res.status(200).json({message:'Feedback removed successfully!!'});
      }
    } catch (error) {
      next(error);
    }
  },
};




