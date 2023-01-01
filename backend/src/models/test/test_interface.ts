import { Document, Schema } from "mongoose";

export default interface Test extends Document {
  name: string;
  testDate: Date;
  testTime: number;
  result: string;
  user_id: Schema.Types.ObjectId;
  power: Array<number>
}