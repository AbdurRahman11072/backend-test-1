import status from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { BusBookingServices } from "./busBooking.service";

// get all the BusBookin information from db
const GetAllBusBookinInfo = asyncHandler(async (req, res) => {
  const result = await BusBookingServices.GetAllBusBookingInfo();

  res.status(status.OK).json({
    status: "Success",
    message: "All BusBookin Information Are Shown",
    data: result,
  });
});
const GetBookingByUid = asyncHandler(async (req, res) => {
  const { uId } = req.body;
  const result = await BusBookingServices.GetBookingByUid(uId);

  res.status(status.OK).json({
    status: "Success",
    message: "All BusBookin Information Are Shown",
    data: result,
  });
});
// create new BusBookin information
const PostBusBookinInfo = asyncHandler(async (req, res) => {
  const BusBookinInfo = req.body;

  const result = await BusBookingServices.PostBusBookingInfo(BusBookinInfo);

  res.status(status.OK).json({
    status: "Success",
    message: "BusBookin infomation is",
    data: result,
  });
});
// delete BusBookin info
const DeleteBusBookinInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await BusBookingServices.DeleteBusBookingInfo(id);

  res.status(status.OK).json({
    status: "Success",
    message: "BusBookin infomation has been deleted",
    data: result,
  });
});
// update BusBookin information
const UpdateBusBookinInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newBusBookinInfo = req.body;
  const result = await BusBookingServices.UpdateBusBookingInfo(
    id as string,
    newBusBookinInfo
  );

  res.status(status.OK).json({
    status: "Success",
    message: "BusBookin infomation has been updated",
    data: result,
  });
});
export const BusBookinController = {
  GetAllBusBookinInfo,
  PostBusBookinInfo,
  DeleteBusBookinInfo,
  UpdateBusBookinInfo,
  GetBookingByUid,
};
