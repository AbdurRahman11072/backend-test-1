import { Maintenance } from "./maintenance.model";

const GetAllMaintenanceInfo = async () => {
  const info = await Maintenance.find();

  return info;
};
// create new Maintenance information
const PostMaintenanceInfo = async (MaintenanceInfo: any) => {
  const postMaintenanceInfo = await Maintenance.create(MaintenanceInfo);

  return postMaintenanceInfo;
};

// delete Maintenance information
const DeleteMaintenanceInfo = async (id: any) => {
  const deleteMaintenanceInfo = await Maintenance.findByIdAndDelete(id);
  return deleteMaintenanceInfo;
};
// update Maintenance information
const UpdateMaintenanceInfo = async (id: any, newMaintenanceInfo: any) => {
  const updateMaintenanceInfo = await Maintenance.findByIdAndUpdate(
    id,
    newMaintenanceInfo,
    {
      new: true,
      runValidators: true,
    }
  );
  return updateMaintenanceInfo;
};
const totalMaintenance = async () => {
  const TotalMaintenance = Maintenance.aggregate([
    {
      $group: {
        _id: {
          busId: "$busId",
          busRoute: "$busRoute",
        },
        totalBusCount: { $sum: 1 },
        lastCreatedData: { $last: "$$ROOT" },
      },
    },
    {
      $project: {
        busId: "$_id.busId",
        busRoute: "$_id.busRoute",
        totalBusCount: 1,
        lastCreatedData: 1,
        _id: 0,
      },
    },
    {
      $sort: {
        busId: 1,
        busRoute: 1,
      },
    },
  ]);
  return TotalMaintenance;
};
export const MaintenanceServices = {
  GetAllMaintenanceInfo,
  PostMaintenanceInfo,
  DeleteMaintenanceInfo,
  UpdateMaintenanceInfo,
  totalMaintenance,
};
