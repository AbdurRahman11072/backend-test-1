import { Router } from "express";
import { authController } from "./auth.controller";
import zodValidator from "../../middleware/zodValidator";
import { userZodSchema } from "../user/user.zodValidation";

const router = Router();

router.put("/verify-email", authController.EmailVerification);
router.post("/login", authController.loginUserById);
router.post(
  "/create-user",
  zodValidator(userZodSchema),
  authController.createUser
);
router.put(
  "/update-pass",

  authController.updatePassword
);
router.put("/new-code", authController.updateExpireVerificationCode);

export const AuthRoutes = router;
