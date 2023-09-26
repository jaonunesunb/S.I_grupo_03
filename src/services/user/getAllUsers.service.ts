import { PrismaClient } from "@prisma/client";
import { listUsersSchema, UsuarioUpdateReturn, SubArea } from "../../schemas";

const prisma = new PrismaClient();

export const getAllUsersService = async () => {
  const users = await prisma.usuario.findMany({
    include: {
      subAreasInteresse: true,
    },
  });

  return users;
};
