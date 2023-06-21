import { z } from "zod";
import { ServidorModel } from "../userSchemas";
import { EventoModel } from "./eventoMaior";

export const EventoCurtoModel: any = z.object({
  id: z.number(),
  nome: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  tipoEvento: z.string(),
  congresso: z.union([EventoModel, z.undefined()]),
  orientador: ServidorModel,
  createdAt: z.string(),
  updatedAt: z.string(),
});
