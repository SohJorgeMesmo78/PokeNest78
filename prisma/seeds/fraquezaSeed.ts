import { PrismaClient } from '@prisma/client';
import { FraquezaEnum } from '../../src/enums/fraqueza.enum';

const prisma = new PrismaClient();

export async function fraquezaSeed() {
    const tipos = await prisma.tipo.findMany();

    if (tipos.length === 0) {
        console.error('Tipos não encontrados! Verifique se os tipos foram inseridos.');
        return;
    }

    // Buscar os tipos necessários
    const normal = await prisma.tipo.findUnique({ where: { nome: 'Normal' } });
    const lutador = await prisma.tipo.findUnique({ where: { nome: 'Lutador' } });
    const voador = await prisma.tipo.findUnique({ where: { nome: 'Voador' } });
    const venenoso = await prisma.tipo.findUnique({ where: { nome: 'Venenoso' } });
    const terrestre = await prisma.tipo.findUnique({ where: { nome: 'Terrestre' } });
    const pedra = await prisma.tipo.findUnique({ where: { nome: 'Pedra' } });
    const inseto = await prisma.tipo.findUnique({ where: { nome: 'Inseto' } });
    const fantasma = await prisma.tipo.findUnique({ where: { nome: 'Fantasma' } });
    const aco = await prisma.tipo.findUnique({ where: { nome: 'Aço' } });
    const fogo = await prisma.tipo.findUnique({ where: { nome: 'Fogo' } });
    const agua = await prisma.tipo.findUnique({ where: { nome: 'Água' } });
    const grama = await prisma.tipo.findUnique({ where: { nome: 'Grama' } });
    const eletrico = await prisma.tipo.findUnique({ where: { nome: 'Elétrico' } });
    const psíquico = await prisma.tipo.findUnique({ where: { nome: 'Psíquico' } });
    const gelo = await prisma.tipo.findUnique({ where: { nome: 'Gelo' } });
    const dragao = await prisma.tipo.findUnique({ where: { nome: 'Dragão' } });
    const sombrio = await prisma.tipo.findUnique({ where: { nome: 'Sombrio' } });
    const fada = await prisma.tipo.findUnique({ where: { nome: 'Fada' } });

    if (!normal || !lutador || !voador || !venenoso || !terrestre || !pedra || !inseto || !fantasma || !aco ||
        !fogo || !agua || !grama || !eletrico || !psíquico || !gelo || !dragao || !sombrio || !fada) {
        console.error('Erro ao buscar tipos. Execute a seed novamente.');
        return;
    }

    // Inserir fraquezas
    console.log('Inserindo fraquezas padrão...');

    // Criar todas as combinações de ataque e defesa com fraqueza padrão NEUTRO
    const fraquezas = tipos.flatMap((ataque) =>
        tipos.map((defesa) => ({
            idAtaque: ataque.id,
            idDefesa: defesa.id,
            fraqueza: FraquezaEnum.NEUTRO,
        }))
    );

    await prisma.fraqueza.createMany({
        data: fraquezas,
        skipDuplicates: true, // Evita duplicatas ao rodar a seed novamente
    });

    console.log('Fraquezas padrão inseridas com sucesso!');

    console.log('Ajustando fraquezas específicas...');

    // Ajustar fraquezas específicas
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
        { ataque: 'Lutador', defesa: 'Psiquico', fraqueza: FraquezaEnum.DESVANTAGEM },
        { ataque: 'Lutador', defesa: 'Gelo', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Lutador', defesa: 'Sombrio', fraqueza: FraquezaEnum.VANTAGEM },
        { ataque: 'Lutador', defesa: 'Fada', fraqueza: FraquezaEnum.DESVANTAGEM },
        
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
