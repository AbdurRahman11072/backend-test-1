import status from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { MaintenanceServices } from "./maintenance.services";

// get all the busMaintenance information from db
const GetAllMaintenanceInfo = asyncHandler(async (req, res) => {
  const result = await MaintenanceServices.GetAllMaintenanceInfo();

  res.status(status.OK).json({
    status: "Success",
    message: "All Bus Information Are Shown",
    data: result,
  });
});
// get all the bus information from db
const PostMaintenanceInfo = asyncHandler(async (req, res) => {
  const busInfo = req.body;

  const result = await MaintenanceServices.PostMaintenanceInfo(busInfo);

  res.status(status.OK).json({
    status: "Success",
    message: "Bus infomation is",
    data: result,
  });
});
// delete Maintenance information
const DeleteMaintenanceInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await MaintenanceServices.DeleteMaintenanceInfo(id);

  res.status(status.OK).json({
    status: "Success",
    message: "Bus infomation has been deleted",
    data: result,
  });
});
// update Maintenance information
const UpdateMaintenanceInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const newBusInfo = req.body;
  const result = await MaintenanceServices.UpdateMaintenanceInfo(
    id,
    newBusInfo
  );

  res.status(status.OK).json({
    status: "Success",
    message: "Bus infomation has been updated",
    data: result,
  });
});

const totalMaintenance = asyncHandler(async (req, res) => {
  const result = await MaintenanceServices.totalMaintenance();
  res.status(status.OK).json({
    status: "Success",
    message: "Bus infomation has been updated",
    data: result,
  });
});
export const MaintenanceController = {
  UpdateMaintenanceInfo,
  DeleteMaintenanceInfo,
  PostMaintenanceInfo,
  GetAllMaintenanceInfo,
  totalMaintenance,
};
