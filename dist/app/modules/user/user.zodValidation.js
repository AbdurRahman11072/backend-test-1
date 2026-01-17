"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = void 0;
const zod_1 = require("zod");
exports.userZodSchema = zod_1.z.object({
    uId: zod_1.z.number().min(1, "User ID must be a positive number"),
    username: zod_1.z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(30, "Username cannot exceed 30 characters"),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password cannot exceed 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    batchNo: zod_1.z.string().optional(), // Changed from batchNO to batchNo and to string
    department: zod_1.z.string().optional(), // Changed from email to string
    avatar_url: zod_1.z.string().url("Invalid URL format for avatar").optional(),
    verificationImage: zod_1.z
        .string()
        .url("Invalid URL format for verification image")
        .optional(),
    phone_number: zod_1.z
        .string()
        .regex(/^\+8801\d{9}$/, "Phone number must be in format: +8801XXXXXXXXX")
        .optional(),
    bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    roles: zod_1.z.enum(["Student", "Teacher", "Driver", "Admin"]).default("Student"),
    driverLicence: zod_1.z.string().optional(),
    licenceExpire: zod_1.z.string().optional(),
    isVerified: zod_1.z.boolean().default(false),
    verificationCode: zod_1.z.string().default(""),
    verificationCodeExpires: zod_1.z.date().optional(),
});
