import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@WebSocketGateway()
@UseGuards(AuthGuard)
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messageService: MessagesService) {}
  @WebSocketServer() server: Server;
  users: number = 0;
  messages: IMessage[] = [];

  handleConnection(client: Socket, ...args: any[]) {
    // this.users++;
    // console.log(client.data);
    console.log(this.users);
    console.log('conectado');
    this.server.emit('users', this.users);
    console.log(args);
  }

  handleDisconnect(client: any) {
    console.log('desconectado');
    this.users--;
    this.server.emit('users', this.users);
    console.log(client.id);
  }
  @SubscribeMessage('writing')
  async onWriting(client: any, data: any) {
    // this.messages.push(message);
    client.broadcast.emit('writing', data);
  }
  @SubscribeMessage('chat')
  async onChat(client: any, message: IMessage) {
    // this.messages.push(message);
    console.log(this.messages);
    client.broadcast.emit('chat', message);
  }
}
