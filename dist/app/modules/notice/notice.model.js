"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
const mongoose_1 = require("mongoose");
const NoticeSchema = new mongoose_1.Schema({
    noticeFor: {
        type: String,
        enum: ["Student", "Teacher", "Driver", "All User"],
        default: "All",
    },
    subject: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    seen: {
        type: [String],
    },
}, {
    timestamps: true,
});
exports.Notice = (0, mongoose_1.model)("notice", NoticeSchema);
