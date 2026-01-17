import status from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { ContectUs } from "./contactUs.model";

const GetAllContectInfo = asyncHandler(async (req, res) => {
  console.log(req.body);

  const result = await ContectUs.find();
  res.status(status.OK).json({
    status: "Success",
    message: "Thank you for Submitting info",
    data: result,
  });
});

const PostInfo = asyncHandler(async (req, res) => {
  console.log(req.body);

  const result = await ContectUs.create(req.body);
  res.status(status.OK).json({
    status: "Success",
    message: "Thank you for Submitting info",
    data: result,
  });
});
const DeleteContectUs = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await ContectUs.findByIdAndDelete(id);
  console.log(result);

  res.status(status.OK).json({
    status: "Success",
    message: "Thank you for Submitting info",
    data: result,
  });
});

export const contectUsController = {
  PostInfo,
  GetAllContectInfo,
  DeleteContectUs,
};
