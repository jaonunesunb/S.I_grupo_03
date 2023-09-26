import { Request, Response } from "express";
import { createEventService } from "../../services/events/createEvent.service";
import { getAllEventsService } from "../../services/events/getAllEvents.service";
import { getEventByIDService } from "../../services/events/getEventByID.service";
import { updateEventService } from "../../services/events/updateEvent.service";
import { deleteEventService } from "../../services/events/deleteEvent.service";
import { getFilteredEvents } from "../../services/events/getFilteredEvents.service";
import { TipoEvento } from "@prisma/client";
import { AppError } from "../../errors/AppError";

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

function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export const getFilteredEventsController = async (
  req: Request,
  res: Response
) => {
  try {
    interface QueryParams {
      page: string;
      count: string;
      nome?: string;
      tipo?: string;
      dataInicio?: string;
      dataFim?: string;
      departamento?: string;
      subAreasRelacionadas?: string[] | string;
    }

    // Access the query parameters and perform type-checking
    const queryParams: QueryParams = req.query as unknown as QueryParams;
    const {
      page,
      count,
      nome,
      tipo,
      dataInicio,
      dataFim,
      departamento,
      subAreasRelacionadas,
    } = queryParams;

    if (tipo && !["EventoAcademico", "EventoCultural"].includes(tipo)) {
      return res.status(400).json({
        error: "Tipo is not one of EventoAcademico or EventoCultural",
      });
    }

    let dataInicioTyped: Date | undefined = undefined;
    if (dataInicio) {
      dataInicioTyped = new Date(dataInicio.trim().replace(/^"|"$/g, ''));

      if (!isValidDate(dataInicioTyped)) {
        return res.status(400).json({
          error:
            "dataInicio is not formatted correctly! Try YYYY-MM-DD hh-mm-ss",
        });
      }
    }

    let dataFimTyped: Date | undefined = undefined;
    if (dataFim) {
      dataFimTyped = new Date(dataFim.trim().replace(/^"|"$/g, ''));

      if (!isValidDate(dataFimTyped)) {
        return res.status(400).json({
          error: "dataFim is not formatted correctly! Try YYYY-MM-DD hh-mm-ss",
        });
      }
    }

    let subAreasRelacionadasTyped: string[] | undefined;
    if (subAreasRelacionadas && !Array.isArray(subAreasRelacionadas)) {
      subAreasRelacionadasTyped = [subAreasRelacionadas.trim().replace(/^"|"$/g, '')];
    } else {
      subAreasRelacionadasTyped = subAreasRelacionadas as (string[] | undefined);
      subAreasRelacionadasTyped?.map(subArea => subArea.trim().replace(/^"|"$/g, ''))
    }

    const events = await getFilteredEvents(
      parseInt(page),
      parseInt(count),
      nome?.trim().replace(/^"|"$/g, ''),
      tipo as TipoEvento | undefined,
      dataInicioTyped,
      dataFimTyped,
      departamento?.trim().replace(/^"|"$/g, ''),
      subAreasRelacionadasTyped
    );
    res.status(200).json(events);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during getFilteredEventsController:", error);
      res.status(500).json({ error: "Failed to recover filtered events" });
    }
  }
};

export const getEventByIDController = async (req: Request, res: Response) => {
  try {
    const eventID = req.params.id;

    const retrivedUser = await getEventByIDService(eventID);

    return res.status(201).json(retrivedUser);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during getEventByIDController:", error);
      res.status(500).json({ error: "Failed to recover event" });
    }
  }
};

export const updateEventController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const updatedUser = await updateEventService(userId, userData);

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error during updateEventController:", error);
      res.status(500).json({ error: "Failed to update event" });
    }
  }
};

export const deleteEventController = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const deletedEvent = await deleteEventService(id);
  
  return res.status(204).json(deletedEvent);
};
