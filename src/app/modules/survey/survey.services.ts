import customError from "../../error/customError";
import { Survey } from "./survey.model";

const GetAllSurveyInfo = async () => {
  const info = await Survey.find();

  return info;
};
const GetSurveyByUserId = async (id: any) => {
  const user = await Survey.findOne({ userId: id });
  console.log("Found user survey:", user);

  if (!user) {
    console.log("No survey data found for user:", id);
    return null;
  }

  return user;
};
// create new Survey information
const PostSurveyInfo = async (SurveyInfo: any) => {
  console.log(SurveyInfo);
  const { userId } = SurveyInfo;
  const isExist = await Survey.findOne({ userId: userId });
  if (isExist) {
    return new customError("You have already submited your survey", 404);
  }

  const postSurveyInfo = await Survey.create(SurveyInfo);

  return postSurveyInfo;
};

// delete all Survey information
const DeleteSurveyInfo = async () => {
  const deleteSurveyInfo = await Survey.deleteMany({});
  return deleteSurveyInfo;
};

// update Survey information
const UpdateSurveyInfo = async (id: any, newSurveyInfo: any) => {
  const updateSurveyInfo = await Survey.findOneAndUpdate(
    { userId: id },
    newSurveyInfo,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  return updateSurveyInfo;
};
export const SurveyServices = {
  GetAllSurveyInfo,
  PostSurveyInfo,
  DeleteSurveyInfo,
  UpdateSurveyInfo,
  GetSurveyByUserId,
};
