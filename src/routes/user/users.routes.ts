import express from "express";
import {
  registerUserController,
  loginController,
  getUserController,
  updateUserController,
} from "../../controllers/User/users.controllers";
import { ensureAuthMiddleware } from "../../middlewares/ensureAuth.middleware";

const userRoutes = express.Router();

userRoutes.post("/login", loginController);
userRoutes.post("/register", registerUserController);
userRoutes.get("", getUserController);
userRoutes.patch("/:id", ensureAuthMiddleware, updateUserController);

export default userRoutes;
