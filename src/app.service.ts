import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>Bem-vindo à API PokeNest!</h1>
      <p>Esta é a API para gerenciar informações sobre Pokémon. Explore os endpoints para interagir com os dados.</p>
      
      <h2>Primeiros Passos:</h2>
      <ol>
        <li><strong>GET /pokemons</strong> - Obtém uma lista de Pokémon cadastrados.</li>
        <li><strong>POST /pokemons</strong> - Cria um novo Pokémon.</li>
        <li><strong>PUT /pokemons/:id</strong> - Atualiza um Pokémon existente.</li>
        <li><strong>DELETE /pokemons/:id</strong> - Deleta um Pokémon específico.</li>
      </ol>
      
      <h2>Documentação Completa</h2>
      <p>Consulte a documentação completa para detalhes sobre os endpoints e suas funcionalidades.</p>
      <p>Veja o código-fonte e contribua para o projeto: 
        <a href="https://github.com/SohJorgeMesmo78/PokeNest78" target="_blank">GitHub - PokeNest78</a>
      </p>
    `;
  }
}
