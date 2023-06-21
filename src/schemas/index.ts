import { z } from "zod";
import { AtividadeUniversitariaModel } from "./AtividadesEventosSchemas/AtividadeUniversitaria";
import { AreaInteresseModel } from "./AcademicAreasSchemas/areaInteresse";
import { EventoCurtoModel } from "./AtividadesEventosSchemas/eventosCurtos";

// Enumerations
export const TipoServidorEnum = z.enum(["Tecnico", "Docente"]);
export const TipoAlunoEnum = z.enum(["Graduacao", "Pos_graduacao"]);

export const ServidorModel = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string(),
  password: z.string(),
  foto: z.string(),
  matricula: z.string().nullable(),
  departamento: z.string(),
  orientador: z.array(AtividadeUniversitariaModel.nullable()),
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
  matricula: z.string().nullable(),
  departamento: z.string(),
  tipo: TipoAlunoEnum,
  areasInteresse: z.array(AreaInteresseModel),
  AtividadeUniversitaria: z.array(AtividadeUniversitariaModel),
});
