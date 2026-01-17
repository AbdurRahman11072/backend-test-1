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
exports.SurveyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const survey_services_1 = require("./survey.services");
// get all the Survey information from db
const GetAllSurveyInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield survey_services_1.SurveyServices.GetAllSurveyInfo();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "All Survey Information Are Shown",
        data: result,
    });
}));
const GetSurveyByUserId = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield survey_services_1.SurveyServices.GetSurveyByUserId(id);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "User Survey Information Has Been Found",
        data: result,
    });
}));
// create new Survey information
const PostSurveyInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const SurveyInfo = req.body;
    const result = yield survey_services_1.SurveyServices.PostSurveyInfo(SurveyInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Survey infomation is added",
        data: result,
    });
}));
// delete all Survey info
const DeleteSurveyInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield survey_services_1.SurveyServices.DeleteSurveyInfo();
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Survey infomation has been deleted",
        data: result,
    });
}));
// update Survey information
const UpdateSurveyInfo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newSurveyInfo = req.body;
    const result = yield survey_services_1.SurveyServices.UpdateSurveyInfo(id, newSurveyInfo);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Survey infomation has been updated",
        data: result,
    });
}));
exports.SurveyController = {
    GetAllSurveyInfo,
    PostSurveyInfo,
    DeleteSurveyInfo,
    UpdateSurveyInfo,
    GetSurveyByUserId,
};
