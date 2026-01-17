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
exports.MaintenanceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const maintenance_services_1 = require("./maintenance.services");
// get all the busMaintenance information from db
const GetAllMaintenanceInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield maintenance_services_1.MaintenanceServices.GetAllMaintenanceInfo();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All Bus Information Are Shown",
        data: result,
    });
}));
// get all the bus information from db
const PostMaintenanceInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busInfo = req.body;
    const result = yield maintenance_services_1.MaintenanceServices.PostMaintenanceInfo(busInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Bus infomation is",
        data: result,
    });
}));
// delete Maintenance information
const DeleteMaintenanceInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield maintenance_services_1.MaintenanceServices.DeleteMaintenanceInfo(id);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Bus infomation has been deleted",
        data: result,
    });
}));
// update Maintenance information
const UpdateMaintenanceInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newBusInfo = req.body;
    const result = yield maintenance_services_1.MaintenanceServices.UpdateMaintenanceInfo(id, newBusInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Bus infomation has been updated",
        data: result,
    });
}));
const totalMaintenance = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield maintenance_services_1.MaintenanceServices.totalMaintenance();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Bus infomation has been updated",
        data: result,
    });
}));
exports.MaintenanceController = {
    UpdateMaintenanceInfo,
    DeleteMaintenanceInfo,
    PostMaintenanceInfo,
    GetAllMaintenanceInfo,
    totalMaintenance,
};
