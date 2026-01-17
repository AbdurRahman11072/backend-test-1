import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import customError from "../../error/customError";
import { SendEmail } from "../email/email.config";
import { user } from "../user/user.model";
import { UserZodTypes } from "../user/user.zodValidation";

//create user
const createUser = async (userData: UserZodTypes) => {
  // Check if uId already exists

  const existingUser = await user.findOne({ uId: userData.uId });
  if (existingUser) {
    throw new customError(`User with uId ${userData.uId} already exists`, 400);
  }

  const User = await user.create(userData);

  const email = User?.email;
  const verificationCode = User?.verificationCode;

  const token = jwt.sign({ id: User?._id }, config.JWT_SECRET as string, {
    expiresIn: `30d`,
  });

  const sendEmail = await SendEmail(email as any, verificationCode);
  return { User, token };
};

const loginUserById = async (uId: string, password: string) => {
  // check if uId and password is available
  if (!uId || !password) {
    throw new customError("Invalid user ID & password", 400);
  }

  const User = await user.findOne({ uId });

  // check if the user exists
  if (!User) {
    throw new customError("Invalid user ID or password", 404);
  }

  //verify the password
  const verifiedUser = await bcrypt.compare(password, User.password);

  // if the password is wrong send error message
  if (!verifiedUser) {
    throw new customError("Invalid user ID or password", 404);
  }

  // if the user is verified create jwt token
  const token = jwt.sign({ id: User?._id }, config.JWT_SECRET as string, {
    expiresIn: `1d`,
  });

  return { User, token };
};

//  verify email with code
type EmailData = {
  email: string;
  verificationCode: string;
};

const EmailVerification = async (data: EmailData) => {
  const { email, verificationCode } = data;
  console.log(email, verificationCode);

  const findEmail = await user.findOne({ email: email });

  if (!findEmail) {
    throw new customError("User is not available", 404);
  }
  if (findEmail.isVerified) {
    throw new customError("Email is already Verified", 404);
  }
  if (
    findEmail.verificationCodeExpires &&
    new Date() > findEmail.verificationCodeExpires
  ) {
    throw new customError("Verification code has expired", 400);
  }
  if (findEmail?.verificationCode != verificationCode) {
    throw new customError("Verification Code doesn't match", 404);
  }
  const updateData = await user.findOneAndUpdate(
    { email: email },
    { isVerified: true, verificationCode: "" },
    {
      new: true,
      runValidators: true,
    }
  );

  return updateData;
};

const updateExpireVerificationCode = async (email: any) => {
  const newVerificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  const updateVerificationCode = await user.findOneAndUpdate(
    { email: email },
    {
      verificationCode: newVerificationCode,
      verificationCodeExpires: expirationTime,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateVerificationCode) {
    throw new customError("Verification code has not been updated ", 404);
  }
  SendEmail(email, newVerificationCode);

  return updateVerificationCode;
};

const updatePassword = async (email: any, currentPass: any, newPass: any) => {
  const checkEmail = await user.findOne({ email: email });
  if (!checkEmail) {
    throw new customError("User doesn't exist", 404);
  }
  const verifiedUser = await bcrypt.compare(currentPass, checkEmail.password);

  if (!verifiedUser) {
    throw new customError("Wrong Password", 404);
  }

  const hashPass = await bcrypt.hash(newPass, 10);

  console.log(hashPass);
};
export const authService = {
  loginUserById,
  createUser,
  EmailVerification,
  updateExpireVerificationCode,
  updatePassword,
};
