import { Body, Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {

    constructor(
        private pokemonService: PokemonService
    ) { }

    @Get('')
    async GetAllPokemons() {
        return this.pokemonService.GetAllPokemons();
    }

    @Get('getById/:numDex')
    async GetPokemonById(@Param('numDex') numDex: string) {
        return this.pokemonService.GetPokemonByNumDex(Number(numDex));
    }

}
