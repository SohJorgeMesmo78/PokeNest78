import { Module } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import { EvolucaoController } from './evolucao.controller';

@Module({
  providers: [EvolucaoService],
  controllers: [EvolucaoController],
  exports: [EvolucaoService],
})
export class EvolucaoModule {}
