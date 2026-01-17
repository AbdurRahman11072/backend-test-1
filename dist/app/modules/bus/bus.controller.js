"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const bus_model_1 = require("./bus.model");
const bus_services_1 = require("./bus.services");
// get all the bus information from db
const GetAllBusInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_services_1.BusServices.GetAllBusInfo();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All Bus Information Are Shown",
        data: result,
    });
}));
// get all the bus information from db
const GetBusInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_services_1.BusServices.GetBusInfo();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All Bus Information Are Shown",
        data: result,
    });
}));
// get the bus information by route
const GetBusInfoById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield bus_services_1.BusServices.GetBusInfoById(id);
    console.log(result);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All Bus Information Are Shown",
        data: result,
    });
}));
// create new bus information
const PostBusInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busInfo = req.body;
    console.log(busInfo);
    const result = yield bus_services_1.BusServices.PostBusInfo(busInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Bus infomation is",
        data: result,
    });
}));
// delete bus info
const DeleteBusInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bus_services_1.BusServices.DeleteBusInfo(id);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Bus infomation has been deleted",
        data: result,
    });
}));
// update bus information
const UpdateBusInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newBusInfo = req.body;
    const result = yield bus_services_1.BusServices.UpdateBusInfo(id, newBusInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Bus infomation has been updated",
        data: result,
    });
}));
//schedule
const getBusRouteSummary = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bus_model_1.Bus.aggregate([
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
    }
    catch (error) {
        // Let the asyncHandler handle the error
        throw error;
    }
}));
exports.BusController = {
    GetAllBusInfo,
    PostBusInfo,
    DeleteBusInfo,
    UpdateBusInfo,
    GetBusInfo,
    GetBusInfoById,
    getBusRouteSummary,
};
