import { z } from "zod";

export const userZodSchema = z.object({
  uId: z.number().min(1, "User ID must be a positive number"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password cannot exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  batchNo: z.string().optional(), // Changed from batchNO to batchNo and to string
  department: z.string().optional(), // Changed from email to string
  avatar_url: z.string().url("Invalid URL format for avatar").optional(),
  verificationImage: z
    .string()
    .url("Invalid URL format for verification image")
    .optional(),
  phone_number: z
    .string()
    .regex(/^\+8801\d{9}$/, "Phone number must be in format: +8801XXXXXXXXX")
    .optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  roles: z.enum(["Student", "Teacher", "Driver", "Admin"]).default("Student"),
  driverLicence: z.string().optional(),
  licenceExpire: z.string().optional(),
  isVerified: z.boolean().default(false),
  verificationCode: z.string().default(""),
  verificationCodeExpires: z.date().optional(),
});

export type UserZodTypes = z.infer<typeof userZodSchema>;
