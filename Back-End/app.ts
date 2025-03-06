import express, { Request, Response, NextFunction } from "express";
import connectDB from "./Config/database";
import dotenv from "dotenv";
import { errorController } from "./Controllers/error.controller";
import CustomError from "./Utils/customError";
import router from './Routes/api.route';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(router);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);


  

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
