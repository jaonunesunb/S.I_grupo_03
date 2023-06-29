import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { TipoUsuario } from "@prisma/client";

const ensureIsADM = (req: Request, res: Response, next: NextFunction) => {
  const tipo = req.user.tipo;
  if (tipo !== TipoUsuario.Tecnico && tipo !== TipoUsuario.Docente) {
    throw new AppError(
      "You don't have permission to access this resource",
      403
    );
  }

  return next();
};

export default ensureIsADM;
