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
exports.contectUsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const contactUs_model_1 = require("./contactUs.model");
const GetAllContectInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield contactUs_model_1.ContectUs.find();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Thank you for Submitting info",
        data: result,
    });
}));
const PostInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield contactUs_model_1.ContectUs.create(req.body);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Thank you for Submitting info",
        data: result,
    });
}));
const DeleteContectUs = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield contactUs_model_1.ContectUs.findByIdAndDelete(id);
    console.log(result);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Thank you for Submitting info",
        data: result,
    });
}));
exports.contectUsController = {
    PostInfo,
    GetAllContectInfo,
    DeleteContectUs,
};
