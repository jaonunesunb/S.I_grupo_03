import { z } from "zod";
import { MacroAreaModel } from "./macroArea";
import { AreaInteresseModel } from "./areaInteresse";
import { SubAreaModel } from "./macroArea";

export const AreaModel:any = z.object({
  id: z.number(),
  nome: z.string(),
  macroArea: MacroAreaModel,
  subAreas: z.array(SubAreaModel), 
  AreaInteresse: z.array(AreaInteresseModel),
});
