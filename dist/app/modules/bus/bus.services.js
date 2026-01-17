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
exports.BusServices = void 0;
const maintenance_services_1 = require("../maintenanceTracking/maintenance.services");
const bus_model_1 = require("./bus.model");
const GetAllBusInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield bus_model_1.Bus.find();
    return info;
});
const GetBusInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield bus_model_1.Bus.find({}, {
        busRoute: 1,
        busName: 1,
        busArrivalTime: 1,
        busDestination: 1,
        busStatus: 1,
        busDepartureTime: 1,
        _id: 1,
    });
    return info;
});
// get data by id
const GetBusInfoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield bus_model_1.Bus.find({ busRoute: id });
    return info;
});
// create new bus information
const PostBusInfo = (busInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(busInfo);
    const postBusInfo = yield bus_model_1.Bus.create(busInfo);
    return postBusInfo;
});
// delete bus information
const DeleteBusInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBusInfo = yield bus_model_1.Bus.findByIdAndDelete(id);
    return deleteBusInfo;
});
// update bus information
const UpdateBusInfo = (id, newBusInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBusInfo = yield bus_model_1.Bus.findByIdAndUpdate(id, newBusInfo, {
        new: true,
        runValidators: true,
    });
    if ((updateBusInfo === null || updateBusInfo === void 0 ? void 0 : updateBusInfo.busStatus) === "Maintenance") {
        const data = {
            busName: updateBusInfo.busName,
            busId: updateBusInfo.busId,
            busRoute: updateBusInfo.busRoute,
        };
        console.log(data);
        const addToMaintenance = yield maintenance_services_1.MaintenanceServices.PostMaintenanceInfo(data);
    }
    return updateBusInfo;
});
//schedule
exports.BusServices = {
    GetAllBusInfo,
    PostBusInfo,
    DeleteBusInfo,
    UpdateBusInfo,
    GetBusInfo,
    GetBusInfoById,
};
