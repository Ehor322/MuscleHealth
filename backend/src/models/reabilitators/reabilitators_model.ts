import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

import generatePasswordHash from "../../utils/generatePasswordHash";
import Reabilitator from "./reabilitators_interface";

const ReabilitatorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Invalid email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    sex: {
      type: String,
    },
    role: {
      type: String,
      default: "Reabilitator",
      enum: ["User", "Reabilitator"],
    },
    user_id: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);

ReabilitatorSchema.pre<Reabilitator>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await generatePasswordHash(this.password);

  this.password = hash;
  next();
});
ReabilitatorSchema.pre<Reabilitator>("findOneAndUpdate", async function (this) {
  const update: any = { ...this.getUpdate() };

  if (update.password) {
    update.password = await generatePasswordHash(update.password);
    this.setUpdate(update);
  }
});

ReabilitatorSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<Reabilitator>("Reabilitators", ReabilitatorSchema);
