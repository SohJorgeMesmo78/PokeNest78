import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    async getPokemons(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.pokemonService.getPokemons(Number(page), Number(limit));
    }

    @Get(':identifier')
    async getPokemon(@Param('identifier') identifier: string) {
        return this.pokemonService.getPokemonByIdOrName(identifier);
    }
}
