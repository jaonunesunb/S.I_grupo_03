import { PrismaClient, TipoEvento, Usuario } from "@prisma/client";
import { IEventoUpdate } from "../../interfaces";

const prisma = new PrismaClient();

export const updateEventService = async (
  id: number,
  dataBody: IEventoUpdate
) => {
  try {
    const eventoExistente = await prisma.evento.findUnique({ where: { id } });

    if (!eventoExistente) {
      throw new Error("Evento não encontrado");
    }

    const subAreas = await prisma.subArea.findMany({
      where: { nome: { in: dataBody.subAreasRelacionadas || [] } },
    });

    const updatedEvent = await prisma.evento.update({
      where: { id },
      data: {
        nome: dataBody.nome,
        criadorEmail: dataBody.criadorEmail,
        descricao: dataBody.descricao,
        tipoEvento: TipoEvento,
        urlMaisInfo: dataBody.urlMaisInfo,
        urlInscricao: dataBody.urlInscricao,
        eventoMaiorId: dataBody.eventoMaiorId,
        departamentoNome: dataBody.departamentoNome,
        dataInicio: dataBody.dataInicio,
        dataFim: dataBody.dataFim,
        subAreasInteresse: {
          connect: subAreas.map((subArea) => ({ id: subArea.id })),
        },
      },
      include: {
        subAreasRelacionadas: true,
      },
    });
    return updatedEvent;
  } catch (error) {
    console.error("Erro ao atualizar o evento", error);
    throw error;
  }
};
