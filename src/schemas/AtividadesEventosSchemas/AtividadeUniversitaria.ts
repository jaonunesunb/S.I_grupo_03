import { z } from "zod";
import { ServidorModel } from "../userSchemas";
import { AlunoModel } from "../userSchemas";
import { AreaInteresseModel } from "../AcademicAreasSchemas/areaInteresse";

export const AtividadeUniversitariaModel: any = z.object({
  id: z.number(),
  nome: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  tipoAtividade: z.string(),
  orientador: z.nullable(ServidorModel),
  aluno: z.nullable(AlunoModel),
  areaDeInteresse: z.nullable(AreaInteresseModel),
  createdAt: z.string(),
  updatedAt: z.string(),
});
