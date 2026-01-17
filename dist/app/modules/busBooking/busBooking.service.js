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
exports.BusBookingServices = void 0;
const customError_1 = __importDefault(require("../../error/customError"));
const busBooking_model_1 = require("./busBooking.model");
const GetAllBusBookingInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield busBooking_model_1.BusBooking.find();
    return info;
});
const GetBookingByUid = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const getBookingDetails = yield busBooking_model_1.BusBooking.find({ uId: uid });
    if (!getBookingDetails || getBookingDetails.length === 0) {
        throw new customError_1.default("No Booking Found", 404);
    }
    return getBookingDetails;
});
// create new BusBooking information
const PostBusBookingInfo = (BusBookingInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const postBusBookingInfo = yield busBooking_model_1.BusBooking.create(BusBookingInfo);
    return postBusBookingInfo;
});
// delete BusBooking information
const DeleteBusBookingInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBusBookingInfo = yield busBooking_model_1.BusBooking.findByIdAndDelete(id);
    return deleteBusBookingInfo;
});
// update BusBooking information
// update user by id
const UpdateBusBookingInfo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updataBusBookingInfo = yield busBooking_model_1.BusBooking.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    return updataBusBookingInfo;
});
exports.BusBookingServices = {
    GetAllBusBookingInfo,
    PostBusBookingInfo,
    DeleteBusBookingInfo,
    UpdateBusBookingInfo,
    GetBookingByUid,
};
