import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TipoPokemon } from 'src/common/enums/tipo-pokemon.enum';
import { EvolucaoService } from 'src/evolucao/evolucao.service';
import { TipoService } from 'src/tipo/tipo.service';

@Injectable()
export class PokemonService {
  private readonly pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private readonly tipoService: TipoService,
    private readonly evolucaoService: EvolucaoService,
  ) { }

  async getPokemons(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const url = `${this.pokeApiUrl}?offset=${offset}&limit=${limit}`;
  
    const response = await axios.get(url);
    const pokemons = await Promise.all(
      response.data.results.map(async (p) => {
        const id = this.extractIdFromUrl(p.url);
        const detalhes = await axios.get(`${this.pokeApiUrl}/${id}`);
  
        const tipos = detalhes.data.types.map((t) => {
          return TipoPokemon[t.type.name.toUpperCase()] || t.type.name;
        });
  
        return {
          id,
          nome: p.name,
          imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          tipos,
        };
      }),
    );
  
    return {
      pagina: page,
      total: response.data.count,
      pokemons,
    };
  }
  

  async getPokemonByIdOrName(identifier: string | number) {
    const url = `${this.pokeApiUrl}/${identifier}`;
  
    try {
      const response = await axios.get(url);
      const data = response.data;
  
      const tipos = data.types.map((t) => ({
        nome: TipoPokemon[t.type.name as keyof typeof TipoPokemon] || t.type.name
      }));
  
      const tiposPossiveis = Object.values(TipoPokemon);
  
      const relacoesDosTipos = await Promise.all(
        data.types.map(async (t) => await this.tipoService.getRelacoesDoTipo(t.type.name))
      );
  
      const relacoesCombinadas = new Map<string, number>();
  
      relacoesDosTipos.forEach((relacoes) => {
        ['vantagens', 'desvantagens', 'resistencias', 'imunidades'].forEach((categoria) => {
          relacoes[categoria].forEach((tipo: string) => {
            const fator =
              categoria === 'desvantagens' ? 2 :
                categoria === 'resistencias' ? 0.5 :
                  categoria === 'imunidades' ? 0 : 1;
  
            if (relacoesCombinadas.has(tipo)) {
              relacoesCombinadas.set(tipo, relacoesCombinadas.get(tipo)! * fator);
            } else {
              relacoesCombinadas.set(tipo, fator);
            }
          });
        });
      });
  
      tiposPossiveis.forEach((tipo) => {
        if (!relacoesCombinadas.has(tipo)) {
          relacoesCombinadas.set(tipo, 1);
        }
      });
  
      const resistenciasFinal = Array.from(relacoesCombinadas.entries()).map(([nome, vantagem]) => ({
        nome,
        vantagem
      }));
  
      const speciesResponse = await axios.get(data.species.url);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
  
      const evolutionChain = await this.evolucaoService.obterLinhaEvolutiva(evolutionChainUrl);
  
      return {
        id: data.id,
        nome: data.name,
        altura: data.height / 10,
        peso: data.weight / 10,
        imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        tipos,
        estatisticas: {
          hp: data.stats[0].base_stat,
          ataque: data.stats[1].base_stat,
          defesa: data.stats[2].base_stat,
          ataque_especial: data.stats[3].base_stat,
          defesa_especial: data.stats[4].base_stat,
          velocidade: data.stats[5].base_stat,
        },
        resistencias: resistenciasFinal,
        linha_evolutiva: evolutionChain,
      };
    } catch (error) {
      throw new Error('Pokémon não encontrado');
    }
  }
  


  private extractIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }
}
