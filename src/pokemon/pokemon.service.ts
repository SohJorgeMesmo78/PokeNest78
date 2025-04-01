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

  async getPokemons(page: number = 1, limit: number = 10, name?: string, types?: string, games?: string) {
    const tiposSelecionados = types ? types.split(',').map(t => t.trim().toLowerCase()) : [];
    const jogosSelecionados = games ? games.split(',').map(g => g.trim().toLowerCase()) : [];

    // A URL agora não tem a paginação, pois vamos pegar todos os Pokémons
    const url = `${this.pokeApiUrl}?limit=1000`; // Pega mais de 1000 para garantir que traga todos os Pokémons
    const response = await axios.get(url);

    const total = response.data.count;

    if (response.data.results.length === 0) {
      return { pagina: page, total, pokemons: [] };
    }

    // Buscar os detalhes de todos os Pokémons
    const batch = await Promise.all(
      response.data.results.map(async (p) => {
        const id = this.extractIdFromUrl(p.url);
        const detalhes = await axios.get(`${this.pokeApiUrl}/${id}`);

        const tipos = detalhes.data.types.map((t) => {
          return TipoPokemon[t.type.name.toUpperCase()] || t.type.name;
        });

        const jogos = detalhes.data.game_indices.map((game) => game.version.name);

        return {
          id,
          nome: p.name,
          imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          tipos,
          jogos,
        };
      })
    );

    // Aplicar os filtros (nome, tipos e jogos) antes de aplicar a paginação
    const filtrados = batch.filter(p => {
      if (name && !p.nome.toLowerCase().includes(name.toLowerCase())) return false;
      if (types && !tiposSelecionados.every(tipo => p.tipos.map(t => t.toLowerCase()).includes(tipo))) return false;
      if (games && !jogosSelecionados.every(game => p.jogos.map(g => g.toLowerCase()).includes(game))) return false;
      return true;
    });

    // Agora que já temos os Pokémons filtrados, aplicamos a paginação
    const paginados = filtrados.slice((page - 1) * limit, page * limit);

    return {
      pagina: page,
      total, // Total de pokémons disponíveis
      pokemons: paginados, // Pokémons após a filtragem e paginação
    };
  }

  async getPokemonByIdOrName(identifier: string | number) {
    const url = `${this.pokeApiUrl}/${identifier}`;

    try {
      const response = await axios.get(url);

      if (!response || !response.data) {
        throw new Error('Pokémon não encontrado');
      }

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
      console.error(`Erro ao buscar Pokémon: ${error.message}`);
      throw new Error(`Erro ao buscar Pokémon com identificador: ${identifier}`);
    }
  }


  async searchPokemons(name: string) {
    try {
      const url = `${this.pokeApiUrl}?limit=1000`;
      const response = await axios.get(url);
      const pokemons = response.data.results;

      const matchingPokemons = pokemons.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );

      if (matchingPokemons.length === 0) {
        return [];
      }

      const pokemonsDetalhados = await Promise.all(
        matchingPokemons.map(async (p) => {
          try {
            const id = this.extractIdFromUrl(p.url);
            const detalhes = await axios.get(`${this.pokeApiUrl}/${id}`);

            if (!detalhes || !detalhes.data) {
              throw new Error(`Detalhes não encontrados para ${p.name}`);
            }

            const tipos = detalhes.data.types.map((t) => {
              return TipoPokemon[t.type.name.toUpperCase()] || t.type.name;
            });

            return {
              id,
              nome: p.name,
              imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              tipos,
            };
          } catch (error) {
            console.error(`Erro ao buscar detalhes de ${p.name}: ${error.message}`);
            return null;
          }
        })
      );

      return pokemonsDetalhados.filter((p) => p !== null);
    } catch (error) {
      console.error(`Erro ao buscar Pokémon: ${error.message}`);
      throw new Error('Erro ao buscar Pokémon');
    }
  }



  private extractIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }
}
