import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipoService {
  constructor(private prismaService: PrismaService) { }

  async getAllTipos() {
    return await this.prismaService.tipo.findMany({
      orderBy: {
        id: 'asc',
      },
      select: {
        nome: true,
        ataques: {
          select: {
            fraqueza: true,
            tipoDefesa: {
              select: {
                nome: true,
              },
            },
          },
        },
        defesas: {
          select: {
            fraqueza: true,
            tipoAtaque: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });
  }

  async getTipoById(id: number) {
    const tipo = await this.prismaService.tipo.findUnique({
      where: { id },
      select: {
        nome: true,
        ataques: {
          select: {
            fraqueza: true,
            tipoDefesa: {
              select: {
                nome: true,
              },
            },
          },
        },
        defesas: {
          select: {
            fraqueza: true,
            tipoAtaque: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    if (!tipo) {
      throw new NotFoundException(`Tipo com ID ${id} não encontrado`);
    }

    return tipo;
  }


}
