/*
  Warnings:

  - A unique constraint covering the columns `[tabelaId]` on the table `Area` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tabelaId]` on the table `MacroArea` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tabelaId]` on the table `SubArea` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Area_tabelaId_key" ON "Area"("tabelaId");

-- CreateIndex
CREATE UNIQUE INDEX "MacroArea_tabelaId_key" ON "MacroArea"("tabelaId");

-- CreateIndex
CREATE UNIQUE INDEX "SubArea_tabelaId_key" ON "SubArea"("tabelaId");
