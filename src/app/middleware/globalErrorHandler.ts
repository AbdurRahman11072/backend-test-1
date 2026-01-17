import { NextFunction, Request, Response } from "express";
import { config } from "../config/index";
import customError from "../error/customError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDev = config.NODE_ENV === "DEV";
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  if (error?.name === "CastError") {
    const msg = `Invalid ${error.path}: ${error.value}. Not Found!!!`;
    error = new customError(msg, 404);
  }
  if (error?.name === "TokenExpiredError") {
    const msg = `Jwt token Expired. Please login again`;
    error = new customError(msg, 404);
  }
  if (error?.name === "JsonWebTokenError") {
    const msg = `Invaild token. Please login again`;
    error = new customError(msg, 404);
  }
  if (error?.code === "E11000") {
    const msg = `This ${Object.keys(error.keyValue)[0]} is already exist`;
    error = new customError(msg, 400);
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(isDev && {
      error: error,
      stackTrace: error.stack,
    }),
  });
};

export default globalErrorHandler;
