import status from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import { NoticeServices } from "./notice.services";

// get all the Notice information from db
const GetAllNoticeInfo = asyncHandler(async (req, res) => {
  const result = await NoticeServices.GetAllNoticeInfo();

  res.status(status.OK).json({
    status: "Success",
    message: "All Notice Information Are Shown",
    data: result,
  });
});
// create new Notice information
const PostNoticeInfo = asyncHandler(async (req, res) => {
  const NoticeInfo = req.body;

  const result = await NoticeServices.PostNoticeInfo(NoticeInfo);

  res.status(status.OK).json({
    status: "Success",
    message: "Notice infomation is",
    data: result,
  });
});
// delete Notice info
const DeleteNoticeInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await NoticeServices.DeleteNoticeInfo(id);

  res.status(status.OK).json({
    status: "Success",
    message: "Notice infomation has been deleted",
    data: result,
  });
});
// update Notice information
const UpdateNoticeInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newNoticeInfo = req.body;
  const result = await NoticeServices.UpdateNoticeInfo(id, newNoticeInfo);

  res.status(status.OK).json({
    status: "Success",
    message: "Notice infomation has been updated",
    data: result,
  });
});
export const NoticeController = {
  GetAllNoticeInfo,
  PostNoticeInfo,
  DeleteNoticeInfo,
  UpdateNoticeInfo,
};
