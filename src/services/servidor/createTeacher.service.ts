import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { IServidor, IServidorRequest } from "../../interfaces";
import { ServidorModel } from "../../schemas";

const prisma = new PrismaClient();

export const createdProfessorService = async (
  dataBody: IServidorRequest
): Promise<IServidor> => {
  const { macroArea, area, subArea, ...res } = dataBody;

  try {
    // Verificar se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email: dataBody.email },
    });

    if (existingUser) {
      throw new AppError("Email já cadastrado", 400);
    }

    // Verificar se a matrícula já está cadastrada
    if (dataBody.matricula) {
      const existingMatricula = await prisma.user.findUnique({
        where: { matricula: dataBody.matricula },
      });

      if (existingMatricula) {
        throw new AppError("Matrícula já cadastrada", 400);
      }
    }

    // Obter o ID da macroárea com base no nome fornecido
    const macroAreaRecord = await prisma.macroArea.findUnique({
      where: { nome: macroArea },
    });

    if (!macroAreaRecord) {
      throw new AppError("Macroárea não encontrada", 404);
    }

    // Obter o ID da área com base no nome fornecido e no ID da macroárea
    const areaRecord = await prisma.area.findUnique({
      where: { nome: area, macroAreaId: macroAreaRecord.id },
    });

    if (!areaRecord) {
      throw new AppError("Área não encontrada", 404);
    }

    // Obter o ID da subárea com base no nome fornecido e no ID da área
    const subAreaRecord = await prisma.subArea.findUnique({
      where: { nome: subArea, areaId: areaRecord.id },
    });

    if (!subAreaRecord) {
      throw new AppError("Subárea não encontrada", 404);
    }

    // Criar o usuário com as informações fornecidas
    const createUser = await prisma.user.create({
      data: {
        ...res,
        macroAreaId: macroAreaRecord.id,
        areaId: areaRecord.id,
        subAreaId: subAreaRecord.id,
      },
    });

    const returnUser = ServidorModel.parse(createUser);

    return returnUser;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};
