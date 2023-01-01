import { Document, Schema } from "mongoose";

export default interface Report extends Document {
  userName: string;
  reportDate: Date;
  result: string;
  typeOfPain: string;
  test_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
}