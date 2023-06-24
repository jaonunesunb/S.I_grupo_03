import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { IServidor, IServidorRequest } from "../../interfaces";
import { ServidorModel } from "../../schemas/userSchemas";

const prisma = new PrismaClient();

export const createProfessorService = async (
  dataBody: IServidorRequest
): Promise<IServidor> => {
  const { macroArea, area, subArea, ...res } = dataBody;

  try {
    // Verificar se o email já está cadastrado
    const existingUser = await prisma.servidor.findUnique({
      where: { email: dataBody.email },
    });

    if (existingUser) {
      throw new AppError("Email já cadastrado", 400);
    }

    // Verificar se a matrícula já está cadastrada
    if (dataBody.matricula) {
      const existingMatricula = await prisma.servidor.findUnique({
        where: { matricula: dataBody.matricula },
      });

      if (existingMatricula) {
        throw new AppError("Matrícula já cadastrada", 400);
      }
    }

    // Obter as IDs das áreas de interesse
    const macroAreaObj = await prisma.macroArea.findFirst({
      where: { nome: macroArea },
    });

    if (!macroAreaObj) {
      throw new AppError("Macroárea não encontrada", 404);
    }

    const areaObj = await prisma.area.findFirst({
      where: { nome: area },
    });

    if (!areaObj) {
      throw new AppError("Área não encontrada", 404);
    }

    const subAreaObj = await prisma.subArea.findFirst({
      where: { nome: subArea },
    });

    if (!subAreaObj) {
      throw new AppError("Subárea não encontrada", 404);
    }

    // Criar o usuário com as informações fornecidas
    const createUser = await prisma.servidor.create({
      data: {
        ...res,
        areasInteresse: {
          create: {
            macroArea: { connect: { id: macroAreaObj.id } },
            area: { connect: { id: areaObj.id } },
            subArea: { connect: { id: subAreaObj.id } },
          },
        },
      },
      include: {
        areasInteresse: true,
      },
    });

    const returnUser = ServidorModel.parse(createUser);

    return returnUser;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};
