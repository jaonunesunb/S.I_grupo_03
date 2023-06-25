import { z } from "zod";

export const MacroArea: any = z.lazy(() =>
  z.object({
    id: z.number(),
    tabelaId: z.string(),
    nome: z.string(),
    area: z.array(Area),
  })
);

export const Area: any = z.lazy(() =>
  z.object({
    id: z.number(),
    tabelaId: z.string(),
    nome: z.string(),
    macroAreaId: z.number(),
    macroArea: MacroArea,
    subAreas: z.array(SubArea),
    Departamento: z.array(Departamento),
  })
);

export const SubArea: any = z.lazy(() =>
  z.object({
    id: z.number(),
    tabelaId: z.string(),
    nome: z.string(),
    areaId: z.number(),
    area: Area,
    usuarios: z.array(Usuario),
    eventos: z.array(Evento),
  })
);

export const Departamento: any = z.lazy(() =>
  z.object({
    id: z.number(),
    nome: z.string(),
    areaId: z.number(),
    area: Area,
    Usuario: z.array(Usuario),
    Eventos: z.array(Evento),
  })
);

export const TipoUsuario = z.enum([
  "Tecnico",
  "Docente",
  "Graduacao",
  "PosGraduacao",
]);

export const Usuario: any = z.lazy(() =>
  z.object({
    id: z.number(),
    nome: z.string(),
    email: z.string().email(),
    senha: z.string(),
    matricula: z.string(),
    departamento: Departamento.optional(),
    departamentoId: z.number().optional(),
    tipo: TipoUsuario,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export const UsuarioUpdateReturn = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
  matricula: z.string(),
  departamento: Departamento.optional(),
  departamentoId: z.number().optional(),
  tipo: TipoUsuario,
  subAreasInteresse: SubArea,
  createdAt: z.date(),
  updatedAt: z.date(),
});


export const listUsersSchema = z.array(UsuarioUpdateReturn);

export const TipoEvento = z.enum(["EventoAcademico", "EventoCultural"]);

export const Evento: any = z.lazy(() =>
  z.object({
    id: z.number(),
    public_id: z.string(),
    nome: z.string(),
    descricao: z.string(),
    tipoEvento: TipoEvento,
    urlMaisInfo: z.string().optional(),
    urlInscricao: z.string().optional(),
    criadorId: z.number(),
    criador: Usuario,
    eventoMaiorId: z.number().optional(),
    eventoMaior: Evento.optional(),
    eventosMenores: z.array(Evento),
    departamentoId: z.number().optional(),
    departamento: Departamento.optional(),
    subAreasRelacionadas: z.array(SubArea),
    dataInicio: z.date(),
    dataFim: z.date(),
    createdAt: z.date(),
  })
);
