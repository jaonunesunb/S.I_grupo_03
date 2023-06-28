import { PrismaClient } from "@prisma/client";
import { listUsersSchema, UsuarioUpdateReturn, SubArea } from "../../schemas";

const prisma = new PrismaClient();

export const getAllUsersService = async () => {
  try {
    const users = await prisma.usuario.findMany({
      include: {
        subAreasInteresse: true,
      },
    });

    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
