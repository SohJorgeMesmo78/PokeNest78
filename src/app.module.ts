import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { TipoModule } from './tipo/tipo.module';
import { EvolucaoModule } from './evolucao/evolucao.module';

@Module({
  imports: [PokemonModule, TipoModule, EvolucaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
