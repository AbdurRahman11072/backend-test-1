import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { UserZodTypes } from "./user.zodValidation";

const userSchema = new Schema<UserZodTypes>(
  {
    uId: {
      type: Number,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    batchNo: {
      type: String,
      require: true,
    },
    department: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar_url: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    roles: {
      type: String,
      require: true,
      enum: ["Student", "Teacher", "Driver", "Admin"],
      default: "Student",
    },
    driverLicence: {
      type: String,
    },
    licenceExpire: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      require: true,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Generate verification code and set expiration before saving
userSchema.pre("save", async function (next) {
  // Hash password if it's modified
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Generate new verification code when user is created or when explicitly needed
  if (this.isNew || this.isModified("verificationCode")) {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    this.verificationCode = verificationCode;
    this.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  }

  next();
});

// Method to check if verification code is valid and not expired
userSchema.methods.isVerificationCodeValid = function (code: string): boolean {
  if (!this.verificationCode || !this.verificationCodeExpires) {
    return false;
  }

  const now = new Date();
  return this.verificationCode === code && now < this.verificationCodeExpires;
};

// Method to generate a new verification code
userSchema.methods.generateNewVerificationCode = function (): string {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  this.verificationCode = verificationCode;
  this.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  return verificationCode;
};

export const user = mongoose.model<UserZodTypes>("User", userSchema);
