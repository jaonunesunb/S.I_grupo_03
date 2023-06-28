import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByIDService = async (id: number) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id },
      include: {
        subAreasInteresse: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
