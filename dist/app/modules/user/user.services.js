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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const customError_1 = __importDefault(require("../../error/customError"));
//get user by id
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield user_model_1.user.findById(id);
    return User;
});
// create user
const CreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield user_model_1.user.create(data);
    return User;
});
// update user by id
const updateUserById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield user_model_1.user.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    return User;
});
//delete user
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield user_model_1.user.findByIdAndDelete(id);
    return User;
});
const findDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield user_model_1.user.find({ roles: "Driver" });
    return User;
});
const updatePassword = (uId, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by uId
    const User = yield user_model_1.user.findOne({ uId });
    if (!User) {
        throw new customError_1.default(`User with uId ${uId} not found`, 404);
    }
    // Verify current password
    const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, User.password);
    if (!isPasswordValid) {
        throw new customError_1.default("Current password is incorrect", 400);
    }
    // Hash new password
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
    // Update password
    const updatedUser = yield user_model_1.user.findOneAndUpdate({ uId }, { password: hashedPassword }, { new: true, runValidators: true });
    return {
        message: "Password updated successfully",
        userId: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id,
        uId: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.uId,
    };
});
exports.userServices = {
    getUserById,
    updateUserById,
    deleteUserById,
    findDriver,
    CreateUser,
    updatePassword,
};
