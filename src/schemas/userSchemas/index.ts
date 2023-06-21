import { z } from "zod";
import { AreaInteresseModel } from "../AcademicAreasSchemas/areaInteresse";
import { AtividadeUniversitariaModel } from "../AtividadesEventosSchemas/AtividadeUniversitaria";
import { EventoCurtoModel } from "../AtividadesEventosSchemas/eventosCurtos";

export const TipoServidorEnum = z.enum(["Tecnico", "Docente"]);
export const TipoAlunoEnum = z.enum(["Graduacao", "Pos_graduacao"]);

export const ServidorModel = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string(),
  password: z.string(),
  foto: z.string(),
  matricula: z.string(),
  departamento: z.string(),
  orientador: z.array(AtividadeUniversitariaModel),
  orientadorEventoCurto: z.array(EventoCurtoModel),
  tipo: TipoServidorEnum,
  areasInteresse: z.array(AreaInteresseModel),
});

export const AlunoModel = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string(),
  password: z.string(),
  foto: z.string(),
  matricula: z.string(),
  departamento: z.string(),
  tipo: TipoAlunoEnum,
  areasInteresse: z.array(AreaInteresseModel),
  AtividadeUniversitaria: z.array(AtividadeUniversitariaModel),
});
