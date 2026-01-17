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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceServices = void 0;
const maintenance_model_1 = require("./maintenance.model");
const GetAllMaintenanceInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield maintenance_model_1.Maintenance.find();
    return info;
});
// create new Maintenance information
const PostMaintenanceInfo = (MaintenanceInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const postMaintenanceInfo = yield maintenance_model_1.Maintenance.create(MaintenanceInfo);
    return postMaintenanceInfo;
});
// delete Maintenance information
const DeleteMaintenanceInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteMaintenanceInfo = yield maintenance_model_1.Maintenance.findByIdAndDelete(id);
    return deleteMaintenanceInfo;
});
// update Maintenance information
const UpdateMaintenanceInfo = (id, newMaintenanceInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const updateMaintenanceInfo = yield maintenance_model_1.Maintenance.findByIdAndUpdate(id, newMaintenanceInfo, {
        new: true,
        runValidators: true,
    });
    return updateMaintenanceInfo;
});
const totalMaintenance = () => __awaiter(void 0, void 0, void 0, function* () {
    const TotalMaintenance = maintenance_model_1.Maintenance.aggregate([
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
});
exports.MaintenanceServices = {
    GetAllMaintenanceInfo,
    PostMaintenanceInfo,
    DeleteMaintenanceInfo,
    UpdateMaintenanceInfo,
    totalMaintenance,
};
