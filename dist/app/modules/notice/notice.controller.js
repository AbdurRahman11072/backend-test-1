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
exports.NoticeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const notice_services_1 = require("./notice.services");
// get all the Notice information from db
const GetAllNoticeInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_services_1.NoticeServices.GetAllNoticeInfo();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All Notice Information Are Shown",
        data: result,
    });
}));
// create new Notice information
const PostNoticeInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const NoticeInfo = req.body;
    const result = yield notice_services_1.NoticeServices.PostNoticeInfo(NoticeInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Notice infomation is",
        data: result,
    });
}));
// delete Notice info
const DeleteNoticeInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield notice_services_1.NoticeServices.DeleteNoticeInfo(id);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Notice infomation has been deleted",
        data: result,
    });
}));
// update Notice information
const UpdateNoticeInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newNoticeInfo = req.body;
    const result = yield notice_services_1.NoticeServices.UpdateNoticeInfo(id, newNoticeInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Notice infomation has been updated",
        data: result,
    });
}));
exports.NoticeController = {
    GetAllNoticeInfo,
    PostNoticeInfo,
    DeleteNoticeInfo,
    UpdateNoticeInfo,
};
