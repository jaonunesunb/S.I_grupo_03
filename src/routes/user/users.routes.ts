import express from "express";
import {
  registerUserController,
  loginController,
} from "../../controllers/superUser/users.controllers";

const userRoutes = express.Router();

userRoutes.post("/login", loginController);
userRoutes.post("/register", registerUserController);

export default userRoutes;
