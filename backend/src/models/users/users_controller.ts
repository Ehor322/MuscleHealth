import { Router, Request, Response, NextFunction } from "express";

import { Controller } from "../../utils/interfaces";
import HttpException from "../../utils/exception";
import UserService from "./users_service";
import validate from './users_validation';
import { authenticatedMiddleware, validationMiddleware, authenticatedMiddlewareReabilitator } from "../../middlewares";
import User from "./users_interface";
import { cwd } from "process";

class UserController implements Controller {
  public path = "/user";
  public router = Router();
  private UserService = new UserService();
  private client_url = process.env.CLIENT_URL;

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
      `${this.path}/subscription`,
      validationMiddleware(validate.subscription),
      authenticatedMiddleware,
      this.subscription
    );
    this.router.get(
      `${this.path}/subscription/status`,
      authenticatedMiddleware,
      this.getPremiumStatus
    );
    this.router.put(
      `${this.path}/payment`,
      validationMiddleware(validate.payment),
      authenticatedMiddleware,
      this.payment
    );
    this.router.get(`${this.path}/me`, authenticatedMiddleware, this.getMe);

    this.router.get(
      `${this.path}/all`,
      this.getAllusers
    );

    this.router.get(
      `${this.path}/get`,
      validationMiddleware(validate.getUser),
      authenticatedMiddleware,
      this.getUser
    );

    this.router.delete(
      `${this.path}/delete`,
      validationMiddleware(validate.deleteUser),
      authenticatedMiddleware,
      this.delete
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

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const token = await this.UserService.login(email, password);

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
      const { surname, email, password, phone, sex } = req.body;

      const user = await this.UserService.register(surname, email, password, phone, sex);

      res.status(201).json({ user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  // private updatePassword = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response | void> => {
  //   try {
  //     const { new_password, password } = req.body;
  //     const _id = req.user._id;

  //     const user = await this.UserService.updatePassword(
  //       _id,
  //       new_password,
  //       password
  //     );

  //     res.status(200).json({ user });
  //   } catch (error: any) {
  //     next(new HttpException(400, error.message));
  //   }
  // };

  private subscription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { dayOfSubscribe, key } = req.body;

      const user = (await this.UserService.subscription(
        req.user,
        dayOfSubscribe,
        key
      )) as User;

      res.status(200).json({ data: user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private payment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { dayOfSubscribe, price, name, key } = req.body;

      const url = await this.UserService.payment(
        req.user,
        dayOfSubscribe,
        price,
        this.client_url as string,
        name,
        key
      );

      res.status(200).json({ data: url });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
  private getPremiumStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "No logged in account"));
      }
      const isSubscribe = await req.user.isValidPremium();

      res.status(200).send({ data: isSubscribe });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAllusers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.UserService.getAllusers();

      res.status(200).json({ user });
    } catch (error) {
      next(new HttpException(400, "Cannot found user"));
    }
  };

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.body;

      const user = await this.UserService.getUser(_id);

      res.status(200).json({ user });
    } catch (error) {
      next(new HttpException(400, "Cannot found user"));
    }
  };

  private getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const _id = req.user._id;
      const user = await this.UserService.getUser(_id);

      res.status(200).json({ user });
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
      const _id = req.user._id;

      const user = await this.UserService.delete(_id);

      res.status(200).json({ user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private adminDelete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.body;
      const user = await this.UserService.adminDelete(_id);

      res.status(200).json({ user });
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
      const { _id, phone, sex, typeOfPain } = req.body;

      const user = await this.UserService.adminUpdate(_id, phone, sex, typeOfPain);

      res.status(200).json({ user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;