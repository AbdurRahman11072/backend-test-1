import { Request, Response, Router } from "express";
import { BusBookinController } from "./busBooking.controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("working fine");
});
router.get("/get-all-bus-booking", BusBookinController.GetAllBusBookinInfo);
router.post("/get-bus-booking-by-uid", BusBookinController.GetBookingByUid);
router.post("/post-bus-booking", BusBookinController.PostBusBookinInfo);
router.put("/update-bus-booking/:id", BusBookinController.UpdateBusBookinInfo);
router.delete(
  "/delete-bus-booking/:id",
  BusBookinController.DeleteBusBookinInfo
);

export const BusBookingRoutes = router;
