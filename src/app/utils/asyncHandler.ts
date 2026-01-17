import { NextFunction, Request, RequestHandler, Response } from "express";
//This is a async function to that helps us to make async function look clean
export const asyncHandler = (requestHandler: RequestHandler) => {
  // this is a anonimus function that take async function and if there is a error it send the error to global error handler for clean look
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};
