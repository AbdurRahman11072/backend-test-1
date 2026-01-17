import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";

//create user
const createUser = asyncHandler(async (req, res) => {
  const result = await authService.createUser(req.body);

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User has been created",
    data: result,
  });
});

// login user using id and password
const loginUserById = asyncHandler(async (req, res) => {
  const { uId, password } = req.body;

  const result = await authService.loginUserById(uId, password);

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User is found & user is authentic",
    data: result,
  });
});

const EmailVerification = asyncHandler(async (req, res) => {
  const emailData = req.body;
  console.log(emailData);

  const result = await authService.EmailVerification(emailData);

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "Verification Successful",
    data: result,
  });
});

const updateExpireVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await authService.updateExpireVerificationCode(email);
  res.status(httpStatus.OK).json({
    status: "Success",
    message:
      "Verification code has been sent to your email. Code will expire in 10 minutes",
    data: result,
  });
});

const updatePassword = asyncHandler(async (req, res) => {
  const { email, currentPass, newPass } = req.body;

  const result = await authService.updatePassword(email, currentPass, newPass);
  res.status(httpStatus.OK).json({
    status: "Success",
    message: "Password update Successful",
    data: result,
  });
});

export const authController = {
  createUser,
  loginUserById,
  EmailVerification,
  updateExpireVerificationCode,
  updatePassword,
};
