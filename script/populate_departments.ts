import { PrismaClient, Area, MacroArea, SubArea } from "@prisma/client";
import { exit } from "process";
import fs from "fs";
import csvParser from "csv-parser";
import readline from "readline";

interface CSVRow {
  departamento: string;
  area: string;
  tabelaId: string;
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

const filePath = "./departamentos.csv";

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
      "Já existe um departamento. Só podemos continuar se o banco estiver vazio. Posso remover todas as rows (s/N)? ",
      async (answer) => {
        if (answer.toLowerCase() === "s") {
          await prisma.departamento.deleteMany();

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
  const departamento = await prisma.departamento.findFirst();
  if (departamento) {
    await removeEveryRow();
  }
};

const insertRowDatabase = async (row: CSVRow) => {
  console.log(row);

  const area = await prisma.area.findUnique({ where: { tabelaId: row.tabelaId } });

  if (!area) {
    throw new Error("Departamento não encontrado");
  } else {
    await prisma.departamento.create({
      data: { nome: row.departamento, area: { connect: { id: area.id } } },
    });
  }
};

const main = async () => {
  await enforceEmptyTable();

  console.log("Populando banco de dados...");

  readCSVFile(filePath)
    .then(async (rows: CSVRow[]) => {
      for (let i = 0; i < rows.length; i++) {
        await insertRowDatabase(rows[i]);
      }

      exit(0);
    })
    .catch((error: Error) => {
      console.error("Error reading CSV file:", error);
    });
};

main();
