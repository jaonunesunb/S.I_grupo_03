import express from "express";
import { createEventController } from "../../controllers/events";

const eventRoutes = express.Router();

eventRoutes.post("/create", createEventController);

export default eventRoutes;
