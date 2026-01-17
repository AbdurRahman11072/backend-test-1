import status from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { Bus } from "./bus.model";
import { BusServices } from "./bus.services";

// get all the bus information from db
const GetAllBusInfo = asyncHandler(async (req, res) => {
  const result = await BusServices.GetAllBusInfo();

  res.status(status.OK).json({
    status: "Success",
    message: "All Bus Information Are Shown",
    data: result,
  });
});
// get all the bus information from db
const GetBusInfo = asyncHandler(async (req, res) => {
  const result = await BusServices.GetBusInfo();

  res.status(status.OK).json({
    status: "Success",
    message: "All Bus Information Are Shown",
    data: result,
  });
});

// get the bus information by route
const GetBusInfoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const result = await BusServices.GetBusInfoById(id);
  console.log(result);

  res.status(status.OK).json({
    status: "Success",
    message: "All Bus Information Are Shown",
    data: result,
  });
});

// create new bus information
const PostBusInfo = asyncHandler(async (req, res) => {
  const busInfo = req.body;
  console.log(busInfo);

  const result = await BusServices.PostBusInfo(busInfo);

  res.status(status.OK).json({
    status: "Success",
    message: "Bus infomation is",
    data: result,
  });
});
// delete bus info
const DeleteBusInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await BusServices.DeleteBusInfo(id);

  res.status(status.OK).json({
    status: "Success",
    message: "Bus infomation has been deleted",
    data: result,
  });
});
// update bus information
const UpdateBusInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newBusInfo = req.body;
  const result = await BusServices.UpdateBusInfo(id, newBusInfo);

  res.status(status.OK).json({
    status: "Success",
    message: "Bus infomation has been updated",
    data: result,
  });
});

//schedule
const getBusRouteSummary = asyncHandler(async (req, res) => {
  try {
    const result = await Bus.aggregate([
      {
        $group: {
          _id: "$busRoute",
          totalBus: { $sum: 1 },
          destinations: {
            $addToSet: {
              $arrayElemAt: ["$busDestination", 0],
            },
          },
          // Use $first to get representative times, or aggregate for better data
          departureTime: { $first: "$busDepartureTime" },
          arrivalTime: { $first: "$busArrivalTime" },
          departureTime2: { $first: "$busDepartureTime2" },
          arrivalTime2: { $first: "$busArrivalTime2" },
          buses: {
            $push: {
              busId: "$busId",
              busName: "$busName",
              busStatus: "$busStatus",
            },
          },
        },
      },
      {
        $project: {
          busRoute: "$_id",
          totalBus: 1,
          destinations: 1,
          departureTime: 1,
          arrivalTime: 1,
          departureTime2: 1,
          arrivalTime2: 1,
          buses: 1,
          _id: 0,
        },
      },
      {
        $sort: { busRoute: 1 },
      },
    ]);

    // Check if result is empty
    if (!result || result.length === 0) {
      return res.status(404).json({
        status: "Success",
        message: "No bus routes found",
        data: [],
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Bus route summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    // Let the asyncHandler handle the error
    throw error;
  }
});
export const BusController = {
  GetAllBusInfo,
  PostBusInfo,
  DeleteBusInfo,
  UpdateBusInfo,
  GetBusInfo,
  GetBusInfoById,
  getBusRouteSummary,
};
