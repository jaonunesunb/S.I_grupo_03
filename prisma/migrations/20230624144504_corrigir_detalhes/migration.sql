/*
  Warnings:

  - You are about to drop the column `password` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Departamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `Evento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `public_id` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "password",
ADD COLUMN     "senha" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_nome_key" ON "Departamento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Evento_public_id_key" ON "Evento"("public_id");
