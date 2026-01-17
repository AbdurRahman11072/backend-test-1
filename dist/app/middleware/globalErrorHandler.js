"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../config/index");
const customError_1 = __importDefault(require("../error/customError"));
const globalErrorHandler = (error, req, res, next) => {
    const isDev = index_1.config.NODE_ENV === "DEV";
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Error";
    if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const msg = `Invalid ${error.path}: ${error.value}. Not Found!!!`;
        error = new customError_1.default(msg, 404);
    }
    if ((error === null || error === void 0 ? void 0 : error.name) === "TokenExpiredError") {
        const msg = `Jwt token Expired. Please login again`;
        error = new customError_1.default(msg, 404);
    }
    if ((error === null || error === void 0 ? void 0 : error.name) === "JsonWebTokenError") {
        const msg = `Invaild token. Please login again`;
        error = new customError_1.default(msg, 404);
    }
    if ((error === null || error === void 0 ? void 0 : error.code) === "E11000") {
        const msg = `This ${Object.keys(error.keyValue)[0]} is already exist`;
        error = new customError_1.default(msg, 400);
    }
    res.status(error.statusCode).json(Object.assign({ status: error.status, message: error.message }, (isDev && {
        error: error,
        stackTrace: error.stack,
    })));
};
exports.default = globalErrorHandler;
