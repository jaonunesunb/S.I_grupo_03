import { z } from "zod";
import { ServidorModel } from "..";
import { AlunoModel } from "..";
import { AreaInteresseModel } from "../AcademicAreasSchemas/areaInteresse";

export const AtividadeUniversitariaModel = z.object({
  id: z.number(),
  nome: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  tipoAtividade: z.string(),
  orientador: ServidorModel.nullable(),
  aluno: AlunoModel.nullable(),
  areaDeInteresse: AreaInteresseModel.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
