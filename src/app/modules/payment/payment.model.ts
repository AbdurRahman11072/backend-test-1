import { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    transactionId: {
      type: String,
      require: true,
      unique: true,
    },
    userId: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    paymentMethod: {
      type: String,
      require: true,
      default: "Bkash",
    },
    amount: {
      type: Number,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model("payment", paymentSchema);
