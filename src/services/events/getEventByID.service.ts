import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEventByIDService = async (id: number) => {
  try {
    const event = await prisma.usuario.findUnique({
      where: { id },
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
