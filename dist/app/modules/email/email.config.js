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
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
const emailTemplete_1 = require("./emailTemplete");
// Create transporter with better configuration
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use true for port 465, false for port 587
    auth: {
        user: "rjrahman019@gmail.com",
        pass: "ahsfcdckxhmfkxoj",
    },
});
// Verify transporter on startup
transporter.verify(function (error, success) {
    if (error) {
        console.log("Email transporter verification failed:", error);
    }
    else {
        console.log("Email server is ready to send messages");
    }
});
const SendEmail = (email, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate inputs
        if (!email || !verificationCode) {
            throw new Error("Email and verification code are required");
        }
        if (!config_1.config.Gmail || !config_1.config.EmailPass) {
            throw new Error("Email credentials are not configured");
        }
        const info = yield transporter.sendMail({
            from: `"Green University" <${config_1.config.Gmail}>`,
            to: email,
            subject: "Verify Your Email - Green University",
            text: `Your verification code is: ${verificationCode}`,
            html: emailTemplete_1.Verification_Email_Template.replace("{verificationCode}", verificationCode),
        });
        console.log("Verification email sent:", info.messageId);
        return { success: true, messageId: info.messageId };
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw to handle in the calling function
    }
});
exports.SendEmail = SendEmail;
