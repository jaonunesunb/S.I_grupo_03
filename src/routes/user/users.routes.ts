import express from "express";
import {
  createProfessorController,
  loginController,
} from "../../controllers/superUser/users.controllers";

const userRoutes = express.Router();

userRoutes.post("/login", loginController);
userRoutes.post("/admRegister", createProfessorController);

export default userRoutes;
