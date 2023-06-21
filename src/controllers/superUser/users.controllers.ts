import { Request, Response } from "express";
import { loginService } from "../../services/loginUser.service";
import { createProfessorService } from "../../services/servidor/createTeacher.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginService({ email, password });

    // Return o token
    res.json(result);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

export const createProfessorController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createProfessorService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create professor" });
  }
};
