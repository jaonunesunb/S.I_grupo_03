import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByIDService = async (id: number) => {
  const user = await prisma.usuario.findUnique({
    where: { id },
    include: {
      subAreasInteresse: true,
    },
  });

  return user;
};
