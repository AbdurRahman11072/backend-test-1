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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const user_model_1 = require("./user.model");
const user_services_1 = require("./user.services");
//get all user
const getAllUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.user.find();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User data has been found",
        data: result,
    });
}));
const createUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServices.CreateUser(req.body);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User has been created",
        data: result,
    });
}));
//getuserByid
const getUserById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.userServices.getUserById(id);
    console.log(result);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User has been found",
        data: result,
    });
}));
//update user by id
const updateUserById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield user_services_1.userServices.updateUserById(id, data);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User has been updated",
        data: result,
    });
}));
const deleteUserById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.userServices.deleteUserById(id);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User has been deleted",
        data: result,
    });
}));
const findDriver = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServices.findDriver();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User has been deleted",
        data: result,
    });
}));
const UpdatePassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield user_services_1.userServices.updateUserById(id, data);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User has been deleted",
        data: result,
    });
}));
exports.userController = {
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
    findDriver,
    createUser,
    UpdatePassword,
};
