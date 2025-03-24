import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PokemonDto } from './dtos/pokemon';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {

    constructor(
        private pokemonService: PokemonService
    ) { }

    @Post('')
    async PostPokemon(@Body() body: PokemonDto) {
        return this.pokemonService.PostPokemon(body)
    }

    @Get('')
    async GetAllPokemons() {
        return this.pokemonService.GetAllPokemons();
    }

    @Get(':numDex')
    async GetPokemonById(@Param('numDex') numDex: string) {
        return this.pokemonService.GetPokemonByNumDex(Number(numDex));
    }

}
