import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipoService {
  constructor(private prismaService: PrismaService) {}

  // Método para obter todos os tipos
  async getAllTipos() {
    return await this.prismaService.tipo.findMany({
      orderBy: {
        id: 'asc', // Ordenando os tipos pelo id em ordem crescente
      },
      select: {
        nome: true, // Retornando apenas o campo 'nome'
        ataques: { // Relacionamento com 'Fraqueza' onde o tipo é o "ataque"
          select: {
            fraqueza: true, // Vantagens ou desvantagens
            tipoDefesa: {
              select: {
                nome: true, // Nome do tipo que é a defesa
              },
            },
          },
        },
        defesas: { // Relacionamento com 'Fraqueza' onde o tipo é a "defesa"
          select: {
            fraqueza: true, // Vantagens ou desvantagens
            tipoAtaque: {
              select: {
                nome: true, // Nome do tipo que é o ataque
              },
            },
          },
        },
      },
    });
  }

  // Método para obter um tipo pelo ID
  async getTipoById(id: number) {
    const tipo = await this.prismaService.tipo.findUnique({
      where: { id },
      select: {
        nome: true, // Retornando apenas o campo 'nome'
        ataques: { // Relacionamento com 'Fraqueza' onde o tipo é o "ataque"
          select: {
            fraqueza: true, // Vantagens ou desvantagens
            tipoDefesa: {
              select: {
                nome: true, // Nome do tipo que é a defesa
              },
            },
          },
        },
        defesas: { // Relacionamento com 'Fraqueza' onde o tipo é a "defesa"
          select: {
            fraqueza: true, // Vantagens ou desvantagens
            tipoAtaque: {
              select: {
                nome: true, // Nome do tipo que é o ataque
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
