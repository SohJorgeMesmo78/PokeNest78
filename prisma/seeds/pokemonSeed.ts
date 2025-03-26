import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function pokemonSeed() {
    const pokemons = [
        { numDex: 1, nome: 'Bulbasaur' },
        { numDex: 2, nome: 'Ivysaur' },
        { numDex: 3, nome: 'Venusaur' },
        { numDex: 4, nome: 'Charmander' },
        { numDex: 7, nome: 'Squirtle' },
    ];

    console.log('Inserindo Pokémon iniciais de Kanto...');
    for (const pokemon of pokemons) {
        await prisma.pokemon.upsert({
            where: { numDex: pokemon.numDex },
            update: {},
            create: pokemon,
        });
    }

    console.log('Pokémon iniciais inseridos com sucesso!');
}
