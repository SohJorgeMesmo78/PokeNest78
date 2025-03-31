import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TipoModule } from 'src/tipo/tipo.module';
import { EvolucaoModule } from 'src/evolucao/evolucao.module';

@Module({
  imports: [TipoModule, EvolucaoModule],
  providers: [PokemonService],
  controllers: [PokemonController]
})
export class PokemonModule {}
