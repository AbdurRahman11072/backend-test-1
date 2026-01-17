import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import customError from "./app/error/customError";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { appRouter } from "./app/routes";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://green-university-roan.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

app.use(appRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello there");
});
app.use((req: Request, res: Response, next: NextFunction) => {
  const msg = `Can't find this route: ${req.originalUrl}`;
  const error = new customError(msg, 404);
  next(error);
});
app.use(globalErrorHandler);
export default app;
