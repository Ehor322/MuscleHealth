import { Schema, model } from "mongoose";
import Test from "./test_interface";

const TestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    testDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    testTime: {
      type: Number,
      required: true,
    },
    result: {
      type: String,
      required: true
    },
    power: {
      type: Array<Number>,
      required: true
    },
    user_id: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);

export default model<Test>("Tests", TestSchema);
