import { PrismaClient } from '@prisma/client';
import { FraquezaEnum } from '../../src/enums/fraqueza.enum';

const prisma = new PrismaClient();

export async function fraquezaSeed() {
    const totalFraquezas = await prisma.fraqueza.count();
    
    if (totalFraquezas > 0) {
        console.log('As fraquezas já foram inseridas anteriormente. Pulando inserção inicial.');
    } else {
        const tipos = await prisma.tipo.findMany();

        if (tipos.length === 0) {
            console.error('Tipos não encontrados! Verifique se os tipos foram inseridos.');
            return;
        }

        const fraquezas = tipos.flatMap((ataque) =>
            tipos.map((defesa) => ({
                idAtaque: ataque.id,
                idDefesa: defesa.id,
                fraqueza: FraquezaEnum.NEUTRO,
            }))
        );

        await prisma.fraqueza.createMany({
            data: fraquezas,
            skipDuplicates: true,
        });

        console.log('Fraquezas padrão inseridas com sucesso!');
    }

    console.log('Ajustando fraquezas específicas...');

    const ajustes = [
        //Normal
        { ataque: 'Normal', defesa: 'Pedra', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Normal', defesa: 'Fantasma', fraqueza: FraquezaEnum.IMUNE },
        { ataque: 'Normal', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Lutador
        { ataque: 'Lutador', defesa: 'Normal', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Lutador', defesa: 'Voador', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Lutador', defesa: 'Venenoso', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Lutador', defesa: 'Pedra', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Lutador', defesa: 'Inseto', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Lutador', defesa: 'Fantasma', fraqueza: FraquezaEnum.IMUNE },
        { ataque: 'Lutador', defesa: 'Aço', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Lutador', defesa: 'Psíquico', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Lutador', defesa: 'Gelo', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Lutador', defesa: 'Sombrio', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Lutador', defesa: 'Fada', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Voador
        { ataque: 'Voador', defesa: 'Lutador', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Voador', defesa: 'Pedra', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Voador', defesa: 'Inseto', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Voador', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Voador', defesa: 'Grama', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Voador', defesa: 'Elétrico', fraqueza: FraquezaEnum.DESVANTAGEM },
        
        //Venenoso
        { ataque: 'Venenoso', defesa: 'Venenoso', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Venenoso', defesa: 'Terrestre', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Venenoso', defesa: 'Pedra', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Venenoso', defesa: 'Fantasma', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Venenoso', defesa: 'Aço', fraqueza: FraquezaEnum.IMUNE },
        { ataque: 'Venenoso', defesa: 'Grama', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Venenoso', defesa: 'Fada', fraqueza: FraquezaEnum.VANTAGEM },
        
        //Terrestre
        { ataque: 'Terrestre', defesa: 'Voador', fraqueza: FraquezaEnum.IMUNE },
        { ataque: 'Terrestre', defesa: 'Venenoso', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Terrestre', defesa: 'Pedra', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Terrestre', defesa: 'Inseto', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Terrestre', defesa: 'Aço', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Terrestre', defesa: 'Fogo', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Terrestre', defesa: 'Grama', fraqueza: FraquezaEnum.DESVANTAGEM },
        
        //Pedra
        { ataque: 'Pedra', defesa: 'Lutador', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Pedra', defesa: 'Voador', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Pedra', defesa: 'Terrestre', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Pedra', defesa: 'Inseto', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Pedra', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Pedra', defesa: 'Fogo', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Pedra', defesa: 'Gelo', fraqueza: FraquezaEnum.VANTAGEM },

        //Inseto
        { ataque: 'Inseto', defesa: 'Lutador', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Inseto', defesa: 'Voador', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Inseto', defesa: 'Venenoso', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Inseto', defesa: 'Fantasma', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Inseto', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Inseto', defesa: 'Fogo', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Inseto', defesa: 'Grama', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Inseto', defesa: 'Psíquico', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Inseto', defesa: 'Sombrio', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Inseto', defesa: 'Fada', fraqueza: FraquezaEnum.DESVANTAGEM },


        //Fantasma
        { ataque: 'Fantasma', defesa: 'Normal', fraqueza: FraquezaEnum.IMUNE },
        { ataque: 'Fantasma', defesa: 'Fantasma', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fantasma', defesa: 'Psíquico', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fantasma', defesa: 'Sombrio', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Aço
        { ataque: 'Aço', defesa: 'Pedra', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Aço', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Aço', defesa: 'Fogo', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Aço', defesa: 'Água', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Aço', defesa: 'Elétrico', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Aço', defesa: 'Gelo', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Aço', defesa: 'Fada', fraqueza: FraquezaEnum.VANTAGEM },

        //Fogo
        { ataque: 'Fogo', defesa: 'Pedra', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Fogo', defesa: 'Inseto', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fogo', defesa: 'Aço', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fogo', defesa: 'Fogo', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Fogo', defesa: 'Água', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Fogo', defesa: 'Grama', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fogo', defesa: 'Gelo', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fogo', defesa: 'Dragão', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Água
        { ataque: 'Água', defesa: 'Terrestre', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Água', defesa: 'Pedra', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Água', defesa: 'Fogo', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Água', defesa: 'Água', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Água', defesa: 'Grama', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Água', defesa: 'Dragão', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Grama
        { ataque: 'Grama', defesa: 'Voador', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Grama', defesa: 'Venenoso', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Grama', defesa: 'Terrestre', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Grama', defesa: 'Pedra', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Grama', defesa: 'Inseto', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Grama', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Grama', defesa: 'Fogo', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Grama', defesa: 'Água', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Grama', defesa: 'Grama', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Grama', defesa: 'Dragão', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Elétrico
        { ataque: 'Elétrico', defesa: 'Voador', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Elétrico', defesa: 'Terrestre', fraqueza: FraquezaEnum.IMUNE },
        { ataque: 'Elétrico', defesa: 'Água', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Elétrico', defesa: 'Grama', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Elétrico', defesa: 'Elétrico', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Elétrico', defesa: 'Dragão', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Psíquico
        { ataque: 'Psíquico', defesa: 'Lutador', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Psíquico', defesa: 'Venenoso', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Psíquico', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Psíquico', defesa: 'Psíquico', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Psíquico', defesa: 'Sombrio', fraqueza: FraquezaEnum.IMUNE },

        //Gelo
        { ataque: 'Gelo', defesa: 'Voador', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Gelo', defesa: 'Terrestre', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Gelo', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Gelo', defesa: 'Fogo', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Gelo', defesa: 'Água', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Gelo', defesa: 'Grama', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Gelo', defesa: 'Gelo', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Gelo', defesa: 'Dragão', fraqueza: FraquezaEnum.VANTAGEM },

        //Dragão
        { ataque: 'Dragão', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Dragão', defesa: 'Dragão', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Dragão', defesa: 'Fada', fraqueza: FraquezaEnum.IMUNE },

        //Sombrio
        { ataque: 'Sombrio', defesa: 'Lutador', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Sombrio', defesa: 'Fantasma', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Sombrio', defesa: 'Psíquico', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Sombrio', defesa: 'Sombrio', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Sombrio', defesa: 'Fada', fraqueza: FraquezaEnum.DESVANTAGEM },

        //Fada
        { ataque: 'Fada', defesa: 'Lutador', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fada', defesa: 'Venenoso', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Fada', defesa: 'Aço', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Fada', defesa: 'Fogo', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Fada', defesa: 'Dragão', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Fada', defesa: 'Sombrio', fraqueza: FraquezaEnum.VANTAGEM },
        
    ];

    for (const ajuste of ajustes) {
        const ataqueTipo = await prisma.tipo.findUnique({ where: { nome: ajuste.ataque } });
        const defesaTipo = await prisma.tipo.findUnique({ where: { nome: ajuste.defesa } });

        if (ataqueTipo && defesaTipo) {
            await prisma.fraqueza.updateMany({
                where: {
                    idAtaque: ataqueTipo.id,
                    idDefesa: defesaTipo.id,
                },
                data: {
                    fraqueza: ajuste.fraqueza,
                },
            });
        } else {
            console.warn(`Erro ao ajustar fraqueza: ${ajuste.ataque} vs ${ajuste.defesa}`);
        }
    }

    console.log('Fraquezas ajustadas com sucesso!');
}
