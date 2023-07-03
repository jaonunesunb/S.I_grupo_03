import { Request, Response } from "express";

import {
  getDepartmentsService,
  getSubAreasService,
} from "../../services/misc.service";

export const getDepartmentsController = async (req: Request, res: Response) => {
  const { status, response } = await getDepartmentsService();
  res.status(status).json(response);
};

export const getSubAreasController = async (req: Request, res: Response) => {
  const { status, response } = await getSubAreasService();
  res.status(status).json(response);
};
