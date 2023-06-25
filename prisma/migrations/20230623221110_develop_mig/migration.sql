/*
  Warnings:

  - Changed the type of `tipo` on the `Aluno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipo` on the `Servidor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "tipo",
ADD COLUMN     "tipo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Servidor" DROP COLUMN "tipo",
ADD COLUMN     "tipo" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TipoAluno";

-- DropEnum
DROP TYPE "TipoServidor";
