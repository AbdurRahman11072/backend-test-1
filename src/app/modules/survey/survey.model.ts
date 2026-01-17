import { model, Schema } from "mongoose";
import { SurveyZodSchema } from "./survey.zodValidation";

const classScheduleSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const surveySchema = new Schema<SurveyZodSchema>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      enum: ["Student", "Teacher"],
      default: "Student",
    },
    userDepartment: {
      type: String,
      required: true,
      default: "",
    },
    userSemester: {
      type: String,
      required: true,
    },
    classSchedules: {
      type: [classScheduleSchema],
      default: [],
    },
    destination: {
      type: String,
      required: true,
    },
    acBus: {
      type: String,
      required: true,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    // Added missing fields from Zod schema

    // Note: transactionId is not in your Zod schema but was in your original object
    // If you need it, add it to both Zod and Mongoose schemas
  },
  {
    timestamps: true,
  }
);

// Optional: Add index for better query performance
surveySchema.index({ userId: 1 });
surveySchema.index({ userRole: 1 });
surveySchema.index({ userDepartment: 1 });

export const Survey = model<SurveyZodSchema>("Survey", surveySchema);
