import { model, Schema } from "mongoose";

const contectUsSchema = new Schema(
  {
    uId: {
      type: String,
      require: true,
    },
    semester: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ContectUs = model("contect-us", contectUsSchema);
