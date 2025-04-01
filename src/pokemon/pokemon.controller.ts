import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    async getPokemons(@Query('page') page = 1, @Query('limit') limit = 10) {
        return this.pokemonService.getPokemons(Number(page), Number(limit));
    }

    // 🔥 Mudei essa rota para vir ANTES da de ID
    @Get('search')
    async searchPokemons(@Query('name') name: string) {
        return this.pokemonService.searchPokemons(name);
    }

    @Get('byId/:identifier')
    async getPokemon(@Param('identifier') identifier: string) {
        return this.pokemonService.getPokemonByIdOrName(identifier);
    }

}
