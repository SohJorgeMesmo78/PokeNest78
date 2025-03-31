import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EvolucaoService {
  async obterLinhaEvolutiva(url: string) {
    try {
      const response = await axios.get(url);
      return this.extrairLinhaEvolutiva(response.data.chain);
    } catch (error) {
      throw new Error('Erro ao buscar linha evolutiva');
    }
  }

  private extrairLinhaEvolutiva(chain: any): any {
    if (!chain) return undefined;

    return {
      nome: chain.species.name,
      imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.extrairId(chain.species.url)}.png`,
      metodo: chain.evolution_details?.length
        ? chain.evolution_details.map((details: any) => this.obterMetodoEvolucao(details))
        : undefined,
      evolucao: chain.evolves_to.length > 0
        ? chain.evolves_to.map((evolution: any) => this.extrairLinhaEvolutiva(evolution))
        : undefined,
    };
  }

  private obterMetodoEvolucao(details: any): any {
    let metodo = {};

    if (details.trigger.name === "level-up") {
      metodo = { trigger: "level-up" };

      if (details.min_level) {
        metodo['nivel'] = details.min_level;
      }
  
      if (details.time_of_day) {
        metodo['hora_do_dia'] = details.time_of_day === "day" ? "dia" : "noite";
      }
  
      if (details.min_happiness) {
        metodo['felicidade_minima'] = details.min_happiness;
      }
  
      if (details.needs_overworld_rain) {
        metodo['chuva'] = true;
      }
    }
  
    if (details.trigger.name === "use-item") {
      metodo = { trigger: "use-item", item: details.item.name };
    }
  
    if (details.trigger.name === "trade") {
      metodo = { trigger: "trade" };
      if (details.held_item) {
        metodo['item_seguro'] = details.held_item.name;
      }
    }
  
    if (details.trigger.name === "shed") {
      metodo = { trigger: "shed" };
    }
  
    if (details.trigger.name === "spin") {
      metodo = { trigger: "spin" };
    }
  
    if (details.trigger.name === "agility") {
      metodo = { trigger: "agility" };
    }

    return metodo;
  }

  private extrairId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }
}
