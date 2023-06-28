import * as express from "express";
import { ITipoUsuario } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        nome: string;
        tipo: ITipoUsuario;
      };
    }
  }
}
