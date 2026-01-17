import status from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { Payment } from "./payment.model";

const CreatePayment = asyncHandler(async (req, res) => {
  const data = req.body;
  const result = Payment.create(data);
  res.status(status.OK).json({
    status: "Success",
    message: "Payment Successful",
    data: result,
  });
});

const getAllPayment = asyncHandler(async (req, res) => {
  const result = await Payment.find().lean();

  res.status(200).json({
    status: "Success",
    message: "Payment details have been found",
    data: result,
  });
});

const GetPaymentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Payment.findOne({ userId: id }).exec();

  res.status(200).json({
    status: "Success",
    message: "Payment details have been found",
    data: result,
  });
});
export const paymentController = {
  GetPaymentById,
  CreatePayment,
  getAllPayment,
};
