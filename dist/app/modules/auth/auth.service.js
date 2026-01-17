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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const customError_1 = __importDefault(require("../../error/customError"));
const email_config_1 = require("../email/email.config");
const user_model_1 = require("../user/user.model");
//create user
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if uId already exists
    const existingUser = yield user_model_1.user.findOne({ uId: userData.uId });
    if (existingUser) {
        throw new customError_1.default(`User with uId ${userData.uId} already exists`, 400);
    }
    const User = yield user_model_1.user.create(userData);
    const email = User === null || User === void 0 ? void 0 : User.email;
    const verificationCode = User === null || User === void 0 ? void 0 : User.verificationCode;
    const token = jsonwebtoken_1.default.sign({ id: User === null || User === void 0 ? void 0 : User._id }, config_1.config.JWT_SECRET, {
        expiresIn: `30d`,
    });
    const sendEmail = yield (0, email_config_1.SendEmail)(email, verificationCode);
    return { User, token };
});
const loginUserById = (uId, password) => __awaiter(void 0, void 0, void 0, function* () {
    // check if uId and password is available
    if (!uId || !password) {
        throw new customError_1.default("Invalid user ID & password", 400);
    }
    const User = yield user_model_1.user.findOne({ uId });
    // check if the user exists
    if (!User) {
        throw new customError_1.default("Invalid user ID or password", 404);
    }
    //verify the password
    const verifiedUser = yield bcrypt_1.default.compare(password, User.password);
    // if the password is wrong send error message
    if (!verifiedUser) {
        throw new customError_1.default("Invalid user ID or password", 404);
    }
    // if the user is verified create jwt token
    const token = jsonwebtoken_1.default.sign({ id: User === null || User === void 0 ? void 0 : User._id }, config_1.config.JWT_SECRET, {
        expiresIn: `1d`,
    });
    return { User, token };
});
const EmailVerification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, verificationCode } = data;
    console.log(email, verificationCode);
    const findEmail = yield user_model_1.user.findOne({ email: email });
    if (!findEmail) {
        throw new customError_1.default("User is not available", 404);
    }
    if (findEmail.isVerified) {
        throw new customError_1.default("Email is already Verified", 404);
    }
    if (findEmail.verificationCodeExpires &&
        new Date() > findEmail.verificationCodeExpires) {
        throw new customError_1.default("Verification code has expired", 400);
    }
    if ((findEmail === null || findEmail === void 0 ? void 0 : findEmail.verificationCode) != verificationCode) {
        throw new customError_1.default("Verification Code doesn't match", 404);
    }
    const updateData = yield user_model_1.user.findOneAndUpdate({ email: email }, { isVerified: true, verificationCode: "" }, {
        new: true,
        runValidators: true,
    });
    return updateData;
});
const updateExpireVerificationCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    const updateVerificationCode = yield user_model_1.user.findOneAndUpdate({ email: email }, {
        verificationCode: newVerificationCode,
        verificationCodeExpires: expirationTime,
    }, {
        new: true,
        runValidators: true,
    });
    if (!updateVerificationCode) {
        throw new customError_1.default("Verification code has not been updated ", 404);
    }
    (0, email_config_1.SendEmail)(email, newVerificationCode);
    return updateVerificationCode;
});
const updatePassword = (email, currentPass, newPass) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmail = yield user_model_1.user.findOne({ email: email });
    if (!checkEmail) {
        throw new customError_1.default("User doesn't exist", 404);
    }
    const verifiedUser = yield bcrypt_1.default.compare(currentPass, checkEmail.password);
    if (!verifiedUser) {
        throw new customError_1.default("Wrong Password", 404);
    }
    const hashPass = yield bcrypt_1.default.hash(newPass, 10);
    console.log(hashPass);
});
exports.authService = {
    loginUserById,
    createUser,
    EmailVerification,
    updateExpireVerificationCode,
    updatePassword,
};
