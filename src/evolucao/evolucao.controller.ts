import { Controller, Get, Param } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import axios from 'axios';

@Controller('evolucao')
export class EvolucaoController {
  constructor(private readonly evolucaoService: EvolucaoService) {}

  @Get(':pokemon')
  async obterEvolucao(@Param('pokemon') pokemon: string) {
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    return this.evolucaoService.obterLinhaEvolutiva(evolutionChainUrl);
  }
}
