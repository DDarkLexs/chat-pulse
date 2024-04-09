import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Usuario } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from './messages.service';

@WebSocketGateway()
// @UseGuards(AuthGuard)
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private messageService: MessagesService,
    private authService: AuthService,
  ) {}
  @WebSocketServer() server: Server;

  async getUser(token: string): Promise<Usuario> {
    const user = await this.authService.verify(token);
    const response = await this.authService.findOne({ userID: user.userID });
    delete response.senha;
    return response;
  }

  async handleConnection(client: Socket): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();

    // console.log(client.rooms.size);

    console.log('Usuario conectado: ', user.nome);
  }
  async handleDisconnect(client: Socket): Promise<void> {
    // console.log(client.rooms.size);
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();

    console.log('usuario desconectado: ' + user.nome);
  }
  @SubscribeMessage('JoinRoomPrivateRoom')
  async juntarSeConversaPrivado(client: Socket, data: any): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();
    const { amigoID } = client.handshake.query;
    const rooms = await this.messageService.consultarOneChatRoom(
      Number(user.userID),
      Number(amigoID),
    );

    // this.messages.push(message);
    // console.log(`${user.nome} juntou se na conversa`);
    // console.log(rooms.ChatRoomID);
    client.join(rooms.chatKey);

    client.broadcast
      .to(rooms.chatKey)
      .emit('JoinRoomPrivateRoom', `${user.nome} juntou se na conversa`);
  }
  @SubscribeMessage('JoinRoomPrivateRoom')
  async sairConversaPrivado(client: Socket, data: any): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();
    const { amigoID } = client.handshake.query;
    const rooms = await this.messageService.consultarOneChatRoom(
      Number(user.userID),
      Number(amigoID),
    );

    // this.messages.push(message);
    // console.log(`${user.nome} juntou se na conversa`);
    // console.log(rooms.ChatRoomID);
    client.join(rooms.chatKey);

    client.broadcast
      .to(rooms.chatKey)
      .emit('JoinRoomPrivateRoom', `${user.nome} juntou se na conversa`);
  }

  @SubscribeMessage('msg-privado')
  async chatPrivado(client: Socket, data: any): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();
    const { amigoID } = client.handshake.query;
    const rooms = await this.messageService.consultarOneChatRoom(
      Number(user.userID),
      Number(amigoID),
    );

    const msg = await this.messageService.buscarMsgAnterior(
      user.userID,
      Number(amigoID),
    );

    this.server.to(rooms.chatKey).emit('msg-privado', msg);
  }
  @SubscribeMessage('chat')
  async onChat(client: Socket, message: IMessage): Promise<void> {
    // this.messages.push(message);
    // console.log(message);
    client.broadcast.emit('chat', message);
  }
  @SubscribeMessage('enviar-msg')
  async onEnviarMsg(client: Socket, message: IMessage): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();
    const { amigoID } = client.handshake.query;
    const rooms = await this.messageService.consultarOneChatRoom(
      Number(user.userID),
      Number(amigoID),
    );
    // console.log(message);

    const msgs = await this.messageService.buscarUltimasMsgDeAmigos(
      Number(user.userID),
    );
    // this.messages.push(message);
    const lastMessage = msgs.find(
      (state) => state.destinarioID === Number(amigoID),
    );
    console.log('====================================');
    console.log(message);
    console.log(lastMessage);
    console.log('====================================');
    client.broadcast
      .to(rooms.chatKey)
      .emit('receber-Inbox', lastMessage, message.user);
    client.broadcast.to(rooms.chatKey).emit('receber-msg', { ...message });
  }
  @SubscribeMessage('stop-writing')
  async onStopWriting(client: Socket, data: any): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();
    const { amigoID } = client.handshake.query;
    const rooms = await this.messageService.consultarOneChatRoom(
      Number(user.userID),
      Number(amigoID),
    );

    // this.messages.push(message);
    client.broadcast.to(rooms.chatKey).emit('stop-writing', data);
  }
  @SubscribeMessage('writing')
  async onWriting(client: Socket, data: any): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();
    const { amigoID } = client.handshake.query;
    const rooms = await this.messageService.consultarOneChatRoom(
      Number(user.userID),
      Number(amigoID),
    );

    // this.messages.push(message);
    client.broadcast.to(rooms.chatKey).emit('writing', data);
  }
  @SubscribeMessage('is-online')
  async isOnline(client: Socket, data: any): Promise<void> {
    const user = await this.getUser(client.handshake.auth.token);
    !user && client.disconnect();
    const { amigoID } = client.handshake.query;
    const rooms = await this.messageService.consultarOneChatRoom(
      Number(user.userID),
      Number(amigoID),
    );

    const friend = await this.authService.findOne({
      userID: Number(amigoID),
    });

    client.broadcast.to(rooms.chatKey).emit('is-online', friend);
  }
  // @SubscribeMessage('onMessagePrepare')
  // a
}
