import express, { Request, Response, NextFunction } from "express";
import connectDB from "./Config/database";
import dotenv from "dotenv";
import { errorController } from "./Controllers/error.controller";
import CustomError from "./Utils/customError";
import feedbackRoutes from "./Routes/feedback.routes";
import doctorRoutes from "./Routes/doctor.routes";
import registrationRoutes from "./Routes/registration.routes";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/feedback", feedbackRoutes);
app.use("/doctor" , doctorRoutes)
app.use("/" , registrationRoutes)


app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);


  

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
