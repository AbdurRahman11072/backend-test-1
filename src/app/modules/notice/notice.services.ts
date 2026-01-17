import { Notice } from "./notice.model";

const GetAllNoticeInfo = async () => {
  const info = await Notice.find();

  return info;
};
// create new Notice information
const PostNoticeInfo = async (NoticeInfo: any) => {
  const postNoticeInfo = await Notice.create(NoticeInfo);

  return postNoticeInfo;
};

// delete Notice information
const DeleteNoticeInfo = async (id: any) => {
  const deleteNoticeInfo = await Notice.findByIdAndDelete(id);
  return deleteNoticeInfo;
};
// update Notice information
const UpdateNoticeInfo = async (id: any, newNoticeInfo: any) => {
  const updateNoticeInfo = await Notice.findByIdAndUpdate(id, newNoticeInfo, {
    new: true,
    runValidators: true,
    context: "query",
  });
  return updateNoticeInfo;
};
export const NoticeServices = {
  GetAllNoticeInfo,
  PostNoticeInfo,
  DeleteNoticeInfo,
  UpdateNoticeInfo,
};
