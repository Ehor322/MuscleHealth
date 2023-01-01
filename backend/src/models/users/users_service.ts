import { Schema } from "mongoose";

import UserModel from "./users_model";
import token from "../../utils/token";
import User from "./users_interface";

const stripe = require("stripe")(process.env.STRIPE_KEY);

class UserService {
  private user = UserModel;

  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });
      if (!user) {
        throw new Error(
          "Unable to find user account with that email address"
        );
      }
      await this.user
      .findOneAndUpdate(
        { email: email },
        {
          allPaymentKeys: [],
        },
        { new: true }
      )
      .exec();

      if (await user.isValidPassword(password)) {
        const accesToken = token.createToken(user);
        return accesToken;
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error) {
      throw new Error("Unable to login user account");
    }
  }

  public async register(
    surname: string,
    email: string,
    password: string,
    phone: string,
    sex: string
  ): Promise<string | User | Error> {
    try {
      const userExists = await this.user.findOne({ email });

      if (userExists) {
        throw new Error("User account already exists");
      }

      const user = await this.user.create({
        surname,
        email,
        password,
        phone,
        sex
      });
      
      if (!user) {
        throw new Error("Unable to update player with that data");
      }

      return user;
    } catch (error) {
      throw new Error("Unable to create user account");
    }
  }

  public async subscription(
    user: User,
    dayOfSubscribe: number,
    key: string
  ): Promise<User | Error> {
    try {
      const curent_user = await this.user.findOne({
        _id: user._id,
      });

      if (!curent_user) {
        throw new Error("Unable to find this user");
      }

      const paymentKeys = curent_user.paymentKeys;
      const allPaymentKeys = curent_user.allPaymentKeys;

      if (paymentKeys.includes(key) || !allPaymentKeys.includes(key)) {
        throw new Error("Unable to renew premium");
      } else {
        await this.user.findOneAndUpdate(
          { _id: user._id },
          { $push: { paymentKeys: key } }
        );
      }

      let newSubscribeTime = new Date();
      if (user.timeToSub) {
        if (new Date(Date.now()) < user.timeToSub) {
          newSubscribeTime = user.timeToSub;
        } else {
          newSubscribeTime = new Date(Date.now());
        }
      }
      newSubscribeTime.setDate(newSubscribeTime.getDate() + dayOfSubscribe);
      const plr = await this.user
        .findByIdAndUpdate(
          user._id,
          { $set: { timeToSub: newSubscribeTime } },
          { new: true }
        )
        .select(["-password"])
        .exec();
      if (!plr) {
        throw new Error("Unable to premium renew with that data");
      }
      return plr;
    } catch (e) {
      throw new Error("nable to subscribe");
    }
  }

  public async payment(
    user: User,
    dayOfSubscribe: number,
    price: number,
    my_domain: string,
    name: string,
    key: string
  ): Promise<string | Error> {
    try {
      await this.user.findOneAndUpdate(
        { _id: user._id },
        { $push: { allPaymentKeys: key } }
      );

      const line_items = [
        {
          price_data: {
            currency: "uah",
            product_data: {
              name: name + " " + dayOfSubscribe + " " + "days",
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ];
      const time = new Date().getTime();

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${my_domain}/success/${key}/${time}/${dayOfSubscribe}`,
        cancel_url: `${my_domain}/canceled`,
      });

      return session.url;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  
  public async getAllusers(): Promise<User | Array<User> | Error> {
    try {
      const user = await this.user.find({ role: { $ne: "Reabilitator" } })

      if (!user) {
        throw new Error("Unable to find users");
      }

      return user;
    } catch (error) {
      throw new Error("Unable to find users");
    }
  }

  public async getUser(_id: Schema.Types.ObjectId): Promise<User | Error> {
    try {
      const user = await this.user
        .findById(_id)

      if (!user) {
        throw new Error("No logged in user account");
      }

      return user;
    } catch (error) {
      throw new Error("Unable to get user account");
    }
  }

  public async delete(_id: Schema.Types.ObjectId): Promise<User | Error> {
    try {
      const user = await this.user
        .findByIdAndDelete(_id)

      if (!user) {
        throw new Error("Unable to delete user account with that id");
      }

      return user;
    } catch (error) {
      throw new Error("Unable to delete user account");
    }
  }

  public async adminDelete(
    _id: Schema.Types.ObjectId
  ): Promise<User | Error> {
    try {
      const user = await this.user
        .findByIdAndDelete(_id)
        .select(["-password"])
        .exec();

      if (!user) {
        throw new Error("Unable to delete user with that data");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async adminUpdate(
    _id: Schema.Types.ObjectId,
    phone: string,
    sex: string,
    typeOfPain: string
  ): Promise<User | Error> {
    try {
      const user = await this.user
        .findByIdAndUpdate(
          _id,
          {
            phone: phone,
            sex: sex,
            typeOfPain: typeOfPain
          },
          { new: true }
        )

      if (!user) {
        throw new Error("Unable to update player with that data");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}

export default UserService;