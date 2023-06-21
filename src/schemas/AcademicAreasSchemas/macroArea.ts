import { z } from "zod";
import { AreaModel } from ".";
import { AreaInteresseModel } from "./areaInteresse";
import { EventoModel } from "../AtividadesEventosSchemas/eventoMaior";

export const MacroAreaModel = z.object({
  id: z.number(),
  nome: z.string(),
  areas: z.array(AreaModel),
  areasInteresse: z.array(AreaInteresseModel),
});

export const SubAreaModel: any = z.object({
  id: z.number(),
  nome: z.string(),
  area: AreaModel,
  eventos: z.array(EventoModel),
  AreaInteresse: z.array(AreaInteresseModel),
});
