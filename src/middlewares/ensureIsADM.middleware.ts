import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ITipoUsuario } from "../interfaces";

const ensureIsADM = (req: Request, res: Response, next: NextFunction) => {
  const tipo = req.user.tipo;

  if (tipo !== ITipoUsuario.Tecnico && tipo !== ITipoUsuario.Docente) {
    throw new AppError(
      "You don't have permission to access this resource",
      403
    );
  }

  return next();
};

export default ensureIsADM;
