import { Controller, Get, Param } from '@nestjs/common';
import { TipoService } from './tipo.service';

@Controller('tipos')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Get()
  getTipos() {
    return this.tipoService.getTipos();
  }

  @Get(':nome')
  async getRelacoesDoTipo(@Param('nome') nome: string) {
    return this.tipoService.getRelacoesDoTipo(nome.toLowerCase());
  }
}
