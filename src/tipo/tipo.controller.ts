import { Controller, Get, Param, } from '@nestjs/common';
import { TipoService } from './tipo.service';

@Controller('tipo')
export class TipoController {
  constructor(private tipoService: TipoService) {}

  @Get()
  async getAllTipos() {
    return await this.tipoService.getAllTipos();
  }

  @Get(':id')
async getTipoById(@Param('id') id: string) {
  return this.tipoService.getTipoById(Number(id));
}

}
