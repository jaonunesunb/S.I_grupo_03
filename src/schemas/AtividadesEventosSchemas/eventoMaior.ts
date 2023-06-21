import { z } from "zod";
import { SubAreaModel } from "../AcademicAreasSchemas";
import { EventoCurtoModel } from "./eventosCurtos";

export const EventoModel = z.object({
  id: z.number(),
  nome: z.string(),
  tipoEvento: z.string(),
  subArea: SubAreaModel,
  createdAt: z.string(),
  updatedAt: z.string(),
  EventoCurto: z.array(EventoCurtoModel), // Replace `z.unknown()` with the appropriate schema for EventoCurto[]
});
