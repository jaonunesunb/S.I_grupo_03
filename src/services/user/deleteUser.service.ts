import { AppError } from "../../errors/AppError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteUserService = async (id: number) => {
  const userExistente = await prisma.usuario.findUnique({ where: { id } });

  if (!userExistente) {
    throw new AppError("User not exist", 409);
  }

  await prisma.usuario.delete({ where: { id } });
};
