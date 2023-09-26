import { PrismaClient } from "@prisma/client";
import { TipoEvento } from "@prisma/client";

const prisma = new PrismaClient();

export const getFilteredEvents = async (
  page: number,
  count: number,
  nome?: string,
  tipo?: TipoEvento,
  dataInicio?: Date,
  dataFim?: Date,
  departamento?: string,
  subAreasRelacionadas?: string[]
) => {
  const events = await prisma.evento.findMany({
    skip: count * (page - 1),
    take: count,
    where: {
      ...(nome ? { nome: { contains: nome } } : {}),
      ...(tipo ? { tipoEvento: tipo } : {}),
      ...(dataInicio ? { dataFim: { gte: dataInicio } } : {}),
      ...(dataFim ? { dataInicio: { lte: dataFim } } : {}),
      ...(departamento ? { departamento: { nome: departamento } } : {}),
      ...(subAreasRelacionadas
        ? {
            AND: subAreasRelacionadas.map((subArea) => ({
              subAreasRelacionadas: {
                some: {
                  tabelaId: subArea,
                },
              },
            })),
          }
        : {}),
    },
    include: {
      criador: true,
      departamento: true,
      subAreasRelacionadas: true,
      eventoMaior: true,
      eventosMenores: true,
    },
  });

  return events;
};
