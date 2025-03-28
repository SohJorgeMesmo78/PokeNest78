import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
    constructor(private prismaService: PrismaService) {}

    async GetAllPokemons() {
        const pokemons = await this.prismaService.pokemon.findMany({
            orderBy: { numDex: 'asc' },
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
    
        return pokemons.map(async (pokemon) => {
            // Buscando as fraquezas baseadas no primeiro tipo
            const firstTipoId = pokemon.tipos[0]?.tipo.id;
            const fraquezas = firstTipoId
                ? await this.prismaService.fraqueza.findMany({
                      where: {
                          idAtaque: firstTipoId,
                      },
                      select: {
                          fraqueza: true,
                          tipoDefesa: {
                              select: {
                                  nome: true,
                              },
                          },
                      },
                  })
                : [];
    
            return {
                numDex: pokemon.numDex,
                nome: pokemon.nome,
                tipos: pokemon.tipos.map((tipo) => ({
                    id: tipo.tipo.id,
                    nome: tipo.tipo.nome,
                    ordem: tipo.ordem,
                })),
                fraquezas: fraquezas.map((fraqueza) => ({
                    tipoAtaque: fraqueza.tipoDefesa.nome,
                    fraqueza: fraqueza.fraqueza,
                })),
            };
        });
    }
    
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
    
        // Buscando as fraquezas baseadas no primeiro tipo
        const firstTipoId = pokemon.tipos[0]?.tipo.id;
        const fraquezas = firstTipoId
            ? await this.prismaService.fraqueza.findMany({
                  where: {
                      idAtaque: firstTipoId,
                  },
                  select: {
                      fraqueza: true,
                      tipoDefesa: {
                          select: {
                              nome: true,
                          },
                      },
                  },
              })
            : [];
    
        return {
            numDex: pokemon.numDex,
            nome: pokemon.nome,
            tipos: pokemon.tipos.map((tipo) => ({
                id: tipo.tipo.id,
                nome: tipo.tipo.nome,
                ordem: tipo.ordem,
            })),
            fraquezas: fraquezas.map((fraqueza) => ({
                tipoAtaque: fraqueza.tipoDefesa.nome,
                fraqueza: fraqueza.fraqueza,
            })),
        };
    }    
}
