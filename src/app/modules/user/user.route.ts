import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.get("/get-all-user", userController.getAllUser);
router.get("/get-all-driver", userController.findDriver);

router.get("/get-user/:id", userController.getUserById);
router.post("/create-user", userController.createUser);
router.put("/update-user/:id", userController.updateUserById);
router.delete("/delete-user/:id", userController.deleteUserById);

export const userRoutes = router;
