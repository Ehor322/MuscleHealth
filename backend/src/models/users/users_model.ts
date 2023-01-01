import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

import User from "./users_interface";
import generatePasswordHash from "../../utils/generatePasswordHash";

const UserSchema = new Schema(
  {
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Invalid email"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    sex: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    timeToSub: {
      type: Date
    },
    typeOfPain: {
      type: String,
      default: "none"
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Reabilitator"],
    },
    paymentKeys: {
      type: Array<string>,
      default: [],
    },
    allPaymentKeys: {
      type: Array<string>,
      default: [],
    },
    reabilitator_id: { type: Schema.Types.ObjectId, ref: "Rehabilitators" }
  },
  {
    timestamps: true
  }
);

UserSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await generatePasswordHash(this.password);

  this.password = hash;

  next();
});
UserSchema.methods.isValidPremium = async function (): Promise<
  Error | boolean
> {
  return new Date(Date.now()) < this.timeToSub;
};

UserSchema.pre<User>("findOneAndUpdate", async function (this) {
  const update: any = { ...this.getUpdate() };
  
  if (update.password) {
    update.password = await generatePasswordHash(update.password);
    this.setUpdate(update);
  }
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<User>("Users", UserSchema);