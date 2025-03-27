import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function pokemonSeed() {
    const pokemons = [
        { numDex: 1, nome: 'Bulbasaur', tipos: [ { id: 12, ordem: 1 }, { id: 4, ordem: 2 } ] },
        { numDex: 2, nome: 'Ivysaur', tipos: [ { id: 12, ordem: 1 }, { id: 4, ordem: 2 } ] },
        { numDex: 3, nome: 'Venusaur', tipos: [ { id: 12, ordem: 1 }, { id: 4, ordem: 2 } ] },
        { numDex: 4, nome: 'Charmander', tipos: [ { id: 10, ordem: 1 } ] },
        { numDex: 7, nome: 'Squirtle', tipos: [ { id: 11, ordem: 1 } ] },
    ];

    console.log('Inserindo Pokémon iniciais de Kanto...');

    for (const pokemon of pokemons) {
        await prisma.pokemon.upsert({
            where: { numDex: pokemon.numDex },
            update: {},
            create: {
                numDex: pokemon.numDex,
                nome: pokemon.nome,
                tipos: {
                    create: pokemon.tipos.map((tipo) => ({
                        tipoId: tipo.id,
                        ordem: tipo.ordem,
                    })),
                },
            },
        });
    }

    console.log('Pokémon inseridos com sucesso!');
}
