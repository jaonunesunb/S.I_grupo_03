import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEventByIDService = async (id: string) => {
  try {
    const event = await prisma.evento.findUnique({
      where: { public_id: id },
      include: {
        criador: true,
        departamento: true,
        subAreasRelacionadas: true,
        eventoMaior: true,
        eventosMenores: true,
      },
    });

    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
