import { Router, Request, Response, NextFunction } from "express";

import { Controller } from "../../utils/interfaces";
import HttpException from "../../utils/exception";
import validate from './test_validation';
import { validationMiddleware, authenticatedMiddleware, authenticatedMiddlewareReabilitator } from "../../middlewares";
import TestService from "./test_service";

class TestController implements Controller {
  public path = "/test";
  public router = Router();
  private TestService = new TestService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(validate.createTest),
      this.create
    );

    this.router.delete(
      `${this.path}/delete`,
      validationMiddleware(validate.deleteTest),
      this.delete
    );

    this.router.get(
      `${this.path}/search`,
      validationMiddleware(validate.search),
      this.search
    );
    this.router.get(
      `${this.path}/all`,
      this.getAlltests
    );
    this.router.delete(
      `${this.path}/admin/delete`,
      authenticatedMiddleware,
      authenticatedMiddlewareReabilitator,
      this.adminDelete
    );
    this.router.get(
      `${this.path}/get`,
      validationMiddleware(validate.getTest),
      authenticatedMiddleware,
      this.getTest
    );
    this.router.put(
      `${this.path}/admin/update`,
      authenticatedMiddleware,
      authenticatedMiddlewareReabilitator,
      this.adminUpdate
    );
  }


  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, testDate, testTime, result, user_id, power } = req.body;

      const test = await this.TestService.createTest(name, testDate, testTime, result, user_id, power);

      res.status(201).json({ test });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
  private search = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.body;

      const test = await this.TestService.search(_id);

      res.status(200).json({ test });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.body;

      const test = await this.TestService.delete(_id);

      res.status(200).json({ test });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAlltests = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const test = await this.TestService.getAlltests();

      res.status(200).json({ test });
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
      const test = await this.TestService.adminDelete(_id);

      res.status(200).json({ test });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getTest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.body;

      const test = await this.TestService.getTest(_id);

      res.status(200).json({ test });
    } catch (error) {
      next(new HttpException(400, "Cannot found test"));
    }
  };

  private adminUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id, testTime, result } = req.body;

      const test = await this.TestService.adminUpdate(_id, testTime, result);

      res.status(200).json({ test });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

}

export default TestController;