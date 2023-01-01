import { Router, Request, Response, NextFunction } from "express";

import { Controller } from "../../utils/interfaces";
import HttpException from "../../utils/exception";
import validate from './reabilitators_validation';
import { validationMiddleware, authenticatedMiddlewareReabilitator, authenticatedMiddleware} from "../../middlewares";
import ReabilitatorService from "./reabilitators_service";

class ReabilitatorController implements Controller {
  public path = "/reabilitator";
  public router = Router();
  private ReabilitatorService = new ReabilitatorService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );

    this.router.put(
      `${this.path}/update/password`,
      validationMiddleware(validate.updatePassword),
      authenticatedMiddlewareReabilitator,
      this.updatePassword
    );

    this.router.get(
      `${this.path}/get`,
      validationMiddleware(validate.getReabilitator),
      authenticatedMiddlewareReabilitator,
      this.getReabilitator
    );

    this.router.get(`${this.path}/me`, authenticatedMiddlewareReabilitator, this.getMe);

    this.router.delete(
      `${this.path}/delete`,
      validationMiddleware(validate.deleteReabilitator),
      authenticatedMiddlewareReabilitator,
      this.delete
    );
    this.router.get(
      `${this.path}`,
      authenticatedMiddlewareReabilitator,
      this.getReabilitatorAccount
    );
  }

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const token = await this.ReabilitatorService.login(email, password);

      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, email, password, birth_date, sex } = req.body;

      const token = await this.ReabilitatorService.register(name, email, password, birth_date, sex);

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { new_password, password } = req.body;
      const _id = req.reabilitator._id;

      const reabilitator = await this.ReabilitatorService.updatePassword(
        _id,
        new_password,
        password
      );

      res.status(200).json({ reabilitator });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };


  private getReabilitator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {  
      console.log(req.user)
      const { _id } = req.body;
      
      const reabilitator = await this.ReabilitatorService.getReabilitator(_id);

      res.status(200).json({ reabilitator });
    } catch (error) {
      next(new HttpException(400, "Cannot found reabilitator"));
    }
  };

  private getReabilitatorAccount = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.reabilitator) {
      return next(new HttpException(404, "No logged in account"));
    }

    res.status(200).send({ data: req.reabilitator });
  };

  private getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      console.log(req)
        const _id = req.reabilitator._id;
      const reabilitator = await this.ReabilitatorService.getReabilitator(_id);

      res.status(200).json({ reabilitator });
    } catch (error) {
      next(new HttpException(400, "Cannot found reabilitator"));
    }
  };


  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const _id = req.reabilitator._id;

      const reabilitator = await this.ReabilitatorService.delete(_id);

      res.status(200).json({ reabilitator });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default ReabilitatorController;