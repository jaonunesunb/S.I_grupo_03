import { PrismaClient, Area, MacroArea, SubArea } from "@prisma/client";
import { exit } from "process";
import fs from "fs";
import csvParser from "csv-parser";
import readline from "readline";

interface CSVRow {
  TIPO: string;
  ID: string;
  NOME: string;
  DEPENDENCIA: string;
}

function readCSVFile(filePath: string): Promise<CSVRow[]> {
  return new Promise<CSVRow[]>((resolve, reject) => {
    const rows: CSVRow[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data: CSVRow) => {
        rows.push(data);
      })
      .on("end", () => {
        resolve(rows);
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
}

const prisma = new PrismaClient();

const filePath = "./dados.csv";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Se já existe qualquer área na nossa tabela,
// Pergunta se quer deletar todas e repopular
// Se não, retorna o programa

const removeEveryRow = async () => {
  await new Promise<void>((resolve) => {
    rl.question(
      "Já existe uma área, macro-área ou sub-área. Só podemos continuar se o banco estiver vazio. Posso remover todas as rows (s/N)? ",
      async (answer) => {
        if (answer.toLowerCase() === "s") {
          await prisma.subArea.deleteMany();
          await prisma.area.deleteMany();
          await prisma.macroArea.deleteMany();

          resolve();
        } else {
          console.log("Saindo do programa...");
          exit(0);
        }
      }
    );
  });
};

const enforceEmptyTable = async () => {
  const subArea = await prisma.subArea.findFirst();
  if (subArea) {
    await removeEveryRow();
  }

  const area = await prisma.area.findFirst();
  if (area) {
    await removeEveryRow();
  }

  const macroArea = await prisma.macroArea.findFirst();
  if (macroArea) {
    await removeEveryRow();
  }
};

type AllAreas = {
  macro: { [id: string]: MacroArea };
  area: { [id: string]: Area };
  sub: { [id: string]: SubArea };
};

const insertRowDatabase = async (row: CSVRow, idx: number, areas: AllAreas) => {
  console.log(row);

  switch (row.TIPO) {
    case "MACRO":
      await prisma.macroArea.create({
        data: { id: idx, tabelaId: row.ID, nome: row.NOME },
      });

      areas.macro[row.ID] = { id: idx, tabelaId: row.ID, nome: row.NOME };
      break;
    case "AREA":
      if (!(row.DEPENDENCIA in areas.macro)) {
        console.log(row);
        throw new Error(`${row.DEPENDENCIA} not in areas.macro`);
      }

      await prisma.area.create({
        data: {
          id: idx,
          tabelaId: row.ID,
          nome: row.NOME,
          macroAreaId: areas.macro[row.DEPENDENCIA].id,
        },
      });

      areas.area[row.ID] = {
        id: idx,
        tabelaId: row.ID,
        nome: row.NOME,
        macroAreaId: areas.macro[row.DEPENDENCIA].id,
      };
      break;
    case "SUB":
      if (!(row.DEPENDENCIA in areas.area)) {
        throw new Error(`${row.DEPENDENCIA} not in areas.area`);
      }

      await prisma.subArea.create({
        data: {
          id: idx,
          tabelaId: row.ID,
          nome: row.NOME,
          areaId: areas.area[row.DEPENDENCIA].id,
        },
      });

      areas.sub[row.ID] = {
        id: idx,
        tabelaId: row.ID,
        nome: row.NOME,
        areaId: areas.area[row.DEPENDENCIA].id,
      };
      break;
    default:
      throw new Error(`Row do tipo ${row.TIPO} inexistente`);
  }
};

const main = async () => {
  await enforceEmptyTable();

  console.log("Populando banco de dados...");

  readCSVFile(filePath)
    .then(async (rows: CSVRow[]) => {
      const areas: AllAreas = { macro: {}, area: {}, sub: {} };

      for (let i = 0; i < rows.length; i++) {
        await insertRowDatabase(rows[i], i, areas);
      }

      exit(0);
    })
    .catch((error: Error) => {
      console.error("Error reading CSV file:", error);
    });
};

main();
