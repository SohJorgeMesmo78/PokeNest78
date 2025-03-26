import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Lista com todos os tipos de Pokémon
  const tipos = [
    { nome: 'Normal' },
    { nome: 'Fogo' },
    { nome: 'Água' },
    { nome: 'Elétrico' },
    { nome: 'Grama' },
    { nome: 'Gelo' },
    { nome: 'Lutador' },
    { nome: 'Venenoso' },
    { nome: 'Terrestre' },
    { nome: 'Voador' },
    { nome: 'Psíquico' },
    { nome: 'Inseto' },
    { nome: 'Pedra' },
    { nome: 'Fantasma' },
    { nome: 'Dragão' },
    { nome: 'Sombrio' },
    { nome: 'Aço' },
    { nome: 'Fada' },
  ];

  console.log('Inserindo tipos de Pokémon...');
  for (const tipo of tipos) {
    await prisma.tipo.upsert({
      where: { nome: tipo.nome },
      update: {},
      create: tipo,
    });
  }

  console.log('Tipos de Pokémon inseridos com sucesso!');

  // Buscar os tipos necessários
  const fogo = await prisma.tipo.findUnique({ where: { nome: 'Fogo' } });
  const agua = await prisma.tipo.findUnique({ where: { nome: 'Água' } });
  const grama = await prisma.tipo.findUnique({ where: { nome: 'Grama' } });
  const venenoso = await prisma.tipo.findUnique({ where: { nome: 'Venenoso' } });

  if (!fogo || !agua || !grama || !venenoso) {
    console.error('Erro ao buscar tipos. Execute a seed novamente.');
    return;
  }

  // Lista de Pokémon iniciais de Kanto
  const pokemons = [
    { numDex: 1, nome: 'Bulbasaur' },  // Grama/Venenoso
    { numDex: 2, nome: 'Ivysaur' },  // Grama/Venenoso
    { numDex: 3, nome: 'Venusaur' },  // Grama/Venenoso
    { numDex: 4, nome: 'Charmander' }, // Fogo
    { numDex: 7, nome: 'Squirtle' },   // Água
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
