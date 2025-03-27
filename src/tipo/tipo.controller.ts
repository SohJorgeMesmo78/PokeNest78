import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { TipoDto } from './dtos/tipo';

@Controller('tipo')
export class TipoController {
  constructor(private tipoService: TipoService) {}

  // Endpoint para obter todos os tipos
  @Get()
  async getAllTipos() {
    return await this.tipoService.getAllTipos();
  }

  // Endpoint para obter um tipo específico pelo ID
  @Get(':id')
async getTipoById(@Param('id') id: string) {
  return this.tipoService.getTipoById(Number(id));
}

}
