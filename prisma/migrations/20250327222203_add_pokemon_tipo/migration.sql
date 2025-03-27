-- CreateTable
CREATE TABLE "PokemonTipo" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "PokemonTipo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PokemonTipo_pokemonId_tipoId_key" ON "PokemonTipo"("pokemonId", "tipoId");

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
