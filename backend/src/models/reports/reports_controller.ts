import { Router, Request, Response, NextFunction } from "express";

import { Controller } from "../../utils/interfaces";
import HttpException from "../../utils/exception";
import validate from './reports_validation';
import { validationMiddleware, authenticatedMiddleware, authenticatedMiddlewareReabilitator } from "../../middlewares";
import ReportService from "./reports_service";

class ReportController implements Controller {
  public path = "/report";
  public router = Router();
  private ReportService = new ReportService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(validate.createReport),
      this.create
    );
    this.router.get(
      `${this.path}/get`,
      authenticatedMiddleware,
      this.getReports
    );
    this.router.post(
      `${this.path}/one`,
      authenticatedMiddleware,
      this.getReport
    );
    this.router.delete(
      `${this.path}/delete`,
      this.delete
    );
    this.router.get(
      `${this.path}/all`,
      this.getAllreports
    );
    this.router.put(
      `${this.path}/admin/update`,
      authenticatedMiddleware,
      authenticatedMiddlewareReabilitator,
      this.adminUpdate
    );
    this.router.delete(
      `${this.path}/admin/delete`,
      authenticatedMiddleware,
      authenticatedMiddlewareReabilitator,
      this.adminDelete
    );
  }


  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userName, reportDate, result, typeOfPain, test_id, user_id } = req.body;

      const report = await this.ReportService.createReport(userName, reportDate, result, typeOfPain, test_id, user_id);

      res.status(201).json({ report });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
  private getReports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const _id = req.user._id;

      const report = await this.ReportService.getReports(_id);

      res.status(200).json({ report });
    } catch (error) {
      next(new HttpException(400, "Cannot found user"));
    }
  };

  private getReport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {_id} = req.body;

      const report = await this.ReportService.getReport(_id);

      res.status(200).json({ report });
    } catch (error) {
      next(new HttpException(400, "Cannot found user"));
    }
  };

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.body;

      const report = await this.ReportService.delete(_id);

      res.status(200).json({ report });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAllreports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const report = await this.ReportService.getAllreports();

      res.status(200).json({ report });
    } catch (error) {
      next(new HttpException(400, "Cannot found user"));
    }
  };

  private adminDelete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.body;
      const report = await this.ReportService.adminDelete(_id);

      res.status(200).json({ report });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private adminUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id, result, typeOfPain } = req.body;

      const report = await this.ReportService.adminUpdate(_id, result, typeOfPain);

      res.status(200).json({ report });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

}

export default ReportController;