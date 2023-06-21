import { z } from "zod";
import { MacroAreaModel } from "./macroArea";
import { AreaModel } from ".";
import { SubAreaModel } from "./macroArea";
import { AtividadeUniversitariaModel } from "../AtividadesEventosSchemas/AtividadeUniversitaria";
import { ServidorModel } from "../userSchemas";
import { AlunoModel } from "../userSchemas";

export const AreaInteresseModel: any = z.object({
  id: z.number(),
  usuario_servidor: ServidorModel,
  usuario_aluno: AlunoModel,
  macroArea: MacroAreaModel,
  area: AreaModel,
  subArea: SubAreaModel,
  AtividadeUniversitaria: z.array(AtividadeUniversitariaModel),
});
