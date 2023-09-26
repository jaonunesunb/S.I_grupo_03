import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEventsService = async () => {
  const dataAtual = new Date(new Date().toDateString());
  
  const events = await prisma.evento.findMany({
    where: { dataFim: { gte: dataAtual } },
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
