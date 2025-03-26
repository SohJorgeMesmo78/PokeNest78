import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PokemonDto } from './dtos/pokemon';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {

    constructor(private prismaService: PrismaService) { }

    async GetAllPokemons() {
        // Retorna os Pokémons ordenados por numDex, sem o campo id
        return this.prismaService.pokemon.findMany({
            orderBy: {
                numDex: 'asc', // Ordenando pelo numDex em ordem crescente
            },
            select: {
                numDex: true,
                nome: true, // Retorna apenas o numDex e o nome, omitindo o id
            },
        });
    }

    async GetPokemonByNumDex(numDex: number) {
        const pokemon = await this.prismaService.pokemon.findUnique({
            where: { numDex },
            select: {
                numDex: true,
                nome: true, // Retorna apenas o numDex e o nome, omitindo o id
            },
        });

        if (!pokemon) {
            throw new UnauthorizedException('Pokémon não encontrado');
        }

        return pokemon;
    }

    async PostPokemon(data: PokemonDto) {
        // Verificando se já tem um Pokémon com aquele número de dex
        const numDexExists = await this.prismaService.pokemon.findUnique({
            where: {
                numDex: data.numDex,
            },
        });
        if (numDexExists) {
            throw new UnauthorizedException('Este número da dex já foi preenchido');
        }

        const res = await this.prismaService.pokemon.create({ data });

        return res;
    }
}
