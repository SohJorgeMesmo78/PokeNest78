import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PokemonDto } from './dtos/pokemon';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {

    constructor(private prismaService: PrismaService) { }

    
    async GetAllPokemons() {
        return this.prismaService.pokemon.findMany();
    }
    
    async GetPokemonByNumDex(numDex: number) {
        const pokemon = await this.prismaService.pokemon.findUnique({
            where: { numDex },
        });
    
        if (!pokemon) {
            throw new UnauthorizedException('Pokémon não encontrado');
        }
    
        return pokemon;
    }
    
    
    async PostPokemon(data: PokemonDto) {
        //verificando se já tem um pokemon com aquele numero de dex
        const numDexExists = await this.prismaService.pokemon.findUnique({
            where:{
                numDex: data.numDex,
            }
        });
        if(numDexExists){
            throw new UnauthorizedException('Este numero da dex já foi preenchido')
        }

        const res = await this.prismaService.pokemon.create({data});
        
        return res
    }

}
