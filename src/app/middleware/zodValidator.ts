import status from "http-status";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { config } from "../config/index";

const zodValidator = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    const isDev = config.NODE_ENV === "DEV";
    // show what type of validation error is showing
    if (!result.success) {
      const errorDetails = result.error.issues.map((issue) => {
        const path = issue.path.join();
        const message = issue.message;
        return { path, message };
      });

      // send error details as response to user
      return res.status(400).json({
        status: "Failed",
        message: "Validation Error",
        error: errorDetails,
        ...(isDev && {
          stackTrace: result.error,
        }),
      });
    }
    next();
  };
};

export default zodValidator;
