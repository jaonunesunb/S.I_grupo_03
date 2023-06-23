import express from "express";
import {
  createProfessorController,
  loginController,
} from "../../controllers/superUser/users.controllers";

const servidorRoutes = express.Router();

servidorRoutes.post("", createProfessorController);

export default servidorRoutes;

export const loginRoutes = express.Router();

loginRoutes.post("", loginController);
