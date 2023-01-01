import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import token from "../utils/token";
import userModul from "../models/users/users_model";
import { Token } from "../utils/interfaces";
import HttpException from "../utils/exception";

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;
  
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpException(401, "Unauthorised"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();

  try {
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorised"));
    }

    const user = await userModul.findById(payload.id).select("-password").exec();

    if (!user) {
      return next(new HttpException(401, "Unauthorised"));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(401, "Unauthorised"));
  }
}

export default authenticatedMiddleware