import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>Bem-vindo à API PokeNest!</h1>
      <p>Esta é a API para gerenciamento de dados sobre Pokémon. Explore os endpoints abaixo para interagir com os dados.</p>
      
      <h2>Primeiros Passos:</h2>
      <ul>
        <li><strong>GET /pokemon</strong> - Obtém uma lista de Pokémon com paginação (parâmetros: <code>page</code> e <code>limit</code>).</li>
        <li><strong>GET /pokemon/:identifier</strong> - Obtém informações detalhadas de um Pokémon (por nome ou ID).</li>
        <li><strong>GET /tipos</strong> - Obtém uma lista de todos os tipos de Pokémon.</li>
        <li><strong>GET /tipos/:nome</strong> - Obtém as relações de um tipo específico de Pokémon (ex: fraquezas, forças).</li>
        <li><strong>GET /evolucao/:pokemon</strong> - Obtém a linha evolutiva de um Pokémon específico.</li>
      </ul>
      
      <h2>Documentação Completa</h2>
      <p>Consulte a documentação completa para mais detalhes sobre como usar a API e seus endpoints.</p>
      <p>Confira o código-fonte e contribua para o projeto: 
        <a href="https://github.com/SohJorgeMesmo78/PokeNest78" target="_blank">GitHub - PokeNest78</a>
      </p>
    `;
  }
}
