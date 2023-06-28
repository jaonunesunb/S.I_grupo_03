import { Request, Response } from "express";
import { createEventService } from "../../services/events/createEvent.service";

export const createEventController = async (req: Request, res: Response) => {
  try {
    const result = await createEventService(req.body);

    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred during event creation" });
  }
};
