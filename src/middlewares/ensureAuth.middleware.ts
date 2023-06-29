import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv";
import { AppError } from "../errors/AppError";
import { ITipoUsuario } from "../interfaces";

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
      console.log("decoded", decoded)
      req.user = {
        id: decoded.id,
        email: decoded.email,
        tipo: decoded.tipo,
      };
      return next();
    }
  );
};
