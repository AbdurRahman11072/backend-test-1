import { model, Schema } from "mongoose";

const NoticeSchema = new Schema(
  {
    noticeFor: {
      type: String,
      enum: ["Student", "Teacher", "Driver", "All User"],
      default: "All",
    },
    subject: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    seen: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const Notice = model("notice", NoticeSchema);
