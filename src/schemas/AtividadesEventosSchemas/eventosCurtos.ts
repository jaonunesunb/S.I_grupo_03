import { z } from "zod";
import { ServidorModel } from "../userSchemas";
import { EventoModel } from "./eventoMaior";

export const EventoCurtoModel: any = z.object({
  id: z.number(),
  nome: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  tipoEvento: z.string(),
  congresso: EventoModel.nullable(),
  orientador: ServidorModel,
  createdAt: z.string(),
  updatedAt: z.string(),
});
