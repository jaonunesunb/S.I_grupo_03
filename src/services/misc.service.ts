import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDepartmentsService = async () => {
  const departamentos = await prisma.departamento.findMany();

  return {
    response: departamentos.map((departamento) => departamento.nome),
    status: 200,
  };
};

export const getSubAreasService = async () => {
  const subAreas = await prisma.subArea.findMany();

  return {
    response: subAreas.map((subArea) => ({
      tabelaId: subArea.tabelaId,
      nome: subArea.nome,
    })),
    status: 200,
  };
};
