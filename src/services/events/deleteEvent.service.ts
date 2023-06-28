import { AppError } from "../../errors/AppError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteEventService = async (id: number) => {
  const eventoExistente = await prisma.evento.findUnique({ where: { id } });

  if (!eventoExistente) {
    throw new AppError("Event not found", 409);
  }

  await prisma.evento.delete({ where: { id } });
};
