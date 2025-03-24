import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PokemonModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
