"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContectUs = void 0;
const mongoose_1 = require("mongoose");
const contectUsSchema = new mongoose_1.Schema({
    uId: {
        type: String,
        require: true,
    },
    semester: {
        type: String,
        enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
        require: true,
    },
    subject: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
exports.ContectUs = (0, mongoose_1.model)("contect-us", contectUsSchema);
