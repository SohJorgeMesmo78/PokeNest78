/*
  Warnings:

  - You are about to drop the `PokemonTipo` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `fraqueza` on the `Fraqueza` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PokemonTipo" DROP CONSTRAINT "PokemonTipo_idPokemon_fkey";

-- DropForeignKey
ALTER TABLE "PokemonTipo" DROP CONSTRAINT "PokemonTipo_idTipo1_fkey";

-- DropForeignKey
ALTER TABLE "PokemonTipo" DROP CONSTRAINT "PokemonTipo_idTipo2_fkey";

-- AlterTable
ALTER TABLE "Fraqueza" DROP COLUMN "fraqueza",
ADD COLUMN     "fraqueza" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PokemonTipo";

-- DropEnum
DROP TYPE "FraquezaEnum";
