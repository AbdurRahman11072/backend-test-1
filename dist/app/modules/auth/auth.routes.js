"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const zodValidator_1 = __importDefault(require("../../middleware/zodValidator"));
const user_zodValidation_1 = require("../user/user.zodValidation");
const router = (0, express_1.Router)();
router.put("/verify-email", auth_controller_1.authController.EmailVerification);
router.post("/login", auth_controller_1.authController.loginUserById);
router.post("/create-user", (0, zodValidator_1.default)(user_zodValidation_1.userZodSchema), auth_controller_1.authController.createUser);
router.put("/update-pass", auth_controller_1.authController.updatePassword);
router.put("/new-code", auth_controller_1.authController.updateExpireVerificationCode);
exports.AuthRoutes = router;
