import { Router } from "express";
import { contectUsController } from "./contectUs.controller";

const router = Router();
router.post("/post-info", contectUsController.PostInfo);
router.get("/", contectUsController.GetAllContectInfo);
router.delete("/:id", contectUsController.DeleteContectUs);

export const ContectUsRoute = router;
