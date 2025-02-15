import express, { Request, Response, NextFunction } from "express";
import connectDB from "./Config/database";
import dotenv from "dotenv";
import { errorController } from "./Controllers/error.controller";
import CustomError from "./Utils/customError";

dotenv.config();

const app = express();

connectDB();



app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);

function greet(name: string): string {
    return `Hello, ${name}! Welcome to TypeScript!`;
  }

  const message = greet("Seifeldin");
  console.log(message);
  

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
