import express from "express";
import {
  registerUserController,
  loginController,
  getUserController,
  updateUserController,
  getUserByIDController,
} from "../../controllers/User/users.controllers";
import { ensureAuthMiddleware } from "../../middlewares/ensureAuth.middleware";
import { deleteUserService } from "../../services/user/deleteUser.service";

const userRoutes = express.Router();

userRoutes.post("/login", loginController);
userRoutes.post("/register", registerUserController);
userRoutes.get("", getUserController);
userRoutes.patch("/:id", ensureAuthMiddleware, updateUserController);
userRoutes.get("/:id", ensureAuthMiddleware, getUserByIDController);
userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserService);

export default userRoutes;
