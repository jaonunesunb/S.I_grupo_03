import { z } from "zod";
import { MacroAreaModel } from "./macroArea";
import { AreaModel } from ".";
import { SubAreaModel } from "./macroArea";
import { AtividadeUniversitariaModel } from "../AtividadesEventosSchemas/AtividadeUniversitaria";
import { ServidorModel } from "../userSchemas";
import { AlunoModel } from "../userSchemas";

export const AreaInteresseModel: any = z.object({
  id: z.number(),
  usuario_servidor: ServidorModel.nullable(),
  usuario_aluno: AlunoModel.nullable(),
  macroArea: MacroAreaModel,
  macroAreaId: z.number(),
  area: AreaModel,
  subArea: SubAreaModel,
  AtividadeUniversitaria: z.array(AtividadeUniversitariaModel),
});
