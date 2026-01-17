import { Router } from "express";
import { MaintenanceController } from "./maintenance.controller";

const router = Router();

router.get(
  "/get-all-maintenance-bus-info",
  MaintenanceController.GetAllMaintenanceInfo
),
  router.get("/total-maintenance-info", MaintenanceController.totalMaintenance),
  router.post(
    "/post-bus-maintenance-info",
    MaintenanceController.PostMaintenanceInfo
  );
router.delete(
  "/delete-bus-maintenance-info/:id",
  MaintenanceController.DeleteMaintenanceInfo
);
router.put(
  "/update-bus-maintenance-info/:id",
  MaintenanceController.UpdateMaintenanceInfo
);

export const MaintenanceRoutes = router;
