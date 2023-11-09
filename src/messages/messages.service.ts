import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  async setEstado(estado: boolean, userID: number): Promise<Usuario> {
    const reponse = await this.prisma.usuario.update({
      where: {
        userID,
      },
      data: {
        online: estado,
      },
    });

    return reponse;
  }
}
