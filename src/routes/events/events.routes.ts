import express from "express";
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventByIDController,
  updateEventController,
  getFilteredEventsController,
} from "../../controllers/events";
import ensureIsADM from "../../middlewares/ensureIsADM.middleware";
import { ensureAuthMiddleware } from "../../middlewares/ensureAuth.middleware";

const eventRoutes = express.Router();

eventRoutes.post(
  "/create",
  ensureAuthMiddleware,
  ensureIsADM,
  createEventController
);
eventRoutes.get("", ensureAuthMiddleware, getAllEventsController);
eventRoutes.get("/filtered", ensureAuthMiddleware, getFilteredEventsController);
eventRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsADM,
  updateEventController
);
eventRoutes.get("/:id", ensureAuthMiddleware, getEventByIDController);
eventRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsADM,
  deleteEventController
);

export default eventRoutes;
