import express from "express";
import { getDepartmentsController, getSubAreasController } from "../../controllers/misc/misc.controllers";

const miscRoutes = express.Router();

miscRoutes.get("/departamentos", getDepartmentsController);
miscRoutes.get("/subareas", getSubAreasController);

export default miscRoutes;
