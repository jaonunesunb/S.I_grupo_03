import { PrismaClient, TipoEvento } from "@prisma/client";
import { IEvento } from "../../interfaces";
import { AppError } from "../../errors/AppError";

import crypto from "crypto";

const prisma = new PrismaClient();

export const createEventService = async (data: IEvento) => {
  const publicId = crypto.randomBytes(16).toString("hex");
  const nome = data.nome;
  const descricao = data.descricao;
  const tipoEvento = data.tipoEvento;
  const urlMaisInfo = data.urlMaisInfo;
  const urlInscricao = data.urlInscricao;

  const criador = await prisma.usuario.findUnique({
    where: { email: data.criadorEmail },
  });

  if (criador === null) {
    throw new AppError("Creator does not exist", 404);
  }

  let eventoMaior;
  if (data.eventoMaiorId) {
    eventoMaior = await prisma.evento.findUnique({
      where: { public_id: data.eventoMaiorId },
    });
  } else {
    eventoMaior = null;
  }

  const departamento = await prisma.departamento.findUnique({
    where: { nome: data.departamentoNome },
  });

  if (departamento === null) {
    throw new AppError("Departamento does not exist", 404);
  }

  const subAreasRelacionadas = await prisma.subArea.findMany({
    where: { nome: { in: data.subAreasRelacionadas || [] } },
  });

  const dataInicio = new Date(data.dataInicio);
  const dataFim = new Date(data.dataFim);

  const event = await prisma.evento.create({
    data: {
      public_id: publicId,
      nome,
      descricao,
      tipoEvento,
      urlMaisInfo,
      urlInscricao,
      criador: { connect: { id: criador.id } },
      eventoMaior: eventoMaior
        ? { connect: { id: eventoMaior?.id } }
        : undefined,
      departamento: { connect: { id: departamento.id } },
      subAreasRelacionadas: {
        connect: subAreasRelacionadas.map((subArea) => ({ id: subArea.id })),
      },
      dataInicio,
      dataFim,
    },
  });

  return event;
};
