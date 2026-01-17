import { status } from "http-status";
import { model, Schema } from "mongoose";
import { BusBookingZodSchema } from "./busBooking.zodValidation";

const busBookingSchema = new Schema<BusBookingZodSchema>(
  {
    uId: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    userEmail: {
      type: String,
      require: true,
    },
    totalPassanger: {
      type: String,
      require: true,
    },
    bookingSubject: {
      type: String,
      require: true,
    },
    bookingDescription: {
      type: String,
      require: true,
    },
    bookingTime: {
      type: String,
      require: true,
    },
    bookingDate: {
      type: String,
      require: true,
    },
    feedback: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      require: true,
      enum: ["Accepted", "Rejected", "Pending"],
    },
  },
  {
    timestamps: true,
  }
);

export const BusBooking = model<BusBookingZodSchema>(
  "BusBooking",
  busBookingSchema
);
