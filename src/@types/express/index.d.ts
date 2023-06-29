import * as express from "express";
import { TipoUsuario } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
        tipo: TipoUsuario;
      };
    }
  }
}
