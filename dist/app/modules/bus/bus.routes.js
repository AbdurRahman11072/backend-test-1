"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoutes = void 0;
const express_1 = require("express");
const zodValidator_1 = __importDefault(require("../../middleware/zodValidator"));
const bus_controller_1 = require("./bus.controller");
const bus_zodValidation_1 = require("./bus.zodValidation");
const router = (0, express_1.Router)();
router.get("/get-bus-info", bus_controller_1.BusController.GetAllBusInfo);
router.get("/schedule", bus_controller_1.BusController.getBusRouteSummary);
router.get("/", bus_controller_1.BusController.GetBusInfo);
router.get("/:id", bus_controller_1.BusController.GetBusInfoById);
router.post("/post-bus-info", (0, zodValidator_1.default)(bus_zodValidation_1.busZodSchema), bus_controller_1.BusController.PostBusInfo);
router.put("/update-bus-info/:id", bus_controller_1.BusController.UpdateBusInfo);
router.delete("/delete-bus-info/:id", bus_controller_1.BusController.DeleteBusInfo);
exports.BusRoutes = router;
