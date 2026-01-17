"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_service_1 = require("./auth.service");
//create user
const createUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.createUser(req.body);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User has been created",
        data: result,
    });
}));
// login user using id and password
const loginUserById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uId, password } = req.body;
    const result = yield auth_service_1.authService.loginUserById(uId, password);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User is found & user is authentic",
        data: result,
    });
}));
const EmailVerification = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailData = req.body;
    console.log(emailData);
    const result = yield auth_service_1.authService.EmailVerification(emailData);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Verification Successful",
        data: result,
    });
}));
const updateExpireVerificationCode = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.authService.updateExpireVerificationCode(email);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Verification code has been sent to your email. Code will expire in 10 minutes",
        data: result,
    });
}));
const updatePassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, currentPass, newPass } = req.body;
    const result = yield auth_service_1.authService.updatePassword(email, currentPass, newPass);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Password update Successful",
        data: result,
    });
}));
exports.authController = {
    createUser,
    loginUserById,
    EmailVerification,
    updateExpireVerificationCode,
    updatePassword,
};
