import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, PrismaService]
})
export class PokemonModule {}
