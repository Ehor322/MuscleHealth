import { NONAME } from "dns";
import { Schema, model } from "mongoose";
import Report from "./reports_interface";

const ReportSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    reportDate: {
      type: Date,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    typeOfPain: {
      type: String,
      default: "none",
    },
    test_id: { type: Schema.Types.ObjectId, ref: "Test" },
    user_id: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);

export default model<Report>("Reports", ReportSchema);
