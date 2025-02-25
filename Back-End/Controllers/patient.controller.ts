import Patient from "../Models/patient.model";
import { Request, Response, NextFunction } from "express";

  export const patientController = {
  getPatient: async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const patientData = await Patient.find();
      res.status(200).json({
        status: "success",
        data: patientData,
      });
    } catch (error) {
      next(error);
    }
  },
  editPatient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientData = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({
        status: "success",
        data: patientData,
      });
    } catch (error) {
      next(error);
    }
  },
};


