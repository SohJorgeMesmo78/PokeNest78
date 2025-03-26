-- CreateTable
CREATE TABLE "PokemonTipo" (
    "id" SERIAL NOT NULL,
    "idPokemon" INTEGER NOT NULL,
    "idTipo1" INTEGER NOT NULL,
    "idTipo2" INTEGER,

    CONSTRAINT "PokemonTipo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_idPokemon_fkey" FOREIGN KEY ("idPokemon") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_idTipo1_fkey" FOREIGN KEY ("idTipo1") REFERENCES "Tipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_idTipo2_fkey" FOREIGN KEY ("idTipo2") REFERENCES "Tipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
