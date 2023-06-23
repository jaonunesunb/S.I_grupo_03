import fs from 'fs';
import csvParser from 'csv-parser';

export interface CSVRow {
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
      .on('data', (data: CSVRow) => {
        rows.push(data);
      })
      .on('end', () => {
        resolve(rows);
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });
}

export default readCSVFile;
