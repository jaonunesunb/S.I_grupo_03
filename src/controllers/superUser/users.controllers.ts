import { Request, Response } from "express";
import {
  loginService,
  registerUserService,
} from "../../services/usuario.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const result = await loginService({ email, senha });

    // Return o token
    res.json(result);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create professor" });
  }
};
