import { Schema } from "mongoose";
import TestModel from "./test_model";
import Test from "./test_interface";

class TestService {
  private test = TestModel;

  public async createTest(
    name: String,
    testDate: Date,
    testTime: Number,
    result: String,
    user_id: Schema.Types.ObjectId,
    power: Array<Number>
  ): Promise<Test | Error> {
    try {
      const test = await this.test.create({
        name,
        testDate,
        testTime,
        result,
        user_id,
        power
      });

      return test;
    } catch (error) {
      throw new Error("Unable to create report");
    }
  }

  public async delete(_id: Schema.Types.ObjectId): Promise<Test | Error> {
    try {
      const test = await this.test
        .findByIdAndDelete(_id)

      if (!test) {
        throw new Error("Unable to delete test with that id");
      }

      return test;
    } catch (error) {
      throw new Error("Unable to delete test");
    }
  }

  public async search(_id: Schema.Types.ObjectId): Promise<Test | Error> {
    try {
      const test = await this.test
        .findOne({_id:_id})

      if (!test) {
        throw new Error("Unable to delete test with that id");
      }

      return test;
    } catch (error) {
      throw new Error("Unable to delete test");
    }
  }

  public async getAlltests(): Promise<Test | Array<Test> | Error> {
    try {
      const test = await this.test.find({})

      if (!test) {
        throw new Error("Unable to find tests");
      }

      return test;
    } catch (error) {
      throw new Error("Unable to find test");
    }
  }
  public async adminDelete(
    _id: Schema.Types.ObjectId
  ): Promise<Test | Error> {
    try {
      const test = await this.test
        .findByIdAndDelete(_id)
        .select(["-password"])
        .exec();

      if (!test) {
        throw new Error("Unable to delete test with that data");
      }

      return test;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getTest(_id: Schema.Types.ObjectId): Promise<Test | Array<Test> | Error> {
    try {
      const test = await this.test
        .findById(_id)

      if (!test) {
        throw new Error("No logged in test");
      }

      return test;
    } catch (error) {
      throw new Error("Unable to get test");
    }
  }

  public async adminUpdate(
    _id: Schema.Types.ObjectId,
    testTime: Number,
    result: string
  ): Promise<Test | Error> {
    try {
      const test = await this.test
        .findByIdAndUpdate(
          _id,
          {
            testTime: testTime,
            result: result
          },
          { new: true }
        )
      if (!test) {
        throw new Error("Unable to update test with that data");
      }

      return test;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


}

export default TestService;