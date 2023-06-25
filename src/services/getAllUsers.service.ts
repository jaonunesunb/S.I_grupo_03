import { PrismaClient } from "@prisma/client";
import { Usuario } from "../schemas";

const prisma = new PrismaClient();

export const getAllUsersService = async () => {
  try {
    const users = await prisma.usuario.findMany();

    const returnUser = users.map((user) => Usuario.parse(user));

    return returnUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
