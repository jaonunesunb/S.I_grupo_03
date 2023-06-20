-- CreateEnum
CREATE TYPE "TipoServidor" AS ENUM ('Tecnico', 'Docente');

-- CreateEnum
CREATE TYPE "TipoAluno" AS ENUM ('Graduacao', 'Pos_graduacao');

-- CreateTable
CREATE TABLE "Servidor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "matricula" TEXT,
    "departamento" TEXT NOT NULL,
    "tipo" "TipoServidor" NOT NULL,

    CONSTRAINT "Servidor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "matricula" TEXT,
    "departamento" TEXT NOT NULL,
    "tipo" "TipoAluno" NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MacroArea" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "MacroArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "macroAreaId" INTEGER NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubArea" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "SubArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "subAreaId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoCurto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "congressoId" INTEGER,
    "orientadorId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventoCurto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtividadeUniversitaria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "tipoAtividade" TEXT NOT NULL,
    "orientadorId" INTEGER,
    "alunoId" INTEGER,
    "areaDeInteresseID" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AtividadeUniversitaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaInteresse" (
    "id" SERIAL NOT NULL,
    "usuario_servidorID" INTEGER,
    "usuario_alunoID" INTEGER,
    "macroAreaId" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,
    "subAreaId" INTEGER NOT NULL,

    CONSTRAINT "AreaInteresse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Servidor_email_key" ON "Servidor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Servidor_matricula_key" ON "Servidor"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_macroAreaId_fkey" FOREIGN KEY ("macroAreaId") REFERENCES "MacroArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubArea" ADD CONSTRAINT "SubArea_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_subAreaId_fkey" FOREIGN KEY ("subAreaId") REFERENCES "SubArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoCurto" ADD CONSTRAINT "EventoCurto_congressoId_fkey" FOREIGN KEY ("congressoId") REFERENCES "Evento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoCurto" ADD CONSTRAINT "EventoCurto_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "Servidor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadeUniversitaria" ADD CONSTRAINT "AtividadeUniversitaria_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "Servidor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadeUniversitaria" ADD CONSTRAINT "AtividadeUniversitaria_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadeUniversitaria" ADD CONSTRAINT "AtividadeUniversitaria_areaDeInteresseID_fkey" FOREIGN KEY ("areaDeInteresseID") REFERENCES "AreaInteresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaInteresse" ADD CONSTRAINT "AreaInteresse_usuario_servidorID_fkey" FOREIGN KEY ("usuario_servidorID") REFERENCES "Servidor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaInteresse" ADD CONSTRAINT "AreaInteresse_usuario_alunoID_fkey" FOREIGN KEY ("usuario_alunoID") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaInteresse" ADD CONSTRAINT "AreaInteresse_macroAreaId_fkey" FOREIGN KEY ("macroAreaId") REFERENCES "MacroArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaInteresse" ADD CONSTRAINT "AreaInteresse_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaInteresse" ADD CONSTRAINT "AreaInteresse_subAreaId_fkey" FOREIGN KEY ("subAreaId") REFERENCES "SubArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
