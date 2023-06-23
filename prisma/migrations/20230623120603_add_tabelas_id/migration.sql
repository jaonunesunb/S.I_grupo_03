/*
  Warnings:

  - Added the required column `tabelaId` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tabelaId` to the `MacroArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tabelaId` to the `SubArea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "tabelaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MacroArea" ADD COLUMN     "tabelaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubArea" ADD COLUMN     "tabelaId" TEXT NOT NULL;
