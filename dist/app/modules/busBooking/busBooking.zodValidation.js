"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const busBookingZodSchema = zod_1.default.object({
    uId: zod_1.default.string(),
    userEmail: zod_1.default.string(),
    userName: zod_1.default.string(),
    bookingSubject: zod_1.default
        .string()
        .min(10, "Subject must content 10 character")
        .max(60, "Subject must have less then 60 character"),
    bookingDescription: zod_1.default
        .string()
        .min(10, "Description must content 10 character")
        .max(200, "Description must have less then 200 character"),
    totalPassanger: zod_1.default.string(),
    bookingTime: zod_1.default.string(),
    bookingDate: zod_1.default.string(),
    feedback: zod_1.default
        .string()
        .min(10, "Feedback must content 10 character")
        .max(200, "Feedback must have less then 200 character")
        .optional(),
    status: zod_1.default.enum(["Accepted", "Rejected", "Pending"]).default("Pending"),
});
