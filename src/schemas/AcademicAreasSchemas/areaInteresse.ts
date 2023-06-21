import { z } from "zod";
import { MacroAreaModel } from "./macroArea";
import { AreaModel } from ".";
import { SubAreaModel } from ".";
import { AtividadeUniversitariaModel } from "../AtividadesEventosSchemas/AtividadeUniversitaria";
import { ServidorModel } from "..";
import { AlunoModel } from "..";

export const AreaInteresseModel = z.object({
  id: z.number(),
  usuario_servidor: ServidorModel.nullable(),
  usuario_aluno: AlunoModel.nullable(),
  macroArea: MacroAreaModel,
  macroAreaId: z.number(),
  area: AreaModel,
  subArea: SubAreaModel,
  AtividadeUniversitaria: z.array(AtividadeUniversitariaModel),
});
