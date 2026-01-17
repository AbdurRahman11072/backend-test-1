import bcrypt from "bcrypt";
import { user } from "./user.model";
import customError from "../../error/customError";

//get user by id
const getUserById = async (id: string) => {
  const User = await user.findById(id);
  return User;
};

// create user

const CreateUser = async (data: any) => {
  const User = await user.create(data);
  return User;
};

// update user by id
const updateUserById = async (id: string, data: any) => {
  const User = await user.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return User;
};

//delete user
const deleteUserById = async (id: string) => {
  const User = await user.findByIdAndDelete(id);

  return User;
};

const findDriver = async () => {
  const User = await user.find({ roles: "Driver" });

  return User;
};

const updatePassword = async (
  uId: string,
  currentPassword: string,
  newPassword: string
) => {
  // Find user by uId
  const User = await user.findOne({ uId });
  if (!User) {
    throw new customError(`User with uId ${uId} not found`, 404);
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, User.password);
  if (!isPasswordValid) {
    throw new customError("Current password is incorrect", 400);
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  const updatedUser = await user.findOneAndUpdate(
    { uId },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

  return {
    message: "Password updated successfully",
    userId: updatedUser?._id,
    uId: updatedUser?.uId,
  };
};

export const userServices = {
  getUserById,
  updateUserById,
  deleteUserById,
  findDriver,
  CreateUser,
  updatePassword,
};
