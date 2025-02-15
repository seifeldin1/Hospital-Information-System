import { Request, Response, NextFunction } from "express";
export const errorController = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

  res.status(err.statusCode).json({
      status: err.status,
      message: err.message
  })
}