import { Document, Schema } from "mongoose";


export default interface Reabilitator extends Document {
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  sex: string;
  role: string,
  user_id: Array <Schema.Types.ObjectId>;

  isValidPassword(passwod: string): Promise<Error | boolean>;
  getUpdate(): Promise<Error | Object>;
  setUpdate(obj: Object): Promise<Error | boolean>;
}