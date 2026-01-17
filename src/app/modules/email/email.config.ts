import nodemailer from "nodemailer";
import { config } from "../../config";
import { Verification_Email_Template } from "./emailTemplete";

// Create transporter with better configuration
const transporter = nodemailer.createTransport({
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
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const SendEmail = async (email: string, verificationCode: string) => {
  try {
    // Validate inputs
    if (!email || !verificationCode) {
      throw new Error("Email and verification code are required");
    }

    if (!config.Gmail || !config.EmailPass) {
      throw new Error("Email credentials are not configured");
    }

    const info = await transporter.sendMail({
      from: `"Green University" <${config.Gmail}>`,
      to: email,
      subject: "Verify Your Email - Green University",
      text: `Your verification code is: ${verificationCode}`,
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });

    console.log("Verification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw to handle in the calling function
  }
};
