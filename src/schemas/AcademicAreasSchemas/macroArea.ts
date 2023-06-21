import { z } from "zod";
import { AreaModel} from ".";
import { AreaInteresseModel } from "./areaInteresse";

export const MacroAreaModel = z.object({
  id: z.number(),
  nome: z.string(),
  areas: z.array(AreaModel),
  areasInteresse: z.array(AreaInteresseModel),
});