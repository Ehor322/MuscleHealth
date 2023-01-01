import { Schema } from "mongoose";

import ReabilitatorSchema from "./reabilitators_model";
import token from "../../utils/token";
import Reabilitator from "./reabilitators_interface";

class ReabilitatorService {
  private reabilitator = ReabilitatorSchema;

  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const reabilitator = await this.reabilitator.findOne({ email });
      if (!reabilitator) {
        throw new Error(
          "Unable to find reabilitator account with that email address"
        );
      }

      if (await reabilitator.isValidPassword(password)) {
        const accesToken = token.createTokenReabilitator(reabilitator);
        return accesToken;
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error) {
      throw new Error("Unable to login reabilitator account");
    }
  }

  public async register(
    name: string,
    email: string,
    password: string,
    birth_date: Date,
    sex: string
  ): Promise<string | Error> {
    try {
      const reabilitatorExists = await this.reabilitator.findOne({ email });

      if (reabilitatorExists) {
        throw new Error("Reabilitator account already exists");
      }

      const reabilitator = await this.reabilitator.create({
        name,
        email,
        password,
        birth_date,
        sex,
      });

      const accesToken = token.createTokenReabilitator(reabilitator);

      return accesToken;
    } catch (error) {
      throw new Error("Unable to create reabilitator account");
    }
  }

  public async updatePassword(
    _id: Schema.Types.ObjectId,
    new_password: string,
    password: string
  ): Promise<Reabilitator | Error> {
    try {
      const account = await this.reabilitator.findOne({ _id });

      if (!account) {
        throw new Error("Unable to find account with that id");
      }
      if (await account.isValidPassword(password)) {
        const reabilitator = await this.reabilitator
          .findOneAndUpdate(
            { _id: _id },
            { password: new_password },
            { new: true },
          )
          .populate([{
            path: "user_id",
            populate: { path: "_id" },
          }])
          .select("-password");
        if (!reabilitator) {
          throw new Error("Unable to update reabilitator account with that id");
        }

        return reabilitator;
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error) {
      throw new Error("The old password does not match the entered one");
    }
  }

  public async getReabilitator(_id: Schema.Types.ObjectId): Promise<Reabilitator | Error> {
    try {
      const reabilitator = await this.reabilitator
        .findById(_id)
        
      if (!reabilitator) {
        throw new Error("No logged in reabilitator account");
      }

      return reabilitator;
    } catch (error) {
      throw new Error("Unable to get reabilitator account");
    }
  }


  public async delete(
    _id: Schema.Types.ObjectId
  ): Promise<Reabilitator | Error> {
    try {
      const reabilitator = await this.reabilitator
        .findByIdAndDelete(_id)
        .populate([{
          path: "user_id",
          populate: { path: "_id" },
        }])
        .select("-password");

      if (!reabilitator) {
        throw new Error("Unable to delete reabilitator account with that id");
      }

      return reabilitator;
    } catch (error) {
      throw new Error("Unable to delete reabilitator account");
    }
  }
}

export default ReabilitatorService;
