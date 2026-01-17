import { model, Schema } from "mongoose";
import { BusZodSchema } from "./bus.zodValidation";

const busSchema = new Schema<BusZodSchema>(
  {
    busId: {
      type: String,
      required: true,
      unique: true,
    },
    busName: {
      type: String,
      required: true,
    },
    busRoute: {
      type: String,
      required: true,
    },
    busImg: {
      type: String,
      required: true,
    },
    busDestination: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one destination is needed",
      },
    },
    busDriverId: {
      type: String,
      required: true,
      unique: true,
    },
    busDepartureTime: {
      type: String, // You can also use Date if you prefer timestamps
      required: true,
    },
    busArrivalTime: {
      type: String, // Or Date
      required: true,
    },
    busDepartureTime2: {
      type: String, // You can also use Date if you prefer timestamps
      required: true,
    },
    busArrivalTime2: {
      type: String, // Or Date
      required: true,
    },
    busIpAddress: {
      type: String,
      required: true,
    },
    busStatus: {
      type: String,
      enum: ["On Time", "Late", "In Jame", "Maintenance"],
      default: "On Time",
    },
  },
  { timestamps: true }
);

// create a collection for bus information and driver information
export const Bus = model<BusZodSchema>("buses", busSchema);
