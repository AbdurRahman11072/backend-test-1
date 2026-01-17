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
exports.SurveyServices = void 0;
const customError_1 = __importDefault(require("../../error/customError"));
const survey_model_1 = require("./survey.model");
const GetAllSurveyInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield survey_model_1.Survey.find();
    return info;
});
const GetSurveyByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield survey_model_1.Survey.findOne({ userId: id });
    console.log("Found user survey:", user);
    if (!user) {
        console.log("No survey data found for user:", id);
        return null;
    }
    return user;
});
// create new Survey information
const PostSurveyInfo = (SurveyInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(SurveyInfo);
    const { userId } = SurveyInfo;
    const isExist = yield survey_model_1.Survey.findOne({ userId: userId });
    if (isExist) {
        return new customError_1.default("You have already submited your survey", 404);
    }
    const postSurveyInfo = yield survey_model_1.Survey.create(SurveyInfo);
    return postSurveyInfo;
});
// delete all Survey information
const DeleteSurveyInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSurveyInfo = yield survey_model_1.Survey.deleteMany({});
    return deleteSurveyInfo;
});
// update Survey information
const UpdateSurveyInfo = (id, newSurveyInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const updateSurveyInfo = yield survey_model_1.Survey.findOneAndUpdate({ userId: id }, newSurveyInfo, {
        new: true,
        runValidators: true,
        context: "query",
    });
    return updateSurveyInfo;
});
exports.SurveyServices = {
    GetAllSurveyInfo,
    PostSurveyInfo,
    DeleteSurveyInfo,
    UpdateSurveyInfo,
    GetSurveyByUserId,
};
