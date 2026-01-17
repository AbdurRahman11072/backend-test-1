import { Router } from "express";
import { SurveyController } from "./survey.controller";

const router = Router();

router.get("/get-all-Survey", SurveyController.GetAllSurveyInfo);
router.get("/get-user/:id", SurveyController.GetSurveyByUserId);
router.post("/post-Survey", SurveyController.PostSurveyInfo);
router.patch("/update-Survey/:id", SurveyController.UpdateSurveyInfo);
router.delete("/delete-Survey/", SurveyController.DeleteSurveyInfo);

export const SurveyRoutes = router;
