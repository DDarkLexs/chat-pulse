import { Injectable } from '@nestjs/common';
import { ChatRoom, Usuario } from '@prisma/client';
import type { IMensagensRecentes } from 'src/@types/main';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  async buscarUltimasMsgDeAmigos(
    userID: number,
  ): Promise<IMensagensRecentes[]> {
    const amigos = await this.prisma.usuario.findUnique({
      where: {
        userID,
      },
      include: {
        Amigo1: true,
        Amigo2: true,
      },
    });

    const idsAmigos1 = amigos.Amigo1.map((amizade) => amizade.userID2);
    const idsAmigos2 = amigos.Amigo2.map((amizade) => amizade.userID1);

    // Consulta para obter nomes dos amigos
    const nomesAmigos = await this.prisma.usuario.findMany({
      where: { userID: { in: [...idsAmigos1, ...idsAmigos2] } },
      select: {
        nome: true,
        userID: true,
        online: true,
      },
    });

    const mensagemMisturados = await this.prisma.mensagem.findMany({
      where: {
        OR: [
          {
            enviadorID: userID,
            destinarioID: { in: [...idsAmigos1, ...idsAmigos2] },
          },
          {
            destinarioID: userID,
            enviadorID: { in: [...idsAmigos1, ...idsAmigos2] },
          },
        ],
      },
      orderBy: { created: 'desc' },
      // take: 1,
    });

    const quantidadesNaoLido = await this.prisma.usuario.findMany({
      where: {
        OR: [
          {
            userID: { in: [...idsAmigos1, ...idsAmigos2] },
          },
        ],
      },
      include: {
        MensagemRecebidas: {
          where: {
            OR: [
              { visto: false, enviadorID: userID },
              { visto: false, destinarioID: userID },
            ],
          }, // Filtra as mensagens não vistas
        },
      },
    });

    // const qtdMensagensNaoVistas = usuario.MensagemRecebidas.length;

    // // Consulta para obter a última mensagem com cada amigo da relação Amigo2

    const msg: IMensagensRecentes[] = mensagemMisturados.map((state): any => {
      const friend = nomesAmigos.find(
        (state1) =>
          state1.userID === state.enviadorID ||
          state1.userID === state.destinarioID,
      );

      const naoLido = quantidadesNaoLido.find(
        (state2) =>
          state2.userID === state.enviadorID ||
          state2.userID === state.destinarioID,
      );
      return {
        ...state,
        ...friend,
        naoLido: naoLido.MensagemRecebidas.length,
      };
    });

    const finalResponse = this.processarMensagens(msg);
    return finalResponse;
  }
  async setMessagem(userID: number, amigoID: number, texto: string) {
    const response = await this.prisma.mensagem.create({
      data: {
        texto,
        enviadorID: userID,
        destinarioID: amigoID,
      },
    });

    return response;
  }
  async setEstado(estado: boolean, userID: number): Promise<Usuario> {
    const response = await this.prisma.usuario.update({
      where: {
        userID,
      },
      data: {
        online: estado,
      },
    });

    return response;
  }
  private processarMensagens<T extends IMensagensRecentes>(messages: T[]): T[] {
    const userIdSet = new Set<number>();
    return messages.filter((message) => {
      // console.log(Array.from(userIdSet));
      if (userIdSet.has(message.userID)) {
        return false;
      } else {
        userIdSet.add(message.userID);
        return true;
      }
    });
  }
  async enviarMsg(de: number, para: number, texto: string) {
    const response = this.prisma.mensagem.create({
      data: {
        enviadorID: de,
        destinarioID: para,
        texto: texto,
      },
    });

    return response;
  }
  async buscarMsgAnterior(euID: number, amigoID: number) {
    const response = await this.prisma.mensagem.findMany({
      where: {
        OR: [
          {
            enviadorID: euID,
            destinarioID: amigoID,
          },
          {
            enviadorID: amigoID,
            destinarioID: euID,
          },
        ],
      },
      include: {
        Destinario: {
          select: {
            nome: true,
          },
        },
        // Enviador: {
        //   select: {
        //     nome: true,
        //   },
        // },
      },
      orderBy: {
        mensagemID: 'desc',
      },
    });
    return response;
  }
  async marcarTodoMsgLido(euID: number, amigoID: number) {
    const response = await this.prisma.mensagem.updateMany({
      where: {
        OR: [
          // {
          //   enviadorID: amigoID,
          //   mensagemID: euID,
          // },
          {
            enviadorID: amigoID,
            destinarioID: euID,
          },
        ],
      },
      data: {
        visto: true,
      },
    });
    return response;
  }
  async consultarOneChatRoom(
    meuId: number,
    amigoId: number,
  ): Promise<ChatRoom> {
    const query = await this.prisma.chatRoom.findFirst({
      where: {
        OR: [
          {
            usuarioUserID1: meuId,
            usuarioUserID2: amigoId,
          },
          {
            usuarioUserID1: amigoId,
            usuarioUserID2: meuId,
          },
        ],
      },
    });
    return query;
  }
}
/* 
const usuariosComMesmoChatkey = await prisma.chatroom.groupBy({
  by: ['chatkey'],
  _count: {
    usuarioUserID: true,
    _distinct: true
  },
  having: {
    _count: {
      usuarioUserID: {
        _gt: 1 // Encontrar chatkeys com mais de um usuário
      }
    }
  }
});"




*/
