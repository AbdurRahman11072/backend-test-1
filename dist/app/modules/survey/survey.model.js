"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Survey = void 0;
const mongoose_1 = require("mongoose");
const classScheduleSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});
const surveySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        enum: ["Student", "Teacher"],
        default: "Student",
    },
    userDepartment: {
        type: String,
        required: true,
        default: "",
    },
    userSemester: {
        type: String,
        required: true,
    },
    classSchedules: {
        type: [classScheduleSchema],
        default: [],
    },
    destination: {
        type: String,
        required: true,
    },
    acBus: {
        type: String,
        required: true,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    // Added missing fields from Zod schema
    // Note: transactionId is not in your Zod schema but was in your original object
    // If you need it, add it to both Zod and Mongoose schemas
}, {
    timestamps: true,
});
// Optional: Add index for better query performance
surveySchema.index({ userId: 1 });
surveySchema.index({ userRole: 1 });
surveySchema.index({ userDepartment: 1 });
exports.Survey = (0, mongoose_1.model)("Survey", surveySchema);
