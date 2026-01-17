import { Router } from "express";
import { NoticeController } from "./notice.controller";

const router = Router();

router.get("/get-all-notice", NoticeController.GetAllNoticeInfo);
router.post("/post-notice", NoticeController.PostNoticeInfo);
router.put("/update-notice/:id", NoticeController.UpdateNoticeInfo);
router.delete("/delete-notice/:id", NoticeController.DeleteNoticeInfo);

export const NoticeRoutes = router;
