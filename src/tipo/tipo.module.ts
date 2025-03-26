import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TipoController } from './tipo.controller';
import { TipoService } from './tipo.service';

@Module({
  controllers: [TipoController],
  providers: [TipoService, PrismaService],
})
export class TipoModule {}
