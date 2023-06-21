import { z } from "zod";
import { MacroAreaModel } from "./macroArea";

export const AreaModel = z.object({
  id: z.number(),
  nome: z.string(),
  macroArea: MacroAreaModel,
  subAreas: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for SubArea[]
  AreaInteresse: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for AreaInteresse[]
});

export const SubAreaModel = z.object({
  id: z.number(),
  nome: z.string(),
  area: AreaModel,
  eventos: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for Evento[]
  AreaInteresse: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for AreaInteresse[]
});
