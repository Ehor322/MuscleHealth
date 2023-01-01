import { Document, Schema } from "mongoose";

export default interface User extends Document {
  surname: string;
  email: string;
  password: string;
  sex: string;
  phone: string;
  timeToSub: Date;
  TypeOfPain: string;
  role: string,
  paymentKeys: Array<string>;
  allPaymentKeys: Array<string>;
  reabilitator_id: Schema.Types.ObjectId;
  //TODO: Reabilitator
 
  getUpdate(): Promise<Error | Object>;
  setUpdate(obj: Object): Promise<Error | boolean>;
  isValidPassword(passwod: string): Promise<Error | boolean>;
  isValidPremium(): Promise<Error | boolean>;
}