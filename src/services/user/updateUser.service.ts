import { PrismaClient, Usuario } from "@prisma/client";
import { IUsuarioUpdate } from "../../interfaces";
import { AppError } from "../../errors/AppError";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export const updateUserService = async (
  id: number,
  dataBody: IUsuarioUpdate
) => {
  const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
  const { subAreasInteresse, email, nome, senha } = dataBody;

  if (!usuarioExistente) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const subAreas = await prisma.subArea.findMany({
    where: { nome: { in: subAreasInteresse || [] } },
  });

  const updateUser = await prisma.usuario.update({
    where: { id },
    data: {
      nome: dataBody.nome,
      email: dataBody.email,
      senha: senha ? await hashPassword(senha) : undefined,
      subAreasInteresse: {
        connect: subAreas.map((subArea) => ({ id: subArea.id })),
      },
    },
    include: {
      subAreasInteresse: true,
    },
  });
  return updateUser;
};
