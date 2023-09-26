import { Request, Response } from "express";
import {
  loginService,
  registerUserService,
} from "../../services/user/usuario.service";
import { getAllUsersService } from "../../services/user/getAllUsers.service";
import { IUsuarioUpdate } from "../../interfaces";
import { updateUserService } from "../../services/user/updateUser.service";
import { getUserByIDService } from "../../services/user/getUserByID.service";
import { deleteUserService } from "../../services/user/deleteUser.service";
import { getUserEventsService } from "../../services/user/getUserEvents.service";
import { AppError } from "../../errors/AppError";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const result = await loginService({ email, senha });

    // Return o token
    res.json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during loginController:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  }
};

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during registerUserController:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during getUserController:", error);
      res.status(500).json({ error: "Failed to recover users" });
    }
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const updatedUser = await updateUserService(userId, userData);

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during updateUserController:", error);
      res.status(500).json({ error: "Failed to update users" });
    }
  }
};

export const getUserByIDController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const retrivedUser = await getUserByIDService(userId);

    return res.status(201).json(retrivedUser);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during getUserByIDController:", error);
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }
};

export const getUserEventsController = async (req: Request, res: Response) => {
  try {
    interface QueryParams {
      page: string;
      count: string;
    }

    // Access the query parameters and perform type-checking
    const queryParams: QueryParams = req.query as unknown as QueryParams;
    const { page, count } = queryParams;

    const userEmail = req.params.email;

    const retrivedUser = await getUserEventsService(
      userEmail,
      parseInt(page),
      parseInt(count)
    );

    return res.status(201).json(retrivedUser);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during getUserEventsController:", error);
      res.status(500).json({ error: "Failed to recover user events" });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const deletedEvent = await deleteUserService(id);
  
  return res.status(204).json(deletedEvent);
};
