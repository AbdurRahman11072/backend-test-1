"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceRoutes = void 0;
const express_1 = require("express");
const maintenance_controller_1 = require("./maintenance.controller");
const router = (0, express_1.Router)();
router.get("/get-all-maintenance-bus-info", maintenance_controller_1.MaintenanceController.GetAllMaintenanceInfo),
    router.get("/total-maintenance-info", maintenance_controller_1.MaintenanceController.totalMaintenance),
    router.post("/post-bus-maintenance-info", maintenance_controller_1.MaintenanceController.PostMaintenanceInfo);
router.delete("/delete-bus-maintenance-info/:id", maintenance_controller_1.MaintenanceController.DeleteMaintenanceInfo);
router.put("/update-bus-maintenance-info/:id", maintenance_controller_1.MaintenanceController.UpdateMaintenanceInfo);
exports.MaintenanceRoutes = router;
