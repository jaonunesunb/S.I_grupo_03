import { Request, Response } from "express";
import { loginService } from "../../services/loginUser.service";

export const createEventController = async (req: Request, res: Response) => {
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