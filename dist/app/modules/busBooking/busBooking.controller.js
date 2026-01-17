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
exports.BusBookinController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const busBooking_service_1 = require("./busBooking.service");
// get all the BusBookin information from db
const GetAllBusBookinInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield busBooking_service_1.BusBookingServices.GetAllBusBookingInfo();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All BusBookin Information Are Shown",
        data: result,
    });
}));
const GetBookingByUid = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uId } = req.body;
    const result = yield busBooking_service_1.BusBookingServices.GetBookingByUid(uId);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All BusBookin Information Are Shown",
        data: result,
    });
}));
// create new BusBookin information
const PostBusBookinInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BusBookinInfo = req.body;
    const result = yield busBooking_service_1.BusBookingServices.PostBusBookingInfo(BusBookinInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "BusBookin infomation is",
        data: result,
    });
}));
// delete BusBookin info
const DeleteBusBookinInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield busBooking_service_1.BusBookingServices.DeleteBusBookingInfo(id);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "BusBookin infomation has been deleted",
        data: result,
    });
}));
// update BusBookin information
const UpdateBusBookinInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newBusBookinInfo = req.body;
    const result = yield busBooking_service_1.BusBookingServices.UpdateBusBookingInfo(id, newBusBookinInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "BusBookin infomation has been updated",
        data: result,
    });
}));
exports.BusBookinController = {
    GetAllBusBookinInfo,
    PostBusBookinInfo,
    DeleteBusBookinInfo,
    UpdateBusBookinInfo,
    GetBookingByUid,
};
