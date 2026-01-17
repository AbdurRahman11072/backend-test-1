import { model, Schema } from "mongoose";

const maintenanceSchema = new Schema(
  {
    busId: {
      type: String,
      require: true,
    },
    busName: {
      type: String,
      require: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Maintenance = model("maintenance", maintenanceSchema);
