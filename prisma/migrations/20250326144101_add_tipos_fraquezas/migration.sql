-- CreateEnum
CREATE TYPE "FraquezaEnum" AS ENUM ('DESVANTAGEM', 'NEUTRO', 'VANTAGEM');

-- CreateTable
CREATE TABLE "Tipo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fraqueza" (
    "id" SERIAL NOT NULL,
    "idAtaque" INTEGER NOT NULL,
    "idDefesa" INTEGER NOT NULL,
    "fraqueza" "FraquezaEnum" NOT NULL,

    CONSTRAINT "Fraqueza_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tipo_nome_key" ON "Tipo"("nome");

-- AddForeignKey
ALTER TABLE "Fraqueza" ADD CONSTRAINT "Fraqueza_idAtaque_fkey" FOREIGN KEY ("idAtaque") REFERENCES "Tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fraqueza" ADD CONSTRAINT "Fraqueza_idDefesa_fkey" FOREIGN KEY ("idDefesa") REFERENCES "Tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
