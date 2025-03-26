import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaService } from './prisma/prisma.service';
import { TipoModule } from './tipo/tipo.module';

@Module({
  imports: [PokemonModule, TipoModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
