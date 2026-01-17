import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { user } from "./user.model";
import { userServices } from "./user.services";

//get all user
const getAllUser = asyncHandler(async (req, res) => {
  const result = await user.find();

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User data has been found",
    data: result,
  });
});
const createUser = asyncHandler(async (req, res) => {
  const result = await userServices.CreateUser(req.body);

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User has been created",
    data: result,
  });
});

//getuserByid
const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await userServices.getUserById(id as string);
  console.log(result);

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User has been found",
    data: result,
  });
});

//update user by id

const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await userServices.updateUserById(id as string, data);
  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User has been updated",
    data: result,
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await userServices.deleteUserById(id as string);
  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User has been deleted",
    data: result,
  });
});

const findDriver = asyncHandler(async (req, res) => {
  const result = await userServices.findDriver();
  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User has been deleted",
    data: result,
  });
});

const UpdatePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await userServices.updateUserById(id as string, data);

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User has been deleted",
    data: result,
  });
});

export const userController = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  findDriver,
  createUser,
  UpdatePassword,
};
