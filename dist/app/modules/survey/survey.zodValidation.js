"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
const classScheduleSchema = zod_1.default.object({
    id: zod_1.default.string(),
    day: zod_1.default.enum([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]),
    startTime: zod_1.default.string().regex(timeRegex, "Invalid time format (HH:MM)"),
    endTime: zod_1.default.string().regex(timeRegex, "Invalid time format (HH:MM)"),
});
const surveyZodSchema = zod_1.default.object({
    userId: zod_1.default.string(),
    userName: zod_1.default.string(),
    userRole: zod_1.default.enum(["Student", "Teacher"]).default("Student"),
    userDepartment: zod_1.default.string().default(""),
    userSemester: zod_1.default.string(),
    classSchedules: zod_1.default.array(classScheduleSchema).optional().default([]),
    destination: zod_1.default.string(),
    acBus: zod_1.default.string(),
    payment: zod_1.default.boolean().default(false),
});
