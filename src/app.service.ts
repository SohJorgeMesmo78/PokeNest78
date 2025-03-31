import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>Bem-vindo à API PokeNest!</h1>
      <p>Esta é uma API para gerenciamento de dados sobre Pokémon. Utilize os endpoints abaixo para interagir com a aplicação.</p>
      <h2>Primeiros Passos:</h2>
      <ul>
        <li>Faça requisições GET para obter dados.</li>
        <li>Envie dados via POST para adicionar novos registros.</li>
        <li>Utilize PUT ou DELETE para atualizar ou remover dados.</li>
      </ul>
      <p>Confira o código-fonte e mais informações em: 
        <a href="https://github.com/SohJorgeMesmo78/PokeNest78" target="_blank">GitHub - PokeNest78</a>
      </p>
    `;
  }
}
