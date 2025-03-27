import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function tipoSeed() {
    const tipos = [
        { nome: 'Normal' },
        { nome: 'Lutador' },
        { nome: 'Voador' },
        { nome: 'Venenoso' },
        { nome: 'Terrestre' },
        { nome: 'Pedra' },
        { nome: 'Inseto' },
        { nome: 'Fantasma' },
        { nome: 'Aço' },
        { nome: 'Fogo' },
        { nome: 'Água' },
        { nome: 'Grama' },
        { nome: 'Elétrico' },
        { nome: 'Psíquico' },
        { nome: 'Gelo' },
        { nome: 'Dragão' },
        { nome: 'Sombrio' },
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
}
