import { Schema } from "mongoose";

import ReportModel from "./reports_model";
import token from "../../utils/token";
import Report from "./reports_interface";

class ReportService {
  private report = ReportModel;

  public async createReport(
    userName: String,
    reportDate: Date,
    result: String,
    typeOfPain: String,
    test_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId
  ): Promise<Report | Error> {
    try {
      const report = await this.report.create({
        userName,
        reportDate,
        result,
        typeOfPain,
        test_id,
        user_id
      });

      return report;
    } catch (error) {
      throw new Error("Unable to create report");
    }
  }

  public async getReport(_id: Schema.Types.ObjectId): Promise<Report| Error> {
    try {
      const report = await this.report
        .findOne({_id: _id})

      if (!report) {
        throw new Error("No logged in user account");
      }

      return report;
    } catch (error) {
      throw new Error("Unable to get user account");
    }
  }

  public async getReports(_id: Schema.Types.ObjectId): Promise<Array<Report>| Error> {
    try {
      const report = await this.report
        .find({user_id: _id})

      if (!report) {
        throw new Error("No logged in user account");
      }

      return report;
    } catch (error) {
      throw new Error("Unable to get user account");
    }
  }

  public async delete(_id: Schema.Types.ObjectId): Promise<Report | Error> {
    try {
      const report = await this.report
        .findByIdAndDelete(_id)
        .populate([{
          path: "test_id",
          populate: { path: "_id" },
        }])
        .select("-password");

      if (!report) {
        throw new Error("Unable to delete report with that id");
      }

      return report;
    } catch (error) {
      throw new Error("Unable to delete report");
    }
  }
  public async getAllreports(): Promise<Report | Array<Report> | Error> {
    try {
      const report = await this.report.find({})

      if (!report) {
        throw new Error("Unable to find reports");
      }

      return report;
    } catch (error) {
      throw new Error("Unable to find reports");
    }
  }
  public async adminDelete(
    _id: Schema.Types.ObjectId
  ): Promise<Report | Error> {
    try {
      const report = await this.report
        .findByIdAndDelete(_id)
        .select(["-password"])
        .exec();

      if (!report) {
        throw new Error("Unable to delete report with that data");
      }

      return report;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async adminUpdate(
    _id: Schema.Types.ObjectId,
    result: string,
    typeOfPain: string
  ): Promise<Report | Error> {
    try {
      const report = await this.report
        .findByIdAndUpdate(
          _id,
          {
            result: result,
            typeOfPain: typeOfPain
          },
          { new: true }
        )

      if (!report) {
        throw new Error("Unable to update player with that data");
      }

      return report;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}

export default ReportService;