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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeServices = void 0;
const notice_model_1 = require("./notice.model");
const GetAllNoticeInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield notice_model_1.Notice.find();
    return info;
});
// create new Notice information
const PostNoticeInfo = (NoticeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const postNoticeInfo = yield notice_model_1.Notice.create(NoticeInfo);
    return postNoticeInfo;
});
// delete Notice information
const DeleteNoticeInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteNoticeInfo = yield notice_model_1.Notice.findByIdAndDelete(id);
    return deleteNoticeInfo;
});
// update Notice information
const UpdateNoticeInfo = (id, newNoticeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const updateNoticeInfo = yield notice_model_1.Notice.findByIdAndUpdate(id, newNoticeInfo, {
        new: true,
        runValidators: true,
        context: "query",
    });
    return updateNoticeInfo;
});
exports.NoticeServices = {
    GetAllNoticeInfo,
    PostNoticeInfo,
    DeleteNoticeInfo,
    UpdateNoticeInfo,
};
