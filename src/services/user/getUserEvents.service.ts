import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserEventsService = async (
  email: string,
  page: number,
  count: number
) => {
  const user = await prisma.usuario.findUnique({
    where: { email },
    include: {
      subAreasInteresse: {
        include: { area: { include: { macroArea: true } } },
      },
    },
  });

  if (user === null) return;

  const subAreasInteresse = new Set(user.subAreasInteresse.map(({ id }) => id));

  const areasInteresse = new Set(
    user.subAreasInteresse.map(({ area }) => area.id)
  );

  const macroAreasInteresse = new Set(
    user.subAreasInteresse.map(({ area }) => area.macroArea.id)
  );

  // Pegar data atual sem horas
  const dataAtual = new Date(new Date().toDateString());

  // Todos os eventos que tem pelo menos uma subArea
  // de interesse do nosso usuario

  // Apenas eventos cuja data de começo não tenha passado
  // Limitado em até 1,000
  // Ordenado por data de começo do maior até o menor
  let eventos = await prisma.evento.findMany({
    take: 1_000,
    where: { dataFim: { gte: dataAtual } },
    orderBy: { dataInicio: "desc" },
    include: {
      subAreasRelacionadas: {
        include: { area: { include: { macroArea: true } } },
      },
      criador: true,
    },
  });

  // Criar dicionario com todos eventos
  // Cada evento vai ter um score 100 * s + 10 * a + m
  // s = numero de subAreas em comum
  // a = numero de areas em comum
  // m = numero de macroAreas em comum

  // As subAreasInteresse estarao em um set
  // Ou seja subAreasInteresse.has() é O(1) em complexidade

  // Se tivermos 1,000 eventos
  // Se cada evento tiver 10 subAreas
  // Se nosso usuario tiver 100 subAreasInteresse

  // O nosso algoritmo fará 30,000 iterações

  // Portanto a complexidade é O(3n*s) = O(n*s) onde n é
  // num de eventos e s é o maior número de subAreas por evento

  const scores: Record<string, number> = {};
  for (const evento of eventos) {
    let subAreasScore = 0;
    for (const subArea of evento.subAreasRelacionadas) {
      if (subAreasInteresse.has(subArea.id)) {
        subAreasScore += 1;
      }
    }

    let areasScore = 0;
    for (const subArea of evento.subAreasRelacionadas) {
      if (areasInteresse.has(subArea.area.id)) {
        areasScore += 1;
      }
    }

    let macroAreasScore = 0;
    for (const subArea of evento.subAreasRelacionadas) {
      if (macroAreasInteresse.has(subArea.area.macroArea.id)) {
        macroAreasScore += 1;
      }
    }

    scores[evento.id] =
      100 * subAreasScore + 10 * areasScore + 1 * macroAreasScore;
  }

  console.log(scores);

  // Agora a gente precisa ordenar a nossa lista de eventos
  // baseada nesse score
  // A complexidade aqui é O(n*log(n))

  // Coloquei o sinal negativo para ser em DESC não ASC
  eventos = eventos.sort(
    (eventoA, eventoB) => scores[eventoB.id] - scores[eventoA.id]
  );

  // Retornar apenas a página correta
  eventos = eventos.slice((page - 1) * count, page * count + count);

  return eventos;
};
