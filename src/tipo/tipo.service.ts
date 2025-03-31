import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TipoPokemon } from '../common/enums/tipo-pokemon.enum';

@Injectable()
export class TipoService {
  private readonly tipoApiUrl = 'https://pokeapi.co/api/v2/type';

  async getRelacoesDoTipo(tipo: string) {
    try {
      const url = `${this.tipoApiUrl}/${tipo}`;
      const response = await axios.get(url);
      const relacoes = response.data.damage_relations;

      return {
        vantagens: relacoes.double_damage_to.map((t) => TipoPokemon[t.name.toUpperCase()] || t.name),
        desvantagens: relacoes.double_damage_from.map((t) => TipoPokemon[t.name.toUpperCase()] || t.name),
        resistencias: relacoes.half_damage_from.map((t) => TipoPokemon[t.name.toUpperCase()] || t.name),
        imunidades: relacoes.no_damage_from.map((t) => TipoPokemon[t.name.toUpperCase()] || t.name),
      };
    } catch (error) {
      console.error(`Erro ao obter relações do tipo ${tipo}`);
      return { vantagens: [], desvantagens: [], resistencias: [], imunidades: [] };
    }
  }

  async getTipos() {
    const response = await axios.get(this.tipoApiUrl);
    
    return response.data.results.map((t) => ({
      nome: TipoPokemon[t.name.toUpperCase()] || t.name,
    }));
  }
}
