import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv";
import { AppError } from "../errors/AppError";

export const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization as string;
  if (!token) {
    throw new AppError("Invalid token", 401);
  }
  token = token.split(" ")[1];
  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (error, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }
      req.user = {
        id: decoded.id,
        isActive: decoded.isActive,
      } as { id: string; isActive: boolean };
      return next();
    }
  );
};
