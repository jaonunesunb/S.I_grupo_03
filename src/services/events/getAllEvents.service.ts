import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEventsService = async () => {
  const events = await prisma.evento.findMany({
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
