import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
    constructor(private prismaService: PrismaService) { }

    async GetPokemonByNumDex(numDex: number) {
        const pokemon = await this.prismaService.pokemon.findUnique({
            where: { numDex },
            select: {
                numDex: true,
                nome: true,
                tipos: {
                    select: {
                        tipo: { select: { id: true, nome: true } },
                        ordem: true,
                    },
                    orderBy: { ordem: 'asc' },
                },
            },
        });

        if (!pokemon) {
            throw new UnauthorizedException('Pokémon não encontrado');
        }

        const tipoIds = pokemon.tipos.map((t) => t.tipo.id);
        const fraquezas = await this.calcularFraquezas(tipoIds);

        return {
            numDex: pokemon.numDex,
            nome: pokemon.nome,
            tipos: pokemon.tipos.map((tipo) => ({
                id: tipo.tipo.id,
                nome: tipo.tipo.nome,
                ordem: tipo.ordem,
            })),
            fraquezas,
        };
    }

    async GetAllPokemons() {
        const pokemons = await this.prismaService.pokemon.findMany({
            select: {
                numDex: true,
                nome: true,
                tipos: {
                    select: {
                        tipo: { select: { id: true, nome: true } },
                        ordem: true,
                    },
                    orderBy: { ordem: 'asc' },
                },
            },
        });

        return await Promise.all(
            pokemons.map(async (pokemon) => {
                const tipoIds = pokemon.tipos.map((t) => t.tipo.id);
                const fraquezas = await this.calcularFraquezas(tipoIds);

                return {
                    numDex: pokemon.numDex,
                    nome: pokemon.nome,
                    tipos: pokemon.tipos.map((tipo) => ({
                        id: tipo.tipo.id,
                        nome: tipo.tipo.nome,
                        ordem: tipo.ordem,
                    })),
                    fraquezas,
                };
            })
        );
    }

    async calcularFraquezas(tipoIds: number[]): Promise<{ tipoAtaque: string; fraqueza: number }[]> {
        const fraquezasPorTipo = await Promise.all(
            tipoIds.map((idTipo) =>
                this.prismaService.fraqueza.findMany({
                    where: { idDefesa: idTipo },
                    select: {
                        fraqueza: true,
                        tipoAtaque: {
                            select: { id: true, nome: true },
                        },
                    },
                })
            )
        );

        const fraquezasMap = new Map<string, number>();

        fraquezasPorTipo.flat().forEach(({ tipoAtaque, fraqueza }) => {
            if (fraquezasMap.has(tipoAtaque.nome)) {
                fraquezasMap.set(tipoAtaque.nome, fraquezasMap.get(tipoAtaque.nome)! * fraqueza);
            } else {
                fraquezasMap.set(tipoAtaque.nome, fraqueza);
            }
        });

        return Array.from(fraquezasMap, ([tipoAtaque, fraqueza]) => ({ tipoAtaque, fraqueza }));
    }

}
