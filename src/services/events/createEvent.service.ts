import { PrismaClient, TipoEvento } from "@prisma/client";
import { IEvento } from "../../interfaces";

const prisma = new PrismaClient();

export const createEventService = async (data: IEvento) => {
  try {
    const creator = await prisma.usuario.findUnique({
      where: { email: data.criadorEmail },
    });

    const majorEvent = await prisma.evento.findUnique({
      where: { id: parseInt(data.eventoMaiorId) },
    });

    const event = await prisma.evento.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        tipoEvento: data.tipoEvento,
        urlMaisInfo: data.urlMaisInfo,
        urlInscricao: data.urlMaisInfo,
        criador: {
          connect: { id: creator?.id },
        },
        eventoMaiorId: parseInt(data.eventoMaiorId),
        eventosMenores: {
          connect: [{ id: majorEvent?.id }],
        },
        departamentoId: data.departamentoId,
        subAreasRelacionadas: data.subAreasRelacionadas,
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
      },
    });

    return event;
  } catch (error) {
    console.error("Error during event creation:", error);
    throw error;
  }
};
