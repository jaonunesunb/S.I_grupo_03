import { Request, Response } from "express";
import { createEventService } from "../../services/events/createEvent.service";
import { getAllEventsService } from "../../services/events/getAllEvents.service";
import { getEventByIDService } from "../../services/events/getEventByID.service";
import { updateEventService } from "../../services/events/updateEvent.service";
import { deleteEventService } from "../../services/events/deleteEvent.service";

export const createEventController = async (req: Request, res: Response) => {
  try {
    const result = await createEventService(req.body);

    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred during event creation" });
  }
};

export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    const users = await getAllEventsService();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Failed to recover events" });
  }
};

export const getEventByIDController = async (req: Request, res: Response) => {
  try {
    const eventID = req.params.id;

    const retrivedUser = await getEventByIDService(eventID);

    return res.status(201).json(retrivedUser);
  } catch (error) {
    console.error("Erro ao tentar recuperar o evento:", error);
    return res.status(500).json({
      error: "Failed to retrieve event",
    });
  }
};

export const updateEventController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const updatedUser = await updateEventService(userId, userData);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    return res.status(500).json({
      error: "Failed to update event",
    });
  }
};

export const deleteEventController = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const deletedEvent = await deleteEventService(id);
  return res.status(204).json(deletedEvent);
};
