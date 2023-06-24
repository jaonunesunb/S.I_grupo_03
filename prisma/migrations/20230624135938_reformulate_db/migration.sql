/*
  Warnings:

  - You are about to drop the column `subAreaId` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AreaInteresse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AtividadeUniversitaria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventoCurto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servidor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `criadorId` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataFim` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipoEvento` on the `Evento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('Tecnico', 'Docente', 'Graduacao', 'PosGraduacao');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('EventoAcademico', 'EventoCultural');

-- DropForeignKey
ALTER TABLE "AreaInteresse" DROP CONSTRAINT "AreaInteresse_areaId_fkey";

-- DropForeignKey
ALTER TABLE "AreaInteresse" DROP CONSTRAINT "AreaInteresse_macroAreaId_fkey";

-- DropForeignKey
ALTER TABLE "AreaInteresse" DROP CONSTRAINT "AreaInteresse_subAreaId_fkey";

-- DropForeignKey
ALTER TABLE "AreaInteresse" DROP CONSTRAINT "AreaInteresse_usuario_alunoID_fkey";

-- DropForeignKey
ALTER TABLE "AreaInteresse" DROP CONSTRAINT "AreaInteresse_usuario_servidorID_fkey";

-- DropForeignKey
ALTER TABLE "AtividadeUniversitaria" DROP CONSTRAINT "AtividadeUniversitaria_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "AtividadeUniversitaria" DROP CONSTRAINT "AtividadeUniversitaria_areaDeInteresseID_fkey";

-- DropForeignKey
ALTER TABLE "AtividadeUniversitaria" DROP CONSTRAINT "AtividadeUniversitaria_orientadorId_fkey";

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_subAreaId_fkey";

-- DropForeignKey
ALTER TABLE "EventoCurto" DROP CONSTRAINT "EventoCurto_congressoId_fkey";

-- DropForeignKey
ALTER TABLE "EventoCurto" DROP CONSTRAINT "EventoCurto_orientadorId_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "subAreaId",
DROP COLUMN "updated_at",
ADD COLUMN     "criadorId" INTEGER NOT NULL,
ADD COLUMN     "dataFim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departamentoId" INTEGER,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "eventoMaiorId" INTEGER,
ADD COLUMN     "urlInscricao" TEXT,
ADD COLUMN     "urlMaisInfo" TEXT,
DROP COLUMN "tipoEvento",
ADD COLUMN     "tipoEvento" "TipoEvento" NOT NULL;

-- DropTable
DROP TABLE "Aluno";

-- DropTable
DROP TABLE "AreaInteresse";

-- DropTable
DROP TABLE "AtividadeUniversitaria";

-- DropTable
DROP TABLE "EventoCurto";

-- DropTable
DROP TABLE "Servidor";

-- DropEnum
DROP TYPE "TipoAluno";

-- DropEnum
DROP TYPE "TipoServidor";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "departamentoId" INTEGER,
    "tipo" "TipoUsuario" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubAreaToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventoToSubArea" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_matricula_key" ON "Usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "_SubAreaToUsuario_AB_unique" ON "_SubAreaToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_SubAreaToUsuario_B_index" ON "_SubAreaToUsuario"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventoToSubArea_AB_unique" ON "_EventoToSubArea"("A", "B");

-- CreateIndex
CREATE INDEX "_EventoToSubArea_B_index" ON "_EventoToSubArea"("B");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_eventoMaiorId_fkey" FOREIGN KEY ("eventoMaiorId") REFERENCES "Evento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubAreaToUsuario" ADD CONSTRAINT "_SubAreaToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "SubArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubAreaToUsuario" ADD CONSTRAINT "_SubAreaToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoToSubArea" ADD CONSTRAINT "_EventoToSubArea_A_fkey" FOREIGN KEY ("A") REFERENCES "Evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoToSubArea" ADD CONSTRAINT "_EventoToSubArea_B_fkey" FOREIGN KEY ("B") REFERENCES "SubArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
