import { z } from "zod";

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
  orientador: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for AtividadeUniversitaria[]
  orientadorEventoCurto: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for EventoCurto[]
  tipo: TipoServidorEnum,
  areasInteresse: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for AreaInteresse[]
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
  areasInteresse: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for AreaInteresse[]
  AtividadeUniversitaria: z.array(z.unknown()), // Replace `z.unknown()` with the appropriate schema for AtividadeUniversitaria[]
});
