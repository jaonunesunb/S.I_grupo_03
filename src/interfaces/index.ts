export interface IServidor {
  id: number;
  nome: string;
  email: string;
  password: string;
  foto: string;
  matricula: string | null;
  departamento: string;
  orientador: AtividadeUniversitaria[];
  orientadorEventoCurto: EventoCurto[];
  tipo: ITipoServidor;
  areasInteresse: AreaInteresse[];
}

export interface IServidorRequest {
  nome: string;
  email: string;
  password: string;
  foto: string;
  matricula: string | null;
  departamento: string;
  tipo: ITipoServidor;
  macroArea: string;
  area: string;
  subArea: string;
}

export interface IServidorResponse {
  id: number;
  nome: string;
  email: string;
  foto: string;
  matricula: string | null;
  departamento: string;
  tipo: ITipoServidor;
}

export interface IAluno {
  id: number;
  nome: string;
  email: string;
  password: string;
  foto: string;
  matricula: string | null;
  departamento: string;
  tipo: ITipoAluno;
  areasInteresse: AreaInteresse[];
  AtividadeUniversitaria: AtividadeUniversitaria[];
}

export type ITipoServidor = "Tecnico" | "Docente";

export type ITipoAluno = "Graduacao" | "Pos_graduacao";

export interface IMacroArea {
  id: number;
  nome: string;
  areas: Area[];
  areasInteresse: AreaInteresse[];
}

export interface Area {
  id: number;
  nome: string;
  macroArea: IMacroArea;
  subAreas: SubArea[];
  AreaInteresse: AreaInteresse[];
}

export interface SubArea {
  id: number;
  nome: string;
  area: Area;
  eventos: Evento[];
  AreaInteresse: AreaInteresse[];
}

export interface Evento {
  id: number;
  nome: string;
  tipoEvento: string;
  subArea: SubArea;
  createdAt: Date;
  updatedAt: Date;
  EventoCurto: EventoCurto[];
}

export interface EventoCurto {
  id: number;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  tipoEvento: string;
  congresso: Evento | null;
  orientador: IServidor;
  createdAt: Date;
  updatedAt: Date;
}

export interface AtividadeUniversitaria {
  id: number;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  tipoAtividade: string;
  orientador: IServidor | null;
  aluno: IAluno | null;
  areaDeInteresse: AreaInteresse | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AreaInteresse {
  id: number;
  usuario_servidor: IServidor | null;
  usuario_aluno: IAluno | null;
  macroArea: IMacroArea;
  area: Area;
  subArea: SubArea;
  AtividadeUniversitaria: AtividadeUniversitaria[];
}
