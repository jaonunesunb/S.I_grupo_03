import { z } from "zod";
import { SubAreaModel } from "../AcademicAreasSchemas/macroArea";
import { EventoCurtoModel } from "./eventosCurtos";

export const EventoModel = z.object({
  id: z.number(),
  nome: z.string(),
  tipoEvento: z.string(),
  subArea: SubAreaModel,
  createdAt: z.string(),
  updatedAt: z.string(),
  EventoCurto: z.array(EventoCurtoModel),
});
